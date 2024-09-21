import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Img,
  AspectRatio,
  Slider,
  SliderTrack,
  SliderThumb,
  Button,
  VStack,
  keyframes,
  BoxProps,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import YouTube from 'react-youtube';
import { BsPause, BsPlayFill } from 'react-icons/bs';

const crawl = keyframes`
  from {clip-path: inset(50% 0);}
  to {clip-path: inset(0 0);}
`;

interface VideoModalProps extends BoxProps {
  videoId?: string;
  children?: React.ReactNode | React.ReactNode[];
  showOnMobile?: boolean;
}

var timer: any = null;

export default function VideoModal({
  videoId,
  children,
  showOnMobile = true,
  ...props
}: VideoModalProps) {
  const [player, setPlayer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackStatus, setPlaybackStatus] = useState<number>(0);

  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onModalOpen = () => {
    if (isDesktop || showOnMobile === true) {
      onOpen();
    }
  };

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      controls: 0,
      playsinline: 1,
      modestbranding: 1,
      iv_load_policy: 0,
      rel: 0,
    },
  };

  const resetModal = (playerEvent: any) => {
    if (isDesktop) {
      playerEvent.unMute();
      playerEvent.setVolume(100);
    } else {
      playerEvent.mute();
      playerEvent.setVolume(0);
    }
  };

  const onReady = (event: any) => {
    const playerEvent = event.target;

    resetModal(playerEvent);
    setPlayer(playerEvent);

    playerEvent.playVideo();
  };

  const onTogglePlayer = () => {
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const onStateChange = (event: any) => {
    if (event.data != 0) {
      setIsPlaying(!isPlaying);
    }
  };

  const onPlay = () => {
    let total = player.getDuration();

    onPause();

    if (player.isMuted()) {
      player.unMute();
      player.setVolume(100);
    }

    setIsPlaying(true);

    timer = setInterval(() => {
      setPlaybackStatus((player.getCurrentTime() / total) * 100);
    }, 50);
  };

  const onPause = () => {
    setIsPlaying(false);
    clearInterval(timer);
    timer = null;
  };

  const onEnd = () => {
    setIsPlaying(false);
    onPause();
    player.pauseVideo();
  };

  const seek = (amount: number) => {
    let total = player.getDuration();
    let time = (amount * total) / 100;

    player.seekTo(time);
    setPlaybackStatus(amount);
  };

  return (
    <>
      <Box onClick={onModalOpen} {...props}>
        {children}
      </Box>

      <Modal variant="video" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent marginTop="20px">
          <ModalHeader>
            <Img src="/img/iso.svg" alt="Mercado Libre isologo" />
          </ModalHeader>

          <ModalCloseButton />

          <ModalBody pb={8}>
            <AspectRatio
              maxH="60vh"
              ratio={2.15 / 1}
              borderRadius="meli.md"
              overflow="hidden"
              clipPath="inset(50% 0)"
              animation={player ? `${crawl} 0.5s linear 0.5s forwards` : ''}
            >
              <YouTube
                videoId={videoId}
                //@ts-ignore
                opts={opts}
                onReady={onReady}
                onPlay={onPlay}
                onPause={onPause}
                onEnd={onEnd}
                onStateChange={onStateChange}
              />
            </AspectRatio>
          </ModalBody>

          <ModalFooter>
            <VStack alignItems="flex-start" w="full">
              <Slider
                aria-label="video-progress"
                variant="video"
                defaultValue={0}
                value={playbackStatus}
                onChange={seek}
                step={0.1}
              >
                <SliderTrack />
                <SliderThumb />
              </Slider>

              <Button variant="player" onClick={onTogglePlayer}>
                {isPlaying ? <BsPause /> : <BsPlayFill />}
              </Button>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

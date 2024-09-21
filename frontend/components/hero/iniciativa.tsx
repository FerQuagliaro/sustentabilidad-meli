import { Box, Container, Text, Heading, Image } from '@chakra-ui/react';
import { RichText } from '../text/rich-text';
import VideoModal from '../video-modal';
import { WatchVideoPointer } from '../pointers/watch-video';
import { WatchVideoIcon } from '../icons/watch-video';

interface HeroProps {
  title: string;
  overTitle?: string;
  img: {
    src: string;
    alt: string;
  };
  video?: string;
}

export const Hero: React.FC<HeroProps> = (props) => {
  const { title, overTitle, img, video } = props;

  return (
    <Box as="header">
      <Container
        px={0}
        maxW={{
          base: 'container.mobile.lg',
          md: 'container.tablet.lg',
          lg: 'container.desktop.md',
        }}
      >
        {overTitle && (
          <Text variant="overTitle" size="overTitle">
            <RichText txt={overTitle} />
          </Text>
        )}
        <Heading
          variant="main"
          size="main"
          marginBottom={{ base: '10', md: '80', lg: '160' }}
        >
          {title}
        </Heading>
      </Container>
      <Box
        height={{ base: '320px', md: '700px' }}
        width="100%"
        overflow="hidden"
        position="relative"
      >
        {video ? (
          <>
            <VideoModal videoId={video} width="full" height="full">
              <WatchVideoIcon />
              <Image
                objectFit="cover"
                height="full"
                width="full"
                src={img.src}
                alt={img.alt}
                maxW={{ base: 'none !important', lg: '100%' }}
              />
            </VideoModal>
          </>
        ) : (
          <Image
            objectFit="cover"
            objectPosition="center top"
            width="100%"
            height="100%"
            src={img.src}
            alt={img.alt}
          />
        )}
      </Box>
    </Box>
  );
};

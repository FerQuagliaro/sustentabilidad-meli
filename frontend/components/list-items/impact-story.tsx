import {
  Box,
  Image,
  Text,
  AspectRatio,
  useBreakpointValue,
} from '@chakra-ui/react';
import VideoModal from '../video-modal';
import { WatchVideoIcon } from '../icons/watch-video';

export interface StoryProps {
  imgs?: {
    srcSmall: string;
    srcLarge: string;
    alt: string;
  };
  videoUrl?: string;
  quote: string;
  quoteAuthor: string;
}

interface Props {
  story: StoryProps;
}

export const ImpactStory: React.FC<Props> = ({ story }) => {
  const { imgs, quote, quoteAuthor, videoUrl } = story;
  const size = useBreakpointValue({ base: 'mobile', lg: 'desktop' });

  return (
    <Box
      flex={{ base: '0 0 100%' }}
      maxWidth={{ base: 'min(96%, 400px)', md: 'min(96%, 640px)' }}
      paddingLeft={{ base: '5', md: '12', lg: '0' }}
      paddingRight={{ base: '0', lg: '120px' }}
      cursor="grab"
      _active={{
        cursor: 'grabbing',
      }}
    >
      <Box>
        <AspectRatio
          w={{ base: '100%' }}
          maxW={{ lg: '745px' }}
          maxH={{ base: '400px', lg: '450px' }}
          ratio={{ base: 9 / 16, lg: 16 / 9 }}
          borderRadius={{ base: 'meli.md', lg: 'meli.lg' }}
          overflow={{ base: 'hidden' }}
          marginBottom={{ base: '40' }}
          position="relative"
        >
          {videoUrl ? (
            <VideoModal videoId={videoUrl}>
              <WatchVideoIcon
                sx={{
                  svg: {
                    bottom: '20px',
                    left: '20px',
                    top: 'auto',
                    transform: 'none',
                    width: {
                      base: '80px',
                      sm: '100px',
                    },
                    height: {
                      base: '80px',
                      sm: '100px',
                    },
                  },
                }}
              />
              {size === 'mobile' ? (
                <Box
                  width="100%"
                  height="400px"
                  borderRadius={{ base: 'meli.md', md: 'meli.lg' }}
                  overflow="hidden"
                >
                  <Image
                    src={imgs?.srcSmall}
                    alt={imgs?.alt}
                    height="100%"
                    width="100%"
                    objectFit="cover"
                  />
                </Box>
              ) : (
                <Image
                  maxH={{ lg: '450px' }}
                  src={imgs?.srcLarge}
                  alt={imgs?.alt}
                  borderRadius={{ base: 'meli.md', md: 'meli.lg' }}
                />
              )}
            </VideoModal>
          ) : size === 'mobile' ? (
            <Box
              width="100%"
              height="400px"
              borderRadius={{ base: 'meli.md', md: 'meli.lg' }}
              marginBottom={{ base: '40px' }}
              overflow="hidden"
            >
              <Image
                src={imgs?.srcSmall}
                alt={imgs?.alt}
                height="100%"
                width="100%"
                objectFit="cover"
              />
            </Box>
          ) : (
            <Image
              maxH={{ lg: '450px' }}
              src={imgs?.srcLarge}
              alt={imgs?.alt}
              borderRadius={{ base: 'meli.md', md: 'meli.lg' }}
              marginBottom={{ base: '40px' }}
            />
          )}
        </AspectRatio>
        <Box as="figure">
          <Box as="blockquote" marginBottom={{ base: '25px' }}>
            <Text
              color="white"
              fontWeight="semibold"
              fontSize={{ base: '20', lg: '25' }}
              lineHeight={{ base: '30', lg: '20' }}
              maxW={{ md: '100%', lg: '750px' }}
            >
              {quote}
            </Text>
          </Box>
          <Box
            as="figcaption"
            color={{ base: 'white', lg: 'stakeholders.02.accent' }}
            fontWeight="regular"
            fontSize={{ base: '18' }}
            lineHeight={{ base: '18' }}
          >
            {quoteAuthor}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

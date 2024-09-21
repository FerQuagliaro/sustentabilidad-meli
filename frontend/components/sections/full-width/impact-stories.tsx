import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {
  Box,
  Heading,
  Container,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ImpactStory, StoryProps } from '../../list-items/impact-story';
import { SliderArrowWhite } from '../../icons/slider-arrow-white';

interface ImpactStoriesProps {
  title: string;
  theme?: string;
  stories: StoryProps[];
}

export const ImpactStories: React.FC<ImpactStoriesProps> = (props) => {
  const { title, stories, theme } = props;
  const [currentStory, setCurrentStory] = useState(1);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
  });
  const size = useBreakpointValue({ base: 'mobile', lg: 'desktop' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi, currentStory]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi, currentStory, stories.length]);

  const selectedScrollSnap = useCallback(() => {
    if (emblaApi) emblaApi.scrollProgress();
  }, [emblaApi]);

  useEffect(() => {
    emblaApi?.on('select', () =>
      setCurrentStory(emblaApi.selectedScrollSnap() + 1)
    );
  }, [emblaApi]);

  return (
    <Box
      as="section"
      w="100%"
      backgroundColor={`stakeholders.${theme}.base`}
      py={{ base: '80', md: '160', lg: '240' }}
      display={{ lg: 'flex' }}
      flexDirection="column"
      justifyContent="center"
    >
      <Box
        display={{ lg: 'grid' }}
        paddingLeft={{ lg: 'calc((100vw - min(80vw, 1120px)) / 2)' }}
        gridTemplateColumns={{ lg: '360px 1fr' }}
        gridColumnGap={{ lg: '20px' }}
      >
        <Heading
          as="h2"
          position="relative"
          color={{ base: 'white', lg: `stakeholders.${theme}.accent` }}
          fontWeight="black"
          fontSize={{ base: '40', lg: '70' }}
          lineHeight="60"
          marginBottom={{ base: '80px', lg: '0' }}
          px={{ base: '8', md: '8', lg: '0' }}
          transform={{ lg: 'rotate(-90deg) translateX(-100%)' }}
          transformOrigin="top left"
          alignSelf="flex-start"
          sx={{
            '&::before': {
              content: "''",
              display: { base: 'none', lg: 'block' },
              position: 'absolute',
              top: '0',
              bottom: '0',
              width: '320px',
              height: '2px',
              backgroundColor: `stakeholders.${theme}.accent`,
              transform: 'translate(-120%, 25px)',
            },
          }}
        >
          {/*<RichText txt={title} />*/}
          {title}
        </Heading>
        <Box overflow="hidden">
          <Box
            ref={emblaRef}
            marginBottom={{ base: '40', lg: '80' }}
            paddingLeft={{ base: '3', lg: '0' }}
            paddingRight={{
              base: '8',
              lg: 'calc((100vw - min(80vw, 1120px)) / 2 - 120px)',
            }}
          >
            <Box display="flex">
              {stories.map((story, i) => {
                return <ImpactStory key={i} story={story} />;
              })}
            </Box>
          </Box>
          {size === 'desktop' && (
            <Container
              maxW={{ base: 'container.mobile.lg', lg: '100%' }}
              display={{ base: 'flex' }}
              alignItems="center"
              justifyContent={{ base: 'space-between', lg: 'flex-start' }}
              paddingRight={{ lg: 'calc((100vw - min(80vw, 1120px)) / 2)' }}
            >
              <Box
                opacity={currentStory === 1 ? 0.5 : 1}
                marginRight={{ lg: '20px' }}
                onClick={scrollPrev}
              >
                <SliderArrowWhite
                  color="transparent"
                  transform="rotate(180deg)"
                  transition="color .325s"
                  _hover={{ color: `stakeholders.${theme}.support` }}
                />
              </Box>
              <Box display={{ base: 'none', lg: 'block' }}>
                <Text
                  color="white"
                  fontSize={{ lg: '40' }}
                  fontWeight="regular"
                  lineHeight="0"
                  userSelect="none"
                >
                  {`${currentStory} / ${stories.length}`}
                </Text>
              </Box>
              <Box
                opacity={currentStory === stories.length ? 0.5 : 1}
                marginLeft={{ lg: '20px' }}
                onClick={scrollNext}
              >
                <SliderArrowWhite
                  color="transparent"
                  transition="color .325s"
                  _hover={{ color: `stakeholders.${theme}.support` }}
                />
              </Box>
            </Container>
          )}
        </Box>
      </Box>
    </Box>
  );
};

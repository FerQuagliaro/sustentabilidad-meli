import { useCallback, useEffect, useState, useContext } from 'react';
import { Box, Container, BoxProps } from '@chakra-ui/react';
import { SliderArrow } from '../icons/slider-arrow';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import { GoalsContext } from '../layout/main-layout';

interface HorizontalListProps extends BoxProps {
  items: any[];
  resourceName: string;
  itemComponent: any;
  align?: EmblaOptionsType['align'];
  containScroll?: EmblaOptionsType['containScroll'];
}

export const HorizontalList: React.FC<HorizontalListProps> = (props) => {
  const {
    items = [],
    resourceName,
    itemComponent: ItemComponent,
    align,
    containScroll = '',
    ...boxProps
  } = props;
  const [arrowsOpacity, setArrowsOpacity] = useState({ prev: 0.5, next: 1 });
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: align || 'center',
    containScroll,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const canScrollPrev = useCallback(() => {
    if (emblaApi) return emblaApi.canScrollPrev();
  }, [emblaApi]);

  const canScrollNext = useCallback(() => {
    if (emblaApi) return emblaApi.canScrollNext();
  }, [emblaApi]);

  const selectedScrollSnap = useCallback(() => {
    if (emblaApi) return emblaApi.selectedScrollSnap();
  }, [emblaApi]);

  const onSetGoalImg = useContext(GoalsContext);

  useEffect(() => {
    let goalImgs;
    if (resourceName === 'goal') {
      goalImgs = items.map((item) => item.img);
      //@ts-ignore
      onSetGoalImg(goalImgs[0]);
    }
  }, []);

  useEffect(() => {
    const onSlideChange = () => {
      setArrowsOpacity({
        prev: canScrollPrev() ? 1 : 0.5,
        next: canScrollNext() ? 1 : 0.5,
      });
      let goalImgs;
      if (resourceName === 'goal') {
        goalImgs = items.map((item) => item.img);
        //@ts-ignore
        onSetGoalImg(goalImgs[selectedScrollSnap()]);
      }
    };

    emblaApi?.on('select', onSlideChange);
    //return emblaApi?.off('select', onSlideChange);
  }, [emblaApi]);

  useEffect(() => {
    setArrowsOpacity({
      prev: canScrollPrev() ? 1 : 0.5,
      next: canScrollNext() ? 1 : 0.5,
    });
  }, [canScrollPrev, canScrollNext]);

  return (
    <>
      <Box
        // pointerEvent={
        //   resourceName === 'news' || resourceName === 'goal'
        //     ? 'none'
        //     : 'default'
        // }
        cursor={resourceName === 'goal' ? 'none' : 'grab'}
        className={
          resourceName === 'news'
            ? ''
            : resourceName === 'goal'
            ? 'our-goals'
            : ''
        }
        paddingLeft={{
          base: !align ? '0' : '32px',
          md: !align ? '0' : '50px',
          lg: !align ? '0' : 'calc(((100vw - 1440px) / 2) + 160px)',
        }}
        {...boxProps}
      >
        <Box ref={emblaRef} marginBottom={{ base: '40' }}>
          <Box display="flex">
            {items.map((item, i) => {
              return <ItemComponent key={i} {...{ [resourceName]: item }} />;
            })}
          </Box>
        </Box>
      </Box>
      <Container
        maxW={{ base: 'container.mobile.lg', lg: 'container.desktop.sm' }}
        display="flex"
        alignItems="center"
        justifyContent={{ base: 'space-between', lg: 'center' }}
      >
        <Box
          onClick={() => scrollPrev()}
          marginRight={{ lg: '10px' }}
          opacity={arrowsOpacity.prev}
          pointerEvents={arrowsOpacity.prev === 0.5 ? 'none' : 'auto'}
        >
          <SliderArrow transform="rotate(180deg)" />
        </Box>
        <Box
          onClick={() => scrollNext()}
          opacity={arrowsOpacity.next}
          pointerEvents={arrowsOpacity.next === 0.5 ? 'none' : 'auto'}
        >
          <SliderArrow />
        </Box>
      </Container>
    </>
  );
};

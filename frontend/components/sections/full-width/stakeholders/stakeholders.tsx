import { useState, useCallback, useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Box, Container, useBreakpointValue } from '@chakra-ui/react';
import { Card } from './card';
import { Nav } from './nav';
import { Stakeholder } from '../../../../lib/types/home';

interface StakeholderProps {
  stakeholders: Stakeholder[];
  onHeroDisplayChange: (display: string) => void;
}

export const Stakeholders: React.FC<StakeholderProps> = ({
  stakeholders,
  onHeroDisplayChange,
}) => {
  const navLinks = stakeholders?.map((stakeholder) => {
    return stakeholder?.related?.data?.attributes?.title;
  });

  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  });

  const stakes = stakeholders?.map((stake) => {
    return {
      id: stake.related?.data?.attributes?.title,
      theme: stake.related?.data?.attributes?.theme,
    };
  });

  const [current, setCurrent] = useState(-1);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    draggable: false,
  });

  const scrollTo = useCallback(
    (id) => {
      if (emblaApi) return emblaApi.scrollTo(id, true);
    },
    [emblaApi]
  );

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext(true);
  }, [emblaApi]);

  const handleStakeholderSelect = (id: string): void => {
    const idx = stakes.findIndex((stake) => stake.id === id);
    setCurrent(idx);
    scrollTo(idx);
  };

  const handleNextStakeholderSelect = () => {
    if (current < stakeholders.length - 1) {
      setCurrent((curr) => curr + 1);
    } else {
      setCurrent((curr) => curr * 0);
    }
    scrollNext();
  };

  const onInit = () => {
    setCurrent(0);
  };

  useEffect(() => {
    let nextSlide: NodeJS.Timeout;
    if (!isDesktop) {
      nextSlide = setTimeout(() => {
        handleNextStakeholderSelect();
      }, 16000);
    }

    return () => clearTimeout(nextSlide);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, isDesktop]);

  useEffect(() => {
    emblaApi?.on('init', onInit);
  }, [emblaApi]);

  const stakeRef = useRef<HTMLDivElement>(null);

  function callBack(entries: any) {
    const [entry] = entries;
    if (entry.isIntersecting) {
      //console.log('in', entry);
      onHeroDisplayChange('grid');
    } else {
      //console.log('out', entry);
      if (entry.boundingClientRect.y < 0) {
        onHeroDisplayChange('none');
      }
    }
  }

  const options = {
    rootMargin: '-100px 0px 0px 0px',
    threshold: 0,
  };

  useEffect(() => {
    const stake = stakeRef.current;
    const observer = new IntersectionObserver(callBack, options);
    if (stake !== null) {
      observer?.observe(stake as Element);
    }
    return () => {
      if (stake) {
        observer?.unobserve(stake as Element);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      ref={stakeRef}
      as="section"
      position="relative"
      paddingTop={{ lg: '80' }}
      bgColor={`stakeholders.${stakes[current]?.theme}.base`}
      overflow="hidden"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      transition="all .85s"
      height={{ lg: '100vh', xl: 'auto' }}
    >
      <Container
        position="relative"
        maxWidth={{
          base: 'container.mobile.md',
          md: 'container.tablet.md',
          lg: 'container.desktop.md',
        }}
      >
        <Nav
          current={current}
          navLinks={navLinks}
          onStakeholderSelect={handleStakeholderSelect}
        />
      </Container>
      <Box ref={emblaRef}>
        <Box display="flex">
          {stakeholders?.map((stakeholder, i) => {
            const { slug, image, theme } =
              stakeholder.related?.data?.attributes ?? {};
            const { url, alternativeText } = image?.data?.attributes ?? {};
            return (
              <Card
                key={slug}
                idx={i}
                current={current}
                card={{
                  theme,
                  overTitle: stakeholder.overTitle,
                  title: stakeholder.related?.data?.attributes?.hero?.title,
                  excerpt: stakeholder.description,
                  img: url,
                  altImg: alternativeText,
                  projects: {
                    title: stakeholder.featuredProjectsTitle,
                    items:
                      stakeholder.projects?.map(({ url, label }) => ({
                        href: url ?? '',
                        label,
                      })) ?? [],
                  },
                  btn: {
                    label: stakeholder.btnText,
                    href: `actuacion/${slug}`,
                  },
                  dataBubbles: stakeholder.items,
                }}
                onStakeholderSelect={handleNextStakeholderSelect}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

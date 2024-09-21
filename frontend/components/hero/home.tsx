import { useEffect, useRef, useState } from 'react';
import {
  Grid,
  GridItem,
  Heading,
  Box,
  AspectRatio,
  Text,
  Container,
  keyframes,
  HStack,
} from '@chakra-ui/react';
import { PlayIcon } from '../icons/play-icon';
import { ArrowDownHomeHero } from '../icons/arrow-down-home-hero';
import VideoModal from '../video-modal';
import { useRouter } from 'next/router';

interface HeroProps {
  title: string;
  video?: string;
  btnText: string;
  display: string;
}

const crawl = keyframes`
  from {transform: translateX(-50%);}
  to {transform: translateX(0);}
`;

export const Hero: React.FC<HeroProps> = ({
  title,
  btnText,
  display,
  video,
}) => {
  const [scrollCoord, setScrollCoord] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { locale } = router;

  function callBack(entries: any) {
    const entry = entries[0];
    setScrollCoord(entry.contentRect.height);
  }

  useEffect(() => {
    const hero = heroRef.current;
    const observer = new ResizeObserver(callBack);
    if (hero !== null) {
      observer?.observe(hero as Element);
    }
    return () => {
      if (hero) {
        observer?.unobserve(hero as Element);
      }
    };
  }, []);

  return (
    <Grid
      ref={heroRef}
      as="section"
      display={display}
      position="fixed"
      zIndex={0}
      minH="100vh"
      width="100%"
      gridTemplateColumns="1fr"
      gridTemplateRows={{
        base: 'minmax(115px, 0.65fr) auto 1fr',
        lg: 'minmax(115px, 0.85fr) auto 1fr',
      }}
    >
      <GridItem
        colStart={1}
        colEnd={2}
        rowStart={2}
        rowEnd={3}
        position="relative"
      >
        <AspectRatio
          ratio={3 / 2}
          position="absolute"
          inset="0"
          overflow="hidden"
        >
          <video width="960" height="540" autoPlay loop muted>
            <source src="/vid/meli-sample-video-home.mp4" type="video/mp4" />
          </video>
        </AspectRatio>
      </GridItem>
      <GridItem
        height="103%"
        colStart={1}
        colEnd={2}
        rowStart={2}
        rowEnd={3}
        bgColor="white"
        mixBlendMode="screen"
        alignItems="center"
        zIndex={0}
      >
        <Container
          maxW={{ lg: locale === 'pt' ? '100vw' : 'container.desktop.lg' }}
        >
          <VideoModal videoId={video} showOnMobile={false}>
            <Heading
              as="h1"
              className="home-hero-title"
              textAlign="center"
              textTransform="uppercase"
              fontSize={{
                base: '55',
                md: '100',
                // lg: scrollCoord < 800 ? '150px' : '165',
                lg: '130px',
                xl: '165',
              }}
              lineHeight={{ base: '100', md: '100', lg: '165' }}
              maxW={{ lg: locale === 'pt' ? '13ch' : 'none' }}
              fontWeight="black"
              margin="0 auto"
              userSelect="none"
              px={{ base: '10px', lg: '40' }}
              cursor={{ base: 'default', lg: 'none' }}
            >
              {title}
            </Heading>
          </VideoModal>
        </Container>
      </GridItem>
      <GridItem
        rowStart={3}
        rowEnd={4}
        display="flex"
        alignItems={{ lg: scrollCoord < 800 ? 'flex-start' : 'center' }}
      >
        <Container maxWidth={{ base: 'container.mobile.md' }}>
          <Box
            as="button"
            type="button"
            display={{ base: 'flex', md: 'flex', lg: 'none' }}
            alignItems="center"
            justifyContent="space-between"
            bgColor="meli.yellow"
            width="min(100%, 275px)"
            margin="40px auto 0px auto"
            py="20px"
            px={0}
            borderRadius="full"
          >
            <VideoModal videoId={video} as="span" flex="1" overflow="hidden">
              <Text
                as="div"
                animation={`${crawl} infinite 2s linear reverse`}
                fontWeight="bold"
                whiteSpace="nowrap"
                w="180%"
              >
                <HStack spacing={0} justifyContent="space-around" w="full">
                  <Text as="span">
                    <PlayIcon width="auto" /> {btnText}
                  </Text>
                  <Text as="span">
                    <PlayIcon width="auto" /> {btnText}
                  </Text>
                  <Text as="span">
                    <PlayIcon width="auto" /> {btnText}
                  </Text>
                  <Text as="span">
                    <PlayIcon width="auto" /> {btnText}
                  </Text>
                </HStack>
              </Text>
            </VideoModal>
          </Box>
          <ArrowDownHomeHero
            display={{ base: 'none', md: 'none', lg: 'block' }}
            cursor="pointer"
            boxSize={20}
            mx="auto"
            onClick={() =>
              window.scrollTo({
                top: scrollCoord,
                left: 0,
                behavior: 'smooth',
              })
            }
          />
        </Container>
      </GridItem>
    </Grid>
  );
};

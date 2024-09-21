import Link from 'next/link';
import { useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  Spacer,
  Heading,
  Text,
  Image,
  Container,
  Button,
  Icon,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { CircleArrowRightWhite } from '../../icons/circle-arrow-right-white';
import { PlayIcon } from '../../icons/play-icon';
import { AudioWaveform } from '../../icons/audio-waveform';
import React from 'react';
import { RichText } from '../../text/rich-text';

interface CeoQuoteProps {
  title: string;
  excerpt: string;
  onBgColorChange: (color: string) => void;
  ceo: {
    quote: string;
    author: string;
    img: string;
    altImg: string;
  };
  audioSrc?: string;
  linkToLetter: {
    href: string;
    label: string;
  };
  linkToAboutPage: {
    href: string;
    label?: string;
  };
}

export const CeoQuote: React.FC<CeoQuoteProps> = (props) => {
  const {
    title,
    excerpt,
    ceo,
    audioSrc,
    linkToLetter,
    linkToAboutPage,
    onBgColorChange,
  } = props;

  const bgRef = useRef<HTMLDivElement>(null);

  function callBack(entries: any) {
    const [entry] = entries;
    if (entry.isIntersecting) {
      onBgColorChange('meli.lightBlue');
    } else {
      onBgColorChange('white');
    }
  }

  const options = {
    rootMargin: '0px',
    threshold: 0.3,
  };

  useEffect(() => {
    const bg = bgRef.current;
    const observer = new IntersectionObserver(callBack, options);
    if (bg !== null) {
      observer?.observe(bg as Element);
    }
    return () => {
      if (bg) {
        observer?.unobserve(bg as Element);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      as="section"
      ref={bgRef}
      width="100vw"
      py={{ base: '160', md: '15vw 0', lg: '240' }}
      flexDirection="column"
      alignItems="center"
    >
      <Flex
        as="article"
        flexDirection="column"
        alignItems="center"
        marginBottom="5em"
      >
        <Container
          centerContent
          maxWidth={{ base: 'container.mobile.lg', lg: 'container.desktop.lg' }}
        >
          <Box as="figure" role="group" color="#FFF" marginBottom="24px">
            <Flex
              as="blockquote"
              flexDirection="column"
              alignItems="center"
              marginBottom="16px"
            >
              <Text
                color="white"
                textAlign="center"
                fontSize={{ base: '40', md: '70', lg: '100' }}
                maxW={{ lg: '15ch' }}
                lineHeight="50"
                marginBottom="0.5em"
              >
                <RichText txt={ceo.quote} />
              </Text>
              <Image
                src={ceo.img}
                height={{ base: '75px', lg: '125px' }}
                alt={ceo.altImg}
              />
            </Flex>
            <Box
              as="figcaption"
              textAlign="center"
              fontSize={{ base: '16', lg: '20' }}
              lineHeight="20"
              margin="0 auto"
              maxW={{ base: '23ch', md: '100%' }}
            >
              {ceo.author}
            </Box>
          </Box>
        </Container>
        <Container
          centerContent
          maxWidth={{
            base: 'container.mobile.lg',
            md: 'container.tablet.md',
            lg: 'container.desktop.sm',
          }}
          px={0}
        >
          {/* <Box as="figure" role="group" width="100%" marginBottom="2em">
            <Flex
              alignItems="center"
              border="1px solid #FFF"
              borderRadius="full"
              padding="5px"
              overflow="hidden"
              margin="0 auto"
              width="100%"
            >
              <Box
                as="button"
                type="button"
                aria-label="play-audio"
                width="55px"
                height="55px"
                backgroundColor="meli.lightblue"
                borderRadius="100px"
                marginRight="10px"
              >
                <PlayIcon color="white" />
              </Box>
              <AudioWaveform
                width={{ base: '210px', md: '460px', lg: '620px' }}
                color="white"
              />
            </Flex>
          </Box> */}
          {linkToLetter.href && (
            <Link href={linkToLetter?.href} passHref>
              <Button as="a" target="_blank" variant="whiteBlue">
                {linkToLetter?.label}
              </Button>
            </Link>
          )}
        </Container>
      </Flex>
      <Spacer />
      <Container
        as="header"
        centerContent
        maxWidth={{ base: 'container.mobile.md', lg: 'container.desktop.md' }}
        px={0}
      >
        <Heading as="h2" color="meli.darkBlue" marginBottom="20" fontSize="18">
          {title}
        </Heading>
        <Text
          color="white"
          textAlign="center"
          casing="uppercase"
          fontWeight="bold"
          order={-1}
          marginBottom="20"
          fontSize={{ base: '16', lg: '20' }}
          maxW="40ch"
          lineHeight="16"
        >
          {excerpt}
        </Text>
        <Link href={linkToAboutPage?.href} passHref>
          <ChakraLink as="a" target="_blank">
            <CircleArrowRightWhite
              transform="rotate(-45deg)"
              _hover={{
                fill: 'white',
              }}
            />
          </ChakraLink>
        </Link>
      </Container>
    </Flex>
  );
};

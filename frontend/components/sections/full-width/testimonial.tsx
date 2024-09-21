import { Container, Box, Text, Image } from '@chakra-ui/react';
import { GradientDots } from '../../icons/gradient-dots';
import { RichText } from '../../text/rich-text';

interface TestimoinalProps {
  img: {
    src: string;
    alt: string;
  };
  quote: string;
  author?: string;
  country?: string;
}

export const Testimonial: React.FC<TestimoinalProps> = (props) => {
  const { img, quote, author, country } = props;

  return (
    <Box
      as="section"
      position="relative"
      zIndex={10}
      backgroundColor="meli.yellow"
      w="100%"
      py={{ base: '80', md: '160', lg: '240' }}
      my={{ base: '-81px', md: '-161px', lg: '-242px' }}
    >
      <Container
        position="relative"
        maxW={{ base: 'container.mobile.lg', xl: 'container.desktop.md' }}
        display="flex"
        flexDirection={{ base: 'column', xl: 'row' }}
        justifyContent={{ xl: 'center' }}
        alignItems={{ xl: 'center' }}
      >
        <Image
          position="relative"
          zIndex={1}
          src={img.src}
          alt={img.alt}
          maxW={{ base: '320px', lg: '450px' }}
          mx={{ base: 'auto' }}
          objectFit="contain"
          marginBottom={{ base: '40', md: '80px', xl: '0px' }}
          marginRight={{ xl: '60px' }}
          borderRadius={{ base: 'meli.md', lg: 'meli.lg' }}
        />
        <GradientDots
          display={{ xl: 'none' }}
          position="absolute"
          zIndex={0}
          top={{ base: '15%' }}
          left={{ base: '10%' }}
        />
        <Box as="figure">
          <Box as="blockquote">
            <Text
              fontSize={{ base: '30', lg: '50' }}
              lineHeight={{ base: '30', lg: '50' }}
              fontWeight={{ base: 'regular' }}
            >
              <RichText txt={quote} highLightColor="white" />
            </Text>
          </Box>
          {author && (
            <Box
              as="figcaption"
              fontSize={{ base: '18' }}
              lineHeight={{ base: '18' }}
              fontWeight={{ base: 'regular' }}
              marginTop={{ base: '40px' }}
              color="meli.black"
            >
              {author}
            </Box>
          )}
          {country && (
            <Text
              fontSize={{ base: '18' }}
              lineHeight={{ base: '18' }}
              fontWeight={{ base: 'regular' }}
              color="meli.black"
            >
              {country}
            </Text>
          )}
        </Box>
      </Container>
    </Box>
  );
};

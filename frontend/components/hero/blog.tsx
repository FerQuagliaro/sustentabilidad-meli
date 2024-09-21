import { Container, Box, Text, Heading, Image } from '@chakra-ui/react';

interface H1AndTextProps {
  overTitle?: string;
  title: string;
  titleColor?: string | 'meli.black';
  paragraph?: string;
  img?: {
    src: string;
    alt: string;
  };
}

export const Hero: React.FC<H1AndTextProps> = (props) => {
  const { overTitle, title, paragraph, titleColor, img } = props;

  return (
    <Box as="header">
      <Container
        maxW={{
          base: 'container.mobile.lg',
          md: 'container.tablet.lg',
          lg: 'container.desktop.md',
        }}
      >
        {overTitle && (
          <Text
            textTransform="uppercase"
            color="meli.black"
            fontSize={{ base: '20' }}
            lineHeight={{ base: '20' }}
            fontWeight="bold"
            marginBottom={{ base: '10' }}
          >
            {overTitle}
          </Text>
        )}
        <Box marginBottom={{ base: '40', lg: '5rem' }}>
          <Heading
            as="h1"
            color={titleColor}
            fontSize={{ base: '40', md: '60', lg: '100' }}
            lineHeight={{ base: '40', lg: '100' }}
            fontWeight="bold"
            marginBottom={{ base: '40' }}
          >
            {title}
          </Heading>
          {paragraph && (
            <Text
              color="meli.black"
              fontSize={{ base: '20', lg: '30' }}
              lineHeight={{ base: '20', lg: '30' }}
              fontWeight="regular"
              maxW={{ md: '50ch' }}
            >
              {paragraph}
            </Text>
          )}
        </Box>
      </Container>
      {img && (
        <Container
          px={0}
          maxW={{ base: '100vw', lg: 'container.desktop.md' }}
          height={{ base: '320px', lg: '500px' }}
          borderRadius={{ lg: 'meli.lg' }}
          overflow="hidden"
        >
          <Image
            src={img.src}
            alt={img.alt}
            objectFit="cover"
            height={{ base: '100%', lg: '100%' }}
          />
        </Container>
      )}
    </Box>
  );
};

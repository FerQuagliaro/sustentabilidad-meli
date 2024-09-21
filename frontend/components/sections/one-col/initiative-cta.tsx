import Link from 'next/link';
import { Box, Container, Heading, Button } from '@chakra-ui/react';

interface InitiativeProps {
  title?: string;
  link: {
    href: string;
    label: string;
  };
}

export const InitiativeCTA: React.FC<InitiativeProps> = (props) => {
  const { title, link } = props;

  return (
    <Box
      width="100vw"
      position="relative"
      zIndex={10}
      my={{ base: '-81px', md: '-161px', lg: '-242px' }}
      backgroundColor="white"
    >
      <Container
        centerContent
        backgroundColor="meli.yellow"
        borderRadius={{ base: 'meli.md', lg: 'meli.lg' }}
        maxW={{
          base: 'container.mobile.lg',
          md: 'container.tablet.lg',
          lg: 'container.desktop.md',
        }}
        py={{ base: '80', lg: '160' }}
      >
        <Container
          maxW={{ base: 'container.mobile.md', md: 'container.tablet.md' }}
          centerContent
        >
          <Heading
            as="h2"
            color="meli.black"
            fontSize={{ base: '40', lg: '50' }}
            lineHeight={{ base: '40', lg: '50' }}
            textAlign="center"
            fontWeight="semibold"
            marginBottom={{ base: '20', md: '40' }}
          >
            {title}
          </Heading>
          <Link href={link.href} passHref>
            <Button as="a" target="_blank" variant="dark">
              {link.label}
            </Button>
          </Link>
        </Container>
      </Container>
    </Box>
  );
};

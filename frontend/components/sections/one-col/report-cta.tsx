import Link from 'next/link';
import { Container, Text, Heading, Button } from '@chakra-ui/react';

interface ReportProps {
  title: string;
  excerpt?: string;
  link: {
    href: string;
    label: string;
  };
}

export const ReportCTA: React.FC<ReportProps> = (props) => {
  const { title, excerpt, link } = props;

  return (
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
          fontSize={{ base: '40', lg: '80' }}
          lineHeight={{ base: '40', lg: '80' }}
          textAlign="center"
          fontWeight="bold"
          marginBottom={{ base: '10px', md: '25px' }}
        >
          {title}
        </Heading>
        <Text
          textAlign="center"
          color="meli.black"
          fontSize={{ base: '20', lg: '30' }}
          lineHeight={{ base: '20', lg: '30' }}
          fontWeight="regular"
          marginBottom={{ base: '30px', md: '40px' }}
          maxW={{ md: '40ch' }}
        >
          {excerpt}
        </Text>
        <Link href={link.href} passHref>
          <Button as="a" target="_blank" variant="white" outline="none">
            {link.label}
          </Button>
        </Link>
      </Container>
    </Container>
  );
};

import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetStaticProps, NextPage } from 'next';
import { Container, Text, Flex, Button } from '@chakra-ui/react';
import { getFooter, getHeader } from '../lib/api';

interface Custom500Props {
  upsText: string;
  excerpt: string;
}

const Custom500: NextPage<Custom500Props> = ({ upsText, excerpt }) => {
  const router = useRouter();
  const { locale } = router;
  return (
    <Flex
      backgroundColor={{ base: 'meli.yellow', lg: 'white' }}
      alignItems={{ base: 'center', lg: 'flex-end' }}
      justifyContent="center"
      minH="100vh"
    >
      <Container
        px={0}
        maxW={{ base: 'container.mobile.lg', lg: 'container.desktop.md' }}
        minH={{ lg: '100vh' }}
        display="grid"
        alignItems="center"
        justifyContent="center"
        gridTemplateRows="120px 0.5fr auto 1fr"
      >
        <Flex
          width="100vw"
          maxW={{ lg: 'container.desktop.md' }}
          gridRowStart={3}
          gridRowEnd={4}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          backgroundColor={{ lg: 'meli.yellow' }}
          borderRadius={{ lg: 'meli.md' }}
          py={{ lg: 'min(80px, 8vh)' }}
        >
          <Text
            position="relative"
            fontSize={{ base: '160px', md: '240px', lg: 'min(320px, 30vh)' }}
            color="white"
            fontWeight="black"
            lineHeight={{ lg: '1' }}
            sx={{
              '&::after': {
                content: "'500'",
                color: 'transparent',
                WebkitTextStrokeWidth: '3px',
                WebkitTextStrokeColor: '#333',
                position: 'absolute',
                left: { base: '-1', lg: '-2' },
                bottom: { base: '1', lg: '2' },
              },
            }}
          >
            500
          </Text>
          <Text
            marginTop={{ base: '-60px', lg: '-40px' }}
            fontSize={{ base: '60' }}
            fontWeight="black"
            color="meli.black"
          >
            {upsText || 'Ups'}
          </Text>
          <Text
            fontSize={{ base: '20' }}
            fontWeight="regular"
            color="meli.black"
            textAlign="center"
          >
            {excerpt || locale === 'pt'
              ? 'A página não foi encontrada.'
              : 'La página no ha sido encontrada.'}
          </Text>
          <Link href="/" passHref>
            <Button as="a" marginTop={{ base: '20', lg: '40' }} variant="white">
              {locale === 'pt' ? 'Voltar ao início' : 'Volver al inicio'}
            </Button>
          </Link>
        </Flex>
      </Container>
    </Flex>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale || 'es';

  const [header, footer] = await Promise.all([
    getHeader(locale),
    getFooter(locale),
  ]);

  return {
    props: {
      layout: {
        header: header.data.attributes,
        footer: footer.data.attributes,
      },
    },
    revalidate: 900,
  };
};

export default Custom500;

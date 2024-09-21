import Link from 'next/link';
import { Box, Heading, Image, Link as ChakraLink } from '@chakra-ui/react';

export interface StakeholderProps {
  title: string;
  theme: string;
  url: string;
  img: {
    src: string;
    alt: string;
  };
}

interface Props {
  stakeholder: StakeholderProps;
}

export const Stakeholder: React.FC<Props> = ({ stakeholder }) => {
  const { title, url, img, theme } = stakeholder;

  return (
    <Box
      flex="0 0 auto"
      paddingRight={{ base: '20', lg: '24px' }}
      cursor="pointer"
      pt={{ lg: '12' }}
    >
      <Box>
        <Box
          backgroundColor={`stakeholders.${theme}.base`}
          overflow="hidden"
          position="relative"
          width={{ base: 'calc(100vw - 82px)', md: '370px' }}
          height={{ base: '450px' }}
          borderRadius={{ base: 'meli.md', lg: 'meli.lg' }}
          transition="all .35s"
          _hover={{
            lg: {
              transform: 'translateY(-20px)',
              boxShadow: '0px 10px 25px 10px rgba(0,0,0,0.30)',
            },
          }}
        >
          <Link href={url} passHref>
            <ChakraLink
              display="block"
              h="full"
              w="full"
              py={{ base: '78px' }}
              px={{ base: '8' }}
              textDecoration="none"
              _hover={{ textDecoration: 'none' }}
            >
              <Heading
                color={`stakeholders.${theme}.accent`}
                textAlign="center"
                fontSize={{ base: '32px', lg: '38px' }}
                lineHeight="60"
              >
                {title}
              </Heading>

              <Image
                src={img.src}
                alt={img.alt}
                position="absolute"
                bottom={theme === 'lightGreen' ? '-40px' : '-40px'}
                right={theme === 'lightGreen' ? '-20px' : '-30px'}
                height={theme === 'lightGreen' ? '390px' : '360px'}
                maxWidth="none"
              />
            </ChakraLink>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

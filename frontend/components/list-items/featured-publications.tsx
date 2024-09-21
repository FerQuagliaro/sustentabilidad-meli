import Link from 'next/link';
import { Box, Flex, Text, Heading } from '@chakra-ui/react';
import { FullCircleArrowDown } from '../icons/fullCircle-arrow-down';

export interface PublicationProps {
  tag: string;
  title: string;
  color: string;
  link: {
    label: string;
    url: string;
  };
}

interface Props {
  publication: PublicationProps;
}

export const FeaturedPublication: React.FC<Props> = ({ publication }) => {
  const { tag, title, color, link } = publication;

  return (
    <Link href={link.url} passHref>
      <Box
        as="a"
        target="_blank"
        flex="0 0 auto"
        marginRight={{ base: '20', lg: '40' }}
        cursor="pointer"
      >
        <Box
          width={{ base: 'calc(100vw - 82px)', md: '485px' }}
          height={{ base: '465px', md: '615px' }}
          backgroundColor={color}
          display="grid"
          gridTemplateColumns="1fr"
          gridTemplateRows={{
            base: '60px auto 40px auto 1fr auto 25px',
            md: '100px auto 60px auto 1fr auto 45px',
          }}
          borderRadius={{ base: 'meli.lg' }}
          px={{ base: '32px', md: '50px' }}
          color="white"
          transition="all .35s"
          _hover={{
            lg: {
              transform: 'translateY(-20px)',
              boxShadow: '0px 10px 25px 10px rgba(0,0,0,0.30)',
            },
          }}
        >
          <Flex
            gridRowStart={2}
            display="flex"
            position="relative"
            width="max-content"
            alignItems="center"
          >
            {tag && (
              <Text
                borderRadius="full"
                backgroundColor="rgba(0,0,0,0.25)"
                color="white"
                position="relative"
                zIndex={10}
                padding={{ base: '10px 20px' }}
                fontWeight="semibold"
                fontSize={{ base: '13', md: '20' }}
              >
                {tag}
              </Text>
            )}
          </Flex>
          <Heading
            as="h3"
            color="white"
            gridRowStart={4}
            fontSize={{ base: '25', md: '40' }}
            lineHeight={{ base: '50' }}
            fontWeight="bold"
            paddingRight={{ base: '18px' }}
          >
            {title}
          </Heading>
          <Box gridRowStart={6} justifySelf="end" cursor="pointer">
            <Flex alignItems="center">
              <Text
                color="white"
                fontSize={{ base: '16', md: '20' }}
                fontWeight="semibold"
                marginRight={{ base: '10px', md: '20px' }}
              >
                {link.label}
              </Text>
              <FullCircleArrowDown
                color={color}
                boxSize={{ base: '8', lg: '9' }}
              />
            </Flex>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

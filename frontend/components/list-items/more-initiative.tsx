import Link from 'next/link';
import { Flex, Image, Box, Text, Link as ChakraLink } from '@chakra-ui/react';
import { CircleArrowRight } from '../icons/circle-arrow-right';

export interface MoreInitiativeProps {
  img: {
    src: string;
    alt: string;
  };
  title: string;
  link: string;
}

interface Props {
  initiative: MoreInitiativeProps;
}

export const MoreInitiative: React.FC<Props> = ({ initiative }) => {
  const { img, title, link } = initiative;

  return (
    <Flex
      as="div"
      py={{ base: '40' }}
      width="100%"
      borderTop="1px solid"
      borderTopColor="meli.lightGrey"
      _last={{
        borderBottom: '1px solid',
        borderBottomColor: 'meli.lightGrey',
      }}
    >
      <Link href={link} passHref>
        <ChakraLink
          display="flex"
          alignItems="center"
          width="100%"
          _hover={{ listStyleType: 'none' }}
          sx={{
            '&:hover svg': {
              backgroundColor: 'meli.yellow',
            },
          }}
        >
          {img.src && (
            <Box
              display={{ base: 'none', lg: 'block' }}
              width={{ lg: '145px' }}
              height={{ lg: '125px' }}
              overflow="hidden"
              borderRadius={{ lg: 'meli.md' }}
              marginRight={{ lg: '40' }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                height="100%"
                objectFit="cover"
                display={{ base: 'none', lg: 'block' }}
              />
            </Box>
          )}
          <Text
            color="meli.black"
            fontWeight="bold"
            fontSize={{ base: '30', lg: '40' }}
            lineHeight={{ base: '30', lg: '40' }}
            marginRight="auto"
            maxW={{ lg: '75%' }}
          >
            {title}
          </Text>
          <CircleArrowRight
            display={{ base: 'none', lg: 'block' }}
            transform="rotate(-45deg)"
            borderRadius="full"
            transition="all .325s"
            width="50px"
            height="50px"
          />
        </ChakraLink>
      </Link>
    </Flex>
  );
};

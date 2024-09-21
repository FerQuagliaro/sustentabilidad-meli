import Link from 'next/link';
import {
  Box,
  Flex,
  Image,
  Heading,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { CircleArrowRight } from '../icons/circle-arrow-right';
import { RichText } from '../text/rich-text';

export interface PublicationProp {
  tag: string;
  img: {
    src: string;
    alt: string;
  };
  text: string;
  link: {
    url: string;
    label?: string;
  };
}

interface Props {
  publication: PublicationProp;
}

export const PublicationResult: React.FC<Props> = ({ publication }) => {
  const { img, text, link, tag } = publication;

  return (
    <Link href={link.url} passHref>
      <ChakraLink w="100%" isExternal _hover={{ listStyleType: 'none' }}>
        <Flex
          width="100%"
          py={{ base: '20', lg: '40' }}
          alignItems={{ lg: 'center' }}
        >
          {img.src && (
            <Box
              width={{ base: '75px', lg: '210px' }}
              height={{ base: '70px', lg: '185px' }}
              borderRadius={{ lg: 'meli.lg' }}
              overflow="hidden"
              marginRight={{ base: '20', lg: '40' }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                objectFit="cover"
                height="100%"
                width="100%"
              />
            </Box>
          )}
          <Box marginRight="auto" maxW={{ lg: '60%' }}>
            <Heading
              as="h3"
              fontSize={{ base: '16', lg: '40' }}
              fontWeight="regular"
              lineHeight={{ base: '40' }}
              marginBottom={{ lg: '8px' }}
            >
              <RichText txt={text} />
            </Heading>
            {tag && (
              <Text
                display={{ base: 'none', lg: 'block' }}
                backgroundColor="#F5F5F5"
                fontSize="16"
                fontWeight="bold"
                width="max-content"
                borderRadius="full"
                padding="10px 20px"
              >
                {tag}
              </Text>
            )}
          </Box>
          <CircleArrowRight
            borderRadius="full"
            transform="rotate(90deg)"
            width={{ base: '35px', lg: '70px' }}
            height={{ base: '35px', lg: '70px' }}
          />
        </Flex>
      </ChakraLink>
    </Link>
  );
};

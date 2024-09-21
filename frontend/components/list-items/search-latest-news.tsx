import Link from 'next/link';
import { RichText } from '../text/rich-text';
import {
  Flex,
  Box,
  Image,
  Heading,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { CircleArrowRight } from '../icons/circle-arrow-right';

interface NewsCardProps {
  img: string;
  imgAlt: string;
  postDate: string;
  title: string;
  excerpt: string;
  linkToArticle: {
    href: string;
    label: string;
  };
}

interface Props {
  news: NewsCardProps;
}

export const LatestNewsResult: React.FC<Props> = ({ news }) => {
  const { img, imgAlt, postDate, title, linkToArticle } = news;

  return (
    <Flex py={{ base: '40px' }} w="100%">
      <Link href={linkToArticle.href} passHref>
        <ChakraLink
          _hover={{ listStyleType: 'none' }}
          display="flex"
          flexDirection={{ base: 'column', lg: 'row' }}
          alignItems={{ lg: 'center' }}
          w="100%"
        >
          {img && (
            <Box
              width={{ base: '58px', lg: '210px' }}
              height={{ base: '51px', lg: '185px' }}
              borderRadius={{ base: '16px', lg: 'meli.lg' }}
              marginBottom={{ base: '10px', lg: '0' }}
              marginRight={{ base: '0', lg: '50px' }}
              overflow="hidden"
            >
              <Image
                src={img}
                alt={imgAlt}
                width="100%"
                height="100%"
                objectFit="cover"
              />
            </Box>
          )}
          <Box
            display={{ base: 'block', lg: 'flex' }}
            flexDirection="column-reverse"
            justifyContent="center"
            marginRight={{ lg: 'auto' }}
            maxW={{ lg: '60%' }}
            height={{ lg: 'full' }}
            position={{ lg: 'relative' }}
          >
            <Heading
              as="h3"
              fontSize={{ base: '20', lg: '40' }}
              lineHeight={{ base: '20', lg: '40' }}
              fontWeight={{ base: 'semibold', lg: 'regular' }}
              color="meli.black"
              marginBottom={{ base: '10px', lg: '0' }}
              py={{ lg: '8' }}
            >
              <RichText txt={title} />
            </Heading>
            <Text
              backgroundColor={{ base: 'transparent', lg: 'meli.yellow' }}
              color="meli.black"
              width="fit-content"
              padding={{ lg: '5px 18px' }}
              borderRadius={{ lg: 'full' }}
              fontSize={{ base: '13', lg: '16' }}
              marginBottom={{ lg: '10px' }}
              position={{ lg: 'absolute' }}
              top={{ lg: '0' }}
            >
              {postDate}
            </Text>
          </Box>
          <CircleArrowRight
            display={{ base: 'none', lg: 'inline-block' }}
            alignSelf="center"
            borderRadius="full"
            transition="all .325s"
            transform="rotate(-45deg)"
            width="70px"
            height="70px"
          />
        </ChakraLink>
      </Link>
    </Flex>
  );
};

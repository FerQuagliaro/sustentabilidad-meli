import Link from 'next/link';
import { useRouter } from 'next/router';
import { Flex, Image, Heading, Text, Button, Box } from '@chakra-ui/react';
import { RichText } from '../text/rich-text';

export interface NewsCardProps {
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

export const LatestNews: React.FC<Props> = ({ news }) => {
  const { img, imgAlt, postDate, title, excerpt, linkToArticle } = news;
  const { route } = useRouter();

  return (
    <Flex
      position="relative"
      flex={{ base: '0 0 85%', lg: '0 0 80%' }}
      display="flex"
      justifyContent={{ base: 'center', lg: 'flex-start' }}
      marginRight="18px"
      cursor={route !== '/' ? 'grab' : 'grab'}
      _active={{
        cursor: route !== '/' ? 'grabbing' : 'none',
      }}
    >
      <Flex flexDirection={{ base: 'column', lg: 'row' }}>
        <Box
          marginBottom={{ base: '1.5em', lg: '0px' }}
          marginRight={{ base: '0px', lg: '2em' }}
          width="100%"
          minH={{ base: '230px', lg: '400px' }}
          maxW={{ base: '580px', md: 'container.tablet.md', lg: '500px' }}
          borderRadius="meli.md"
          overflow="hidden"
          position="relative"
        >
          <Image
            src={img}
            alt={imgAlt}
            objectFit="cover"
            minH="100%"
            position={{ base: 'absolute', md: 'static' }}
          />
        </Box>
        <Flex flexDirection="column" alignItems="flex-start" height="100%">
          <Text
            as="time"
            //dateTime={postDate}
            fontSize={{ base: '14', lg: '16' }}
            color="meli.darkBlue"
            marginBottom={{ base: '1em' }}
          >
            {postDate}
          </Text>
          <Heading
            as="h3"
            fontSize={{ base: '20', md: '30', lg: '40' }}
            lineHeight={{ base: '20', lg: '40' }}
            letterSpacing="normal"
            color="meli.darkBlue"
            fontWeight="regular"
            marginBottom={{ base: '20px' }}
            maxW={{ lg: '460px' }}
            noOfLines={3}
          >
            <RichText txt={title} />
          </Heading>
          <Text
            fontSize="16"
            lineHeight={1.625}
            width={{ md: '60ch', lg: '40ch' }}
            color="meli.black"
            display={{ base: 'none', md: '-webkit-box' }}
            mb={{ base: 9, lg: 0 }}
            noOfLines={3}
          >
            {excerpt}
          </Text>
          <Box marginTop="auto">
            <Link href={linkToArticle.href} passHref>
              <Button as="a" variant="blue" cursor="pointer">
                {linkToArticle.label}
              </Button>
            </Link>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

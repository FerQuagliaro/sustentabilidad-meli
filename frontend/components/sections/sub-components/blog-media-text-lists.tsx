import {
  Heading,
  Text,
  Image,
  VStack,
  AspectRatio,
  Box,
} from '@chakra-ui/react';
import { VerticalList } from '../../lists/vertical-list';
import { RichText } from '../../text/rich-text';

export interface BlogMediaTextListsProps {
  title?: string;
  paragraphs?: string[];
  verticalList?: {
    items: any[];
  };
  videos?: string[];
  images?: {
    src: string;
    alt: string;
  }[];
  listItemComponent?: {
    resourceName: string;
    itemComponent: any;
  };
}

export const BlogMediaTextLists: React.FC<BlogMediaTextListsProps> = (
  props
) => {
  const {
    title,
    paragraphs,
    verticalList,
    videos,
    images,
    listItemComponent,
  } = props;

  return (
    <>
      {title && (
        <Heading variant="blog_secTitle" size="blog_secTitle">
          <RichText txt={title} />
        </Heading>
      )}
      {paragraphs && (
        <VStack spacing={{ base: '40' }} alignItems="flex-start">
          {paragraphs.map((paragraph, i) => {
            return (
              <Text
                key={i}
                variant="twoCol_subSection"
                size="twoCol_subSection"
              >
                <RichText txt={paragraph} />
              </Text>
            );
          })}
        </VStack>
      )}
      {verticalList && (
        <VerticalList
          items={verticalList.items}
          resourceName={listItemComponent?.resourceName || ''}
          itemComponent={listItemComponent?.itemComponent}
        />
      )}
      {videos && (
        <VStack spacing={{ base: '40' }} w="100%">
          {videos.map((url) => {
            return (
              <AspectRatio
                key={url}
                w={{ base: 'calc(100% + 64px)', lg: '100%' }}
                ratio={{ base: 1, lg: 16 / 9 }}
                borderRadius={{ lg: 'meli.md' }}
                overflow={{ lg: 'hidden' }}
              >
                <iframe
                  width="560"
                  height="315"
                  src={url}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </AspectRatio>
            );
          })}
        </VStack>
      )}
      {images && (
        <VStack spacing={{ base: '40' }} w="100%">
          {images.map((img) => {
            return (
              <Box
                key={img.src}
                width={{ base: 'calc(100% + 64px)', lg: '100%' }}
                maxH={{ base: '320px', lg: '400px' }}
                overflow="hidden"
                borderRadius={{ lg: 'meli.md' }}
              >
                <Image src={img.src} alt={img.alt} objectFit="cover" />
              </Box>
            );
          })}
        </VStack>
      )}
    </>
  );
};

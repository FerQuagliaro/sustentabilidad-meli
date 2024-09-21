import {
  Heading,
  Text,
  Image,
  VStack,
  AspectRatio,
  Box,
} from '@chakra-ui/react';
import { VerticalList } from '../../lists/vertical-list';
import { HorizontalList } from '../../lists/horizontal-list';
import { RichText } from '../../text/rich-text';
import { TwoColList } from '../../lists/two-col-list';
import VideoModal from '../../video-modal';
import { WatchVideoIcon } from '../../icons/watch-video';

export interface MediaTextListsProps {
  logo?: {
    src: string;
    alt: string;
  };
  title?: string;
  theme?: string;
  paragraphs?: string[];
  verticalList?: {
    items: any[];
    spacing: string | {};
  };
  horizontalList?: {
    items: any[];
    resourceName: string;
    itemComponent: any;
  };
  twoColList?: {
    items: any[];
    resourceName: string;
    itemComponent: any;
  };
  videos?: {
    img: {
      src: string;
      alt: string;
    };
    videoUrl: string;
  }[];
  images?: {
    src: string;
    alt: string;
  }[];
  verticalListItemComponent?: {
    resourceName: string;
    itemComponent: any;
  };
  horizontalListItemComponent?: {
    resourceName: string;
    itemComponent: any;
  };
  twoColListItemComponent?: {
    resourceName: string;
    itemComponent: any;
  };
}

export const MediaTextLists: React.FC<MediaTextListsProps> = (props) => {
  const {
    logo,
    title,
    theme,
    paragraphs,
    verticalList,
    horizontalList,
    twoColList,
    videos,
    images,
    verticalListItemComponent,
    horizontalListItemComponent,
    twoColListItemComponent,
  } = props;

  return (
    <VStack alignItems="flex-start" spacing={{ base: '40' }} w="100%">
      {logo && <Image maxH="80px" src={logo.src} alt={logo.alt} />}
      {title && (
        <Heading
          variant="twoCol_subSection"
          size="twoCol_subSection"
          color={theme ? `stakeholders.${theme}.dark` : 'meli.black'}
        >
          <RichText txt={title} />
        </Heading>
      )}
      {paragraphs &&
        paragraphs.length &&
        paragraphs.filter((p) => !!p).length > 0 && (
          <VStack spacing={{ base: '20' }} alignItems="flex-start">
            {paragraphs.map((paragraph, i) => {
              return (
                <Text
                  key={i}
                  variant="twoCol_subSection"
                  size="twoCol_subSection"
                  sx={{
                    a: {
                      fontWeight: 'semibold',
                      boxShadow: '0 1px 0 #ccc',
                    },
                  }}
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
          spacing={verticalList.spacing}
          resourceName={verticalListItemComponent?.resourceName || ''}
          itemComponent={verticalListItemComponent?.itemComponent}
        />
      )}
      {horizontalList && (
        <Box w="full">
          <HorizontalList
            overflow="hidden"
            containScroll="keepSnaps"
            items={horizontalList.items}
            resourceName={horizontalListItemComponent?.resourceName || ''}
            itemComponent={horizontalListItemComponent?.itemComponent}
            ml={{ base: '-32px', md: '-50px', lg: '0' }}
            mr={{
              base: '-32px',
              md: '-50px',
              lg: 'calc((100vw - min(80vw, 1120px)) / 2 * -1)',
            }}
            pl={{ base: '32px', md: '50px', lg: '0' }}
            pr={{
              base: '32px',
              md: '50px',
              lg: 'calc((100vw - min(80vw, 1120px)) / 2)',
            }}
          />
        </Box>
      )}
      {twoColList && (
        <TwoColList
          items={twoColList.items}
          resourceName={twoColListItemComponent?.resourceName || ''}
          itemComponent={twoColListItemComponent?.itemComponent}
        />
      )}
      {videos && (
        <VStack alignItems="flex-start" spacing={{ base: '40' }} w="100%">
          {videos.map((video) => {
            return (
              <VideoModal key={video?.videoUrl} videoId={video?.videoUrl}>
                <Box position="relative" cursor="pointer">
                  <WatchVideoIcon />
                  <Image
                    key={video?.img?.src}
                    width="100%"
                    maxH={{ lg: '400px' }}
                    borderRadius={{ base: 'meli.md' }}
                    src={video?.img?.src}
                    alt={video.img?.alt}
                  />
                </Box>
              </VideoModal>
            );
          })}
        </VStack>
      )}
      {images && (
        <VStack spacing={{ base: '40' }} w="100%">
          {images.map((img) => {
            return (
              <Image
                key={img.src}
                width="100%"
                maxH={{ lg: '400px' }}
                borderRadius={{ base: 'meli.md' }}
                src={img.src}
                alt={img.alt}
              />
            );
          })}
        </VStack>
      )}
    </VStack>
  );
};

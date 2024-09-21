import { Box, Text, Image } from '@chakra-ui/react';
import { RichText } from '../text/rich-text';

interface TwoColListProps {
  items: any[];
  theme?: string;
  resourceName: string;
  itemComponent: any;
  listHeader?: {
    title?: string;
    excerpt?: string;
    img?: {
      src: string;
      alt: string;
    };
  };
}

export const TwoColList: React.FC<TwoColListProps> = (props) => {
  const {
    listHeader,
    items,
    resourceName,
    itemComponent: ItemComponent,
    theme,
  } = props;

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ base: '1fr', xl: 'repeat(2, minmax(0, 1fr))' }}
      gridColumnGap={60}
      gridRowGap={{ base: '80', xl: '160' }}
      marginTop="0px !important"
    >
      {listHeader && (
        <Box
          position="relative"
          gridColumnStart={1}
          gridColumnEnd={-1}
          display="grid"
          gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
          gridColumnGap={{ lg: '60' }}
        >
          <Box>
            {listHeader.title && (
              <Text
                color={`stakeholders.${theme}.dark`}
                fontSize={{ base: '50', lg: '70' }}
                lineHeight="70"
                fontWeight="regular"
              >
                <RichText txt={listHeader.title} />
              </Text>
            )}
            {listHeader.excerpt && (
              <Text
                color="meli.black"
                fontWeight="regular"
                fontSize="18"
                lineHeight="20"
                marginTop={{ base: '20px' }}
              >
                {listHeader.excerpt}
              </Text>
            )}
          </Box>
          {listHeader.img && (
            <Image
              position={{ lg: 'absolute' }}
              top={0}
              gridColumnStart={{ base: '1', lg: '2' }}
              gridColumnEnd={-1}
              gridRowStart={{ base: '-1', lg: 'auto' }}
              maxH="375px"
              transform={{ lg: 'translateY(-80px)' }}
              marginTop={{ base: '25px', lg: '0' }}
              marginBottom={{ base: '80', lg: '0' }}
              src={listHeader.img.src}
              alt={listHeader.img.alt}
            />
          )}
        </Box>
      )}
      {items.map((item, i) => {
        const col = i % 2 === 0 ? 1 : 2;
        return (
          <ItemComponent
            key={i}
            {...{ [resourceName]: item, col: col, theme: theme }}
          />
        );
      })}
    </Box>
  );
};

import { Box, VStack, StackDivider } from '@chakra-ui/react';

interface VerticalListProps {
  items: any[];
  resourceName: string;
  itemComponent: any;
  spacing?: string | {};
  divider?: boolean;
}

export const VerticalList: React.FC<VerticalListProps> = (props) => {
  const {
    items = [],
    resourceName,
    itemComponent: ItemComponent,
    spacing,
    divider,
  } = props;

  return (
    <Box as="div" width="100%">
      <VStack
        width="100%"
        spacing={spacing || '20'}
        divider={
          divider ? <StackDivider borderColor="meli.lightGrey" /> : undefined
        }
      >
        {items.map((item, i) => {
          return <ItemComponent key={i} {...{ [resourceName]: item }} />;
        })}
      </VStack>
    </Box>
  );
};

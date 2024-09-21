import { UnorderedList, ListItem, Text } from '@chakra-ui/react';

interface FiltersProps {
  filters: { id: number; name: string }[];
  current: number;
  onFilterSelect: (filter: number) => void;
}

export const Filters: React.FC<FiltersProps> = (props) => {
  const { filters, current, onFilterSelect } = props;
  const allFilters = [...filters];
  allFilters.unshift({ id: 0, name: 'Todo' });

  return (
    <UnorderedList
      listStyleType="none"
      marginLeft={0}
      paddingLeft={{ base: '32px', lg: 'calc(((100vw - 1440px) / 2) + 160px)' }}
      paddingRight={{
        base: '32px',
        lg: 'calc(((100vw - 1440px) / 2) + 160px)',
      }}
      overflowX="scroll"
      display="grid"
      gridAutoFlow="column"
      gridColumnGap="16px"
      marginBottom={{ base: '40' }}
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '&': {
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        },
      }}
    >
      {allFilters.map((filter) => {
        return (
          <ListItem
            key={filter.id}
            cursor="pointer"
            boxSizing="border-box"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="1px solid"
            borderColor={filter.id === current ? 'white' : 'meli.black'}
            borderRadius="full"
            backgroundColor={filter.id === current ? 'meli.yellow' : 'white'}
            onClick={() => onFilterSelect(filter.id)}
            _hover={{
              backgroundColor: '#F5F5F5',
            }}
          >
            <Text
              width="max-content"
              padding={{ base: '10px 20px' }}
              color="meli.black"
              fontSize={{ base: '13' }}
              fontWeight="bold"
            >
              {filter.name}
            </Text>
          </ListItem>
        );
      })}
    </UnorderedList>
  );
};

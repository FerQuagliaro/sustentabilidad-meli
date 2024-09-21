import { Flex, Text } from '@chakra-ui/react';

export interface FilterProps {
  filter: {
    searchFilter: string;
    current: string;
    onFilterSelect: (filter: string) => void;
  };
}

export const SearchFilter: React.FC<FilterProps> = ({ filter }) => {
  const { searchFilter, current, onFilterSelect } = filter;

  return (
    <Flex
      as="li"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      border="1px solid"
      borderColor={current === searchFilter ? 'white' : 'meli.black'}
      borderRadius="full"
      backgroundColor={current === searchFilter ? 'meli.yellow' : 'white'}
      onClick={() => onFilterSelect(searchFilter)}
    >
      <Text
        width="max-content"
        padding={{ base: '10px 20px' }}
        color="meli.black"
        fontSize={{ base: '13' }}
        fontWeight="bold"
      >
        {filter}
      </Text>
    </Flex>
  );
};

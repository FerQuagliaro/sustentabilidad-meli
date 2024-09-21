import {
  Input,
  Flex,
  Box,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import { SearchIcon } from '../../../icons/search';
import { CloseSearch } from '../../../icons/close-search-icon';
import { ChangeEventHandler } from 'react';

interface SearchInputProps {
  value?: string;
  placeholder: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  resetValue: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = (props) => {
  const { placeholder, value, handleChange, resetValue } = props;
  const size = useBreakpointValue({ base: 'mobile', lg: 'desktop' });
  const { isOpen, onToggle } = useDisclosure();

  const onSearchClose = () => {
    resetValue();
    onToggle();
  };

  return (
    <Flex
      flex={1}
      alignItems="flex-end"
      transform={{ lg: 'translateY(-14px)' }}
      marginBottom={{ base: '40', lg: '0' }}
    >
      <Box w="100%" marginRight={{ base: '20', lg: '40' }}>
        <Input
          visibility={
            size === 'desktop' ? (isOpen ? 'visible' : 'hidden') : 'visible'
          }
          opacity={size === 'desktop' ? (isOpen ? 1 : 0) : 1}
          placeholder={placeholder}
          variant="unstyled"
          focusBorderColor="meli.black"
          fontSize={{ lg: '20' }}
          transition="opacity .25s .35s"
          userSelect={isOpen ? 'auto' : 'none'}
          _focus={{
            caretColor: 'meli.yellow !important',
            color: 'meli.black',
          }}
          value={value}
          onChange={handleChange}
        />
        <Box
          as="span"
          display="block"
          height="1px"
          backgroundColor="meli.grey"
          width="100%"
          transformOrigin="right"
          transform={
            size === 'desktop'
              ? isOpen
                ? 'scaleX(100%)'
                : 'scaleX(0)'
              : 'scaleX(100%)'
          }
          transition="transform .5s cubic-bezier(.7,0,.3,1)"
        />
      </Box>
      <SearchIcon
        boxSize={{ base: '12', lg: '20' }}
        display={isOpen ? 'none' : 'block'}
        onClick={onToggle}
        cursor="pointer"
      />
      {size === 'desktop' && (
        <CloseSearch
          boxSize={{ base: '12', lg: '20' }}
          display={!isOpen ? 'none' : 'block'}
          onClick={onSearchClose}
          cursor="pointer"
        />
      )}
    </Flex>
  );
};

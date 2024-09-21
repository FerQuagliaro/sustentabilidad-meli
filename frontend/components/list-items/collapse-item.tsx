import { Collapse, Box, useDisclosure, Text } from '@chakra-ui/react';
import { RichText } from '../text/rich-text';
import { PlusIcon } from '../icons/plus-icon';
import { MinusIcon } from '../icons/minus-icon';

interface Props {
  data: {
    title: string;
    txt: string;
  };
}

export const CollapseItem: React.FC<Props> = ({ data }) => {
  const { title, txt } = data;
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      w="100%"
      py="40px"
      mt="0 !important"
      _last={{
        borderBottom: '1px solid',
        borderBottomColor: 'meli.lightGrey',
      }}
      borderTop="1px solid"
      borderTopColor="meli.lightGrey"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text
          fontSize={{ base: '20', lg: '30' }}
          lineHeight={{ base: '20', lg: '30' }}
          fontWeight="semibold"
          color="meli.black"
          marginRight="auto"
          onClick={onToggle}
          cursor="pointer"
          width="full"
        >
          {title}
        </Text>
        <PlusIcon
          color="white"
          width={{ base: '42px', lg: '50px' }}
          height={{ base: '42px', lg: '50px' }}
          display={!isOpen ? 'block' : 'none'}
          onClick={onToggle}
          cursor="pointer"
        />
        <MinusIcon
          color="white"
          width={{ base: '42px', lg: '50px' }}
          height={{ base: '42px', lg: '50px' }}
          display={isOpen ? 'block' : 'none'}
          onClick={onToggle}
          cursor="pointer"
        />
      </Box>
      <Collapse in={isOpen} animateOpacity style={{ width: '100%' }}>
        <Text
          fontSize={{ base: '18' }}
          lineHeight={{ base: '18' }}
          fontWeight="regular"
          color="meli.black"
          marginTop="20px"
        >
          <RichText txt={txt} />
        </Text>
      </Collapse>
    </Box>
  );
};

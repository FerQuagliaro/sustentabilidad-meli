import { Text, Box, Flex } from '@chakra-ui/react';

interface BlogBulletListItemProps {
  title: string;
  excerpt: string;
}

interface Props {
  item: BlogBulletListItemProps;
}

export const BlogBulletListItem: React.FC<Props> = ({ item }) => {
  const { title, excerpt } = item;

  return (
    <Flex
      as="li"
      borderTop="1px solid"
      alignItems="flex-start"
      borderTopColor="meli.black"
      paddingTop={{ base: '40px' }}
      paddingBottom={{ base: '40px' }}
      _first={{ borderTop: 'none', paddingTop: '0px' }}
      _last={{ paddingBottom: '0px' }}
    >
      <Box
        backgroundColor="meli.yellow"
        borderRadius="full"
        width="10px"
        height="10px"
        marginTop="10px"
        marginRight={{ base: '14px', lg: '20px' }}
      />
      <Box width="90%">
        <Text
          color="meli.black"
          fontSize={{ base: '20' }}
          lineHeight={{ base: '20' }}
          fontWeight="bold"
          marginBottom={{ base: '6px' }}
        >
          {title}
        </Text>
        <Text
          color="meli.black"
          fontSize={{ base: '18' }}
          lineHeight={{ base: '18' }}
          fontWeight="regular"
        >
          {excerpt}
        </Text>
      </Box>
    </Flex>
  );
};

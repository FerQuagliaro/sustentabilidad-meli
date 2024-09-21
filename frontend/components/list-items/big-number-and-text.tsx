import { Box, Heading, Text } from '@chakra-ui/react';
interface BigNumberAndTextProps {
  data: {
    bigNumber: string;
    txt: string;
  };
}

export const BigNumberAndText: React.FC<BigNumberAndTextProps> = ({ data }) => {
  const { bigNumber, txt } = data;

  return (
    <Box
      borderTop="1px solid"
      borderTopColor="meli.lightGrey"
      paddingTop={{ base: '40' }}
      paddingBottom={{ base: '40', lg: '0px' }}
      sx={{
        '&:last-child': {
          paddingBottom: '0px',
        },
      }}
    >
      <Heading variant="twoCol_listItem" size="twoCol_listItem">
        {bigNumber}
      </Heading>
      <Text variant="twoCol_listItem" size="twoCol_listItem">
        {txt}
      </Text>
    </Box>
  );
};

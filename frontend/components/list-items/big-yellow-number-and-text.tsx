import { Text, Box } from '@chakra-ui/react';

interface BigYellowNumberAndTextProps {
  yellowNumber: string;
  excerpt: string;
}

interface Props {
  data: BigYellowNumberAndTextProps;
}

export const BigYellowNumberAndText: React.FC<Props> = ({ data }) => {
  const { yellowNumber, excerpt } = data;

  return (
    <Box
      width="100%"
      py={{ base: '40' }}
      borderTop="1px dashed"
      borderTopColor="meli.lightGrey"
      _last={{
        borderBottom: '1px dashed',
        borderBottomColor: 'meli.lightGrey',
      }}
    >
      <Box position="relative" marginBottom={{ lg: '20' }} pl={{ lg: '10px' }}>
        <Text
          fontSize={{ base: '60', lg: '70' }}
          color="meli.yellow"
          fontWeight="black"
          lineHeight={{ lg: '1' }}
        >
          {yellowNumber}
        </Text>
        <Text
          fontSize={{ base: '60', lg: '70' }}
          display="block"
          height="100%"
          width="100%"
          fontWeight="black"
          lineHeight={{ lg: '1' }}
          position="absolute"
          left={{ base: '-2px', lg: '6px' }}
          bottom="3px"
          sx={{
            '&': {
              color: 'transparent',
              WebkitTextStrokeWidth: '1px',
              WebkitTextStrokeColor: '#333',
            },
          }}
        >
          {yellowNumber}
        </Text>
      </Box>
      <Text
        fontWeight="regular"
        fontSize={{ base: '20', lg: '30' }}
        lineHeight={{ base: '20', lg: '30' }}
      >
        {excerpt}
      </Text>
    </Box>
  );
};

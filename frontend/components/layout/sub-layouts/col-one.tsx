import { Box } from '@chakra-ui/react';

export const ColOne: React.FC = ({ children }) => {
  return (
    <Box
      gridColumnStart={1}
      gridColumnEnd={{ base: '-1', lg: '2' }}
      alignSelf="start"
      position={{ lg: 'sticky' }}
      top={{ lg: '80px' }}
    >
      {children}
    </Box>
  );
};

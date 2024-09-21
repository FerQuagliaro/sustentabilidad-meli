import { Box } from '@chakra-ui/react';

export const TwoColSection: React.FC<any> = ({ children, ...props }) => {
  return (
    <Box
      display="grid"
      alignItems="baseline"
      gridTemplateColumns={{ base: '100%', lg: '300px 1fr' }}
      gridColumnGap={{ lg: '80px' }}
      gridAutoFlow="row"
      {...props}
    >
      {children}
    </Box>
  );
};

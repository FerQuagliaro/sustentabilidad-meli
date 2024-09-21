import { Box, BoxProps } from '@chakra-ui/react';

interface ColTwoProps extends BoxProps {
  twoCol?: boolean;
}

export const ColTwo: React.FC<ColTwoProps> = (props) => {
  const { children, twoCol, ...boxProps } = props;
  return (
    <Box
      gridColumnStart={{ base: '1', lg: '2' }}
      gridColumnEnd={-1}
      alignSelf="start"
      display={twoCol ? 'grid' : 'block'}
      gridTemplateColumns={{ base: '1fr', xl: 'repeat(2, minmax(0, 1fr))' }}
      gridColumnGap={{ xl: '40' }}
      gridRowGap={{ base: '80', xl: '160' }}
      gridAutoFlow="row"
      {...boxProps}
    >
      {children}
    </Box>
  );
};

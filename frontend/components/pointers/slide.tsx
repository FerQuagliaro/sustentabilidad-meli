import React from 'react';
import { Box } from '@chakra-ui/react';

export const SlidePointer = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <Box
      ref={ref}
      position="fixed"
      left="-65px"
      top="-65px"
      width="130px"
      height="130px"
      border="1px solid"
      borderColor="meli.darkBlue"
      borderRadius="full"
      color="meli.darkBlue"
      transform="scale(0)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={400}
      cursor="none"
      pointerEvents="none"
    >
      Deslizá
    </Box>
  );
});

SlidePointer.displayName = 'SlidePointer';

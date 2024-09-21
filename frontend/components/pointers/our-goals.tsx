import React from 'react';
import { Box, Image } from '@chakra-ui/react';

interface Props {
  img: {
    src: string;
    alt: string;
  };
}

export const OurGoalsPointer = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    return (
      <Box
        ref={ref}
        position="fixed"
        transform="scale(0)"
        zIndex={400}
        cursor="none"
        pointerEvents="none"
        width={{ base: '220px', lg: '260px' }}
        height={{ base: '220px', lg: '260px' }}
        left={{ lg: '-130px' }}
        top={{ lg: '-130px' }}
        borderRadius="full"
        overflow="hidden"
        mixBlendMode="exclusion"
        _before={{
          bg: 'currentColor',
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          h: 'full',
          w: 'full',
        }}
      >
        <Image
          src={props.img.src}
          alt={props.img.alt}
          width="100%"
          height="100%"
          objectFit="cover"
          filter="invert(1)"
        />
      </Box>
    );
  }
);

OurGoalsPointer.displayName = 'OurGoalsPointer';

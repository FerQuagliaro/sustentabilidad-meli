import { Icon, IconProps, Box } from '@chakra-ui/react';

export const CircleArrowRightWhite = (props: IconProps) => {
  return (
    <Box
      className="arrow-btn"
      position="relative"
      borderRadius="full"
      overflow="hidden"
      alignSelf={{ base: 'flex-start', lg: 'inherit' }}
    >
      <Icon viewBox="0 0 42 42" width="42" height="42" fill="none" {...props}>
        <path
          d="M1 21c0 11.046 8.954 20 20 20s20-8.954 20-20S32.046 1 21 1 1 9.954 1 21Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth=".8"
        />
        <path
          d="m22.434 27.847 6.909-6.91-6.91-6.909"
          stroke="currentColor"
          strokeWidth=".8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.343 20.938h15.273"
          stroke="currentColor"
          strokeWidth=".8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Icon>
      <Box
        className="white-circle"
        as="span"
        position="absolute"
        zIndex={-1}
        inset={0}
        backgroundColor="white"
        borderRadius="full"
        transform="scale(0)"
        opacity="0"
        transition="all .25s"
        sx={{
          '.arrow-btn:hover &': {
            transform: 'scale(.96)',
            opacity: '1',
          },
        }}
      />
    </Box>
  );
};

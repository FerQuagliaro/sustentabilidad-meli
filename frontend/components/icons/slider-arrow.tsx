import { Icon, IconProps, Box } from '@chakra-ui/react';

export const SliderArrow: React.FC<IconProps> = (props) => {
  return (
    <Box
      className="slider-btn"
      cursor="pointer"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Icon
        viewBox="0 0 45 45"
        width="45px"
        height="45px"
        fill="none"
        {...props}
      >
        <path
          d="M22.5 43c11.297 0 20.455-8.954 20.455-20S33.797 3 22.5 3C11.203 3 2.045 11.954 2.045 23S11.203 43 22.5 43Z"
          stroke="#333"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth=".8"
        />
        <path
          d="m20.454 29 6.137-6-6.137-6"
          stroke="#333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Icon>
      <Box
        as="span"
        position="absolute"
        inset="0"
        zIndex={-1}
        backgroundColor="meli.yellow"
        borderRadius="full"
        transform="scale(0)"
        opacity="0"
        transition="all .25s"
        sx={{
          '.slider-btn:hover &': {
            transform: 'scale(.94)',
            opacity: '1',
          },
        }}
      />
    </Box>
  );
};

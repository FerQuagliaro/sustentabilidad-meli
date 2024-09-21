import { Icon, IconProps, Box } from '@chakra-ui/react';

export const MinusIcon = (props: IconProps) => {
  return (
    <Box
      className="minus-btn"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Icon viewBox="0 0 71 71" fill="none" {...props}>
        <path
          stroke="#333"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth=".7"
          d="M35.891 64.166C52 64.166 65.058 51.108 65.058 35 65.058 18.89 52 5.833 35.89 5.833 19.783 5.833 6.725 18.891 6.725 35c0 16.108 13.058 29.166 29.166 29.166ZM24.225 35h23.333"
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
          '.minus-btn:hover &': {
            transform: 'scale(.84)',
            opacity: '1',
          },
        }}
      />
    </Box>
  );
};

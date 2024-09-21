import { Icon, IconProps, Box } from '@chakra-ui/react';

export const FacebookOutline = (props: IconProps) => {
  return (
    <Box
      as="span"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        '& path': {
          transition: 'all .5s',
        },
        '&:hover span': {
          transform: 'scale(1)',
        },
        '&:hover path': {
          stroke: 'meli.yellow',
        },
      }}
    >
      <Icon
        viewBox="0 0 12 19"
        fill="none"
        {...props}
        position="relative"
        zIndex={10}
      >
        <path
          stroke="#333"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.56 1.216H8.028A4.223 4.223 0 0 0 3.804 5.44v2.534H1.27v3.378h2.534v6.757h3.378v-6.757h2.534l.845-3.378H7.182V5.439a.845.845 0 0 1 .845-.844h2.534V1.216Z"
        />
      </Icon>
      <Box
        as="span"
        position="absolute"
        backgroundColor="meli.black"
        w="32px"
        h="32px"
        borderRadius="full"
        transform="scale(0)"
        transition="transform .25s"
      />
    </Box>
  );
};

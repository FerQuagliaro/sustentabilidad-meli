import { Icon, IconProps, Box } from '@chakra-ui/react';

export const TwitterOutline = (props: IconProps) => {
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
        viewBox="0 0 20 17"
        fill="none"
        {...props}
        position="relative"
        zIndex={10}
      >
        <path
          stroke="#333"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.122.576a9.206 9.206 0 0 1-2.652 1.292A3.784 3.784 0 0 0 9.83 4.402v.845A9.003 9.003 0 0 1 2.23 1.42S-1.15 9.022 6.453 12.4A9.832 9.832 0 0 1 .54 14.09c7.6 4.223 16.891 0 16.891-9.713a3.8 3.8 0 0 0-.067-.701 6.52 6.52 0 0 0 1.757-3.1v0Z"
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

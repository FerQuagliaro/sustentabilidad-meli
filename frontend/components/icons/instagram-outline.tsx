import { Icon, IconProps, Box } from '@chakra-ui/react';

export const InstagramOutline = (props: IconProps) => {
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
        viewBox="0 0 19 19"
        fill="none"
        {...props}
        position="relative"
        zIndex={10}
      >
        <path
          stroke="#333"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.885 1.216H5.44A4.223 4.223 0 0 0 1.216 5.44v8.446a4.223 4.223 0 0 0 4.223 4.223h8.446a4.223 4.223 0 0 0 4.223-4.223V5.44a4.223 4.223 0 0 0-4.223-4.223Z"
        />
        <path
          stroke="#333"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.04 9.13a3.38 3.38 0 1 1-6.685.991 3.38 3.38 0 0 1 6.685-.99ZM14.307 5.017h.009"
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

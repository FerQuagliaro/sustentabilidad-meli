import { Icon, IconProps, Box } from '@chakra-ui/react';

export const LinkedinOutline = (props: IconProps) => {
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
        viewBox="0 0 19 18"
        fill="none"
        {...props}
        position="relative"
        zIndex={10}
      >
        <path
          stroke="#333"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.04 6.257a5.067 5.067 0 0 1 5.068 5.067v5.912H14.73v-5.912a1.689 1.689 0 1 0-3.379 0v5.912H7.973v-5.912a5.068 5.068 0 0 1 5.067-5.067v0ZM4.595 7.101H1.216v10.136h3.379V7.1ZM2.905 4.568a1.69 1.69 0 1 0 0-3.379 1.69 1.69 0 0 0 0 3.379Z"
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

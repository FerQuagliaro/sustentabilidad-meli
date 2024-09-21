import { Icon, IconProps, Box } from '@chakra-ui/react';

export const PlusIcon = (props: IconProps) => {
  return (
    <Box
      className="plus-btn"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Icon viewBox="0 0 50 50" fill="none" {...props}>
        <path
          stroke="#333"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth=".6"
          d="M25 45.833c11.506 0 20.833-9.327 20.833-20.833 0-11.506-9.327-20.833-20.833-20.833C13.494 4.167 4.167 13.494 4.167 25c0 11.506 9.327 20.833 20.833 20.833ZM25 16.667v16.666M16.667 25h16.666"
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
          '.plus-btn:hover &': {
            transform: 'scale(.84)',
            opacity: '1',
          },
        }}
      />
    </Box>
  );
};

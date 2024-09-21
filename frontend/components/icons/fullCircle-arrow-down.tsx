import { Icon, IconProps, Box } from '@chakra-ui/react';

export const FullCircleArrowDown = (props: IconProps) => {
  return (
    <Box
      sx={{
        '& circle': {
          fill: '#FFF',
          transition: 'all .35s',
        },
        '& circle:hover': {
          fill: '#FFE600',
        },
      }}
    >
      <Icon viewBox="0 0 30 30" width="30" height="30" fill="none" {...props}>
        <circle cx="15" cy="15" transform="rotate(90 15 15)" r="15" />
        <path
          d="m15.57 21.777 4.195-3.983a.733.733 0 0 0-.003-1.078.84.84 0 0 0-1.14.003l-2.816 2.673V8.762c0-.42-.36-.762-.806-.762-.445 0-.806.341-.806.762v10.63l-2.816-2.673a.84.84 0 0 0-1.14-.003.733.733 0 0 0-.003 1.078l4.193 3.982a.84.84 0 0 0 1.143 0Z"
          fill="currentColor"
        />
      </Icon>
    </Box>
  );
};

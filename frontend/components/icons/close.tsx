import { Icon, IconProps } from '@chakra-ui/react';

export const Close = (props: IconProps) => {
  return (
    <Icon viewBox="0 0 50 50" width="50" height="50" fill="none" {...props}>
      <svg
        width="50"
        height="50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25 45.833c11.506 0 20.833-9.327 20.833-20.833 0-11.506-9.327-20.834-20.833-20.834C13.494 4.166 4.167 13.494 4.167 25S13.494 45.833 25 45.833ZM30.892 19.108 19.107 30.893M19.107 19.107l11.785 11.785"
          stroke="#333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Icon>
  );
};

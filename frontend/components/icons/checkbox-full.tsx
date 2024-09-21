import { Icon, IconProps } from '@chakra-ui/react';

export const CheckboxFull = (props: IconProps) => {
  return (
    <Icon viewBox="0 0 30 30" width="30" height="30" fill="none" {...props}>
      <svg
        width="30"
        height="30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x=".5"
          y=".5"
          width="29"
          height="29"
          rx="14.5"
          fill="#FFE900"
          stroke="#333"
          strokeWidth=".7"
        />
        <path d="m10 16 3.077 4L20 11" stroke="#333" strokeLinecap="round" />
      </svg>
    </Icon>
  );
};

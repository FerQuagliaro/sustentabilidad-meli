import { Icon, IconProps } from '@chakra-ui/react';

export const CloseSearch = (props: IconProps) => {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 81 81"
      {...props}
    >
      <circle cx="40.5" cy="40.5" r="40.5" fill="#FFE600" />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m49.25 31.75-17.5 17.5M31.75 31.75l17.5 17.5"
      />
    </Icon>
  );
};

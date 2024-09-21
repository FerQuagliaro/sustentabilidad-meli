import { Icon, IconProps } from '@chakra-ui/react';

export const SearchIcon = (props: IconProps) => {
  return (
    <Icon viewBox="0 0 50 50" width="50" height="50" fill="none" {...props}>
      <circle cx="25" cy="25" r="25" fill="#FFE600" />
      <path
        d="M24.1 31.302a7.202 7.202 0 1 0 0-14.404 7.202 7.202 0 0 0 0 14.404ZM33.101 33.102l-3.915-3.916"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

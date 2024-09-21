import { Icon, IconProps } from '@chakra-ui/react';

export const DownloadReport = (props: IconProps) => {
  return (
    <Icon viewBox="0 0 43 42" width="50" height="50" fill="none" {...props}>
      <rect width="43" height="42" rx="21" fill="#FFE600" />
      <path
        d="M27.75 23.25v3a1.5 1.5 0 0 1-1.5 1.5h-10.5a1.5 1.5 0 0 1-1.5-1.5v-3M17.25 19.5 21 23.25l3.75-3.75M21 23.25v-9"
        stroke="#333"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

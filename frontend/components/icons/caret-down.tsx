import { Icon, IconProps } from '@chakra-ui/react';

export const CaretDown = (props: IconProps) => {
  return (
    <Icon viewBox="0 0 14 8" width="14" height="8" fill="none" {...props}>
      <svg width="14" height="8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m1 1 6 6 6-6"
          stroke="#333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Icon>
  );
};

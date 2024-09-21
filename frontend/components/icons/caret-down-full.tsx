import { Icon, IconProps } from '@chakra-ui/react';

export const CaretDownFull = (props: IconProps) => {
  return (
    <Icon viewBox="0 0 10 8" width="10" height="8" fill="none" {...props}>
      <svg width="10" height="8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.866 7.5a1 1 0 0 1-1.732 0L.67 1.5A1 1 0 0 1 1.536 0h6.928a1 1 0 0 1 .866 1.5l-3.464 6Z"
          fill="#333"
        />
      </svg>
    </Icon>
  );
};

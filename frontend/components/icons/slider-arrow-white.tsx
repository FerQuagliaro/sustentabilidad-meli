import { Icon, IconProps } from '@chakra-ui/react';

export const SliderArrowWhite:React.FC<IconProps> = (props) => {

  return (
    <Icon
      cursor="pointer"
      viewBox="0 0 45 45"
      width="45"
      height="45"
      fill='currentColor'
      {...props}
    >
      <path
        d="M22.5 43c11.297 0 20.455-8.954 20.455-20S33.797 3 22.5 3C11.203 3 2.045 11.954 2.045 23S11.203 43 22.5 43Z"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m20.454 29 6.137-6-6.137-6"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

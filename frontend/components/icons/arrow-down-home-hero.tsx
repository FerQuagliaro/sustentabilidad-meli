import { Icon, IconProps } from '@chakra-ui/react';

export const ArrowDownHomeHero = (props: IconProps) => {
  return (
    <Icon
      viewBox="0 0 60 40"
      width="60"
      height="40"
      fill="transparent"
      {...props}
    >
      <g
        clipPath="url(#a)"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m20 30 10 10 10-10M30 0v40" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" transform="rotate(90 30 30)" d="M0 0h40v60H0z" />
        </clipPath>
      </defs>
    </Icon>
  );
};

import { Icon, IconProps } from '@chakra-ui/react';

export const ProductBoxIcon = (props: IconProps) => {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 42 42"
      {...props}
    >
      <g>
        <path fill="#FFE900" d="m22.5303 17.77 17-6.8v20.76l-17 6.8V17.77Z" />
        <path
          fill="#fff"
          d="M38.0303 13.19v17.53l-14 5.6V18.79l14-5.6Zm3-4.44-20 8v24l20-8v-24Z"
        />
        <path fill="#FFE900" d="M2.25 31.8399v-20.77l17 6.8v20.76l-17-6.79Z" />
        <path
          fill="#fff"
          d="m3.75 13.29 14 5.6v17.53l-14-5.6V13.29Zm-3-4.44002V32.85l20 8v-24l-20-8.00002Z"
        />
        <path
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="m20.75.75-20 8 20 8 20-8-20-8Z"
        />
        <path
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M.75 30.75v2l20 8v-24l-20-8v18M40.75 8.75v24l-20 8v-24l20-8ZM31.75 12.35l-20-8.00002M36.08 28.75l-3.33 1.34"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h41.5v41.5H0z" />
        </clipPath>
      </defs>
    </Icon>
  );
};

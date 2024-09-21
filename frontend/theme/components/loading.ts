import { keyframes } from '@chakra-ui/system';
import { LoadingProps } from '../../components/loading';

const spin = () =>
  keyframes({
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  });

const spinLeft = () =>
  keyframes({
    '0%': {
      transform: 'rotate(175deg)',
    },
    '100%': {
      transform: 'rotate(30deg)',
    },
  });

const spinRight = () =>
  keyframes({
    '0%': {
      transform: 'rotate(-175deg)',
    },
    '100%': {
      transform: 'rotate(-30deg)',
    },
  });

const loadingComponent = {
  Loading: {
    parts: ['container', 'icon', 'iconLeft', 'iconRight', 'iconBorder'],
    baseStyle: (props: LoadingProps) => {
      const { overlay } = props;

      return {
        container: {
          bgColor: overlay ? 'var(--chakra-colors-whiteAlpha-800)' : null,
          alignItems: 'center',
          d: 'flex',
          justifyContent: 'center',
          w: 'full',
        },
        icon: {
          animation: `1s linear infinite ${spin()}`,
        },
        iconLeft: {
          height: '100%',
          left: 0,
          overflow: 'hidden',
          position: 'absolute',
          top: 0,
          width: '50%',
          span: {
            display: 'block',
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '200px 0 0 200px',
            borderColor: 'meli.lightBlue',
            borderStyle: 'solid',
            borderWidth: `var(--loading-width) 0 var(--loading-width) var(--loading-width)`,
            transform: 'rotate(10deg)',
            transformOrigin: 'right center',
            animation: `0.75s linear infinite alternate ${spinLeft()}`,
            _after: {
              display: 'block',
              content: `""`,
              width: `var(--loading-width)`,
              height: `var(--loading-width)`,
              borderRadius: '50%',
              bg: 'meli.lightBlue',
              bottom: `calc(var(--loading-width) * -1)`,
              position: 'absolute',
              right: `calc(var(--loading-width) / -2)`,
              zIndex: '9999',
            },
          },
        },
        iconRight: {
          height: '100%',
          overflow: 'hidden',
          position: 'absolute',
          right: 0,
          top: 0,
          width: '50%',
          span: {
            display: 'block',
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '0 200px 200px 0',
            borderColor: 'meli.lightBlue',
            borderStyle: 'solid',
            borderWidth: `var(--loading-width) var(--loading-width) var(--loading-width) 0`,
            transform: 'rotate(-10deg)',
            transformOrigin: 'left center',
            animation: `0.75s linear infinite alternate ${spinRight()}`,
            _after: {
              display: 'block',
              content: `""`,
              width: `var(--loading-width)`,
              height: `var(--loading-width)`,
              borderRadius: '50%',
              bg: 'meli.lightBlue',
              bottom: `calc(var(--loading-width) * -1)`,
              position: 'absolute',
              left: `calc(var(--loading-width) / -2)`,
              zIndex: '9999',
            },
          },
        },
      };
    },
    sizes: {
      xs: {
        icon: {
          h: '4',
          w: '4',
          '--loading-width': '2px',
        },
      },
      sm: {
        icon: {
          h: '6',
          w: '6',
          '--loading-width': '3px',
        },
      },
      md: {
        icon: {
          h: '8',
          w: '8',
          '--loading-width': '3px',
        },
      },
      lg: {
        icon: {
          h: '12',
          w: '12',
          '--loading-width': '5px',
        },
      },
      xl: {
        icon: {
          h: '16',
          w: '16',
          '--loading-width': '5px',
        },
      },
    },
    variants: {
      fullscreen: {
        container: {
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          zIndex: 2000,
        },
      },
      absolute: {
        container: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          zIndex: 2000,
        },
      },
      inline: {
        container: {
          display: 'inline-flex',
          w: 'auto',
        },
      },
    },
    defaultProps: {
      size: 'md',
    },
  },
};

export default loadingComponent;

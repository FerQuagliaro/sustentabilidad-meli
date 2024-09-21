import {
  Box,
  Portal,
  ThemingProps,
  VisuallyHidden,
  useMultiStyleConfig,
} from '@chakra-ui/react';

export interface LoadingProps extends ThemingProps {
  label?: string;
  overlay?: boolean;
  show?: boolean;
}

export const Loading: (props: LoadingProps) => JSX.Element = ({
  label = 'Loading...',
  show = true,
  overlay = false,
  variant,
  size,
  ...props
}) => {
  const styles = useMultiStyleConfig('Loading', {
    variant,
    size,
    overlay,
  });

  const conditionalPortal: (children: React.ReactNode) => JSX.Element = (
    children
  ) => {
    return variant === 'fullscreen' ? (
      <Portal>{children}</Portal>
    ) : (
      <>{children}</>
    );
  };

  return conditionalPortal(
    <Box
      __css={styles.container}
      {...props}
      display={!show ? 'none' : undefined}
    >
      <Box __css={styles.icon} as="span">
        <VisuallyHidden>{label}</VisuallyHidden>

        <Box __css={styles.iconRight} as="span">
          <Box as="span" />
        </Box>

        <Box __css={styles.iconLeft} as="span">
          <Box as="span" />
        </Box>
      </Box>
    </Box>
  );
};

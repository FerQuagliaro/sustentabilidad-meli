import { keyframes } from '@chakra-ui/system';
import { Box, Text } from '@chakra-ui/react';
import { ThankYouIcon } from '../../../icons/thank-you-icon';

const scaleIn = () =>
  keyframes({
    '0%': {
      opacity: '0',
      transform: 'scale(0.4)',
    },
    '100%': {
      opacity: '1',
      transform: 'scale(1)',
    },
  });

const fadeIn = () =>
  keyframes({
    '0%': {
      opacity: '0',
    },
    '100%': {
      opacity: '1',
    },
  });

interface ThankYouProps {
  title: string;
  excerpt: string;
}

export const ThankYou: React.FC<ThankYouProps> = ({ title, excerpt }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <ThankYouIcon
        marginBottom={{ base: '20', lg: '40' }}
        sx={{
          opacity: 0,
          animation: `300ms linear 100ms forwards ${scaleIn()}`,
        }}
      />
      <Box
        sx={{
          opacity: 0,
          animation: `300ms linear 400ms forwards ${fadeIn()}`,
        }}
      >
        <Text
          fontSize={{ base: '30' }}
          fontWeight="semibold"
          textAlign="center"
          marginBottom={{ base: '10px' }}
        >
          {title}
        </Text>
        <Text fontSize={{ lg: '20' }} fontWeight="regular" textAlign="center">
          {excerpt}
        </Text>
      </Box>
    </Box>
  );
};

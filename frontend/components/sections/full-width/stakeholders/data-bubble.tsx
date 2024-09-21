import { Flex, Text, Box } from '@chakra-ui/react';

export interface DataBubbleProps {
  bigNumber: string;
  title?: string;
  desc: string;
  colStart?: number;
}

export const DataBubble: React.FC<DataBubbleProps> = (props) => {
  const { bigNumber, desc, colStart, title } = props;

  return (
    <Flex
      className={`data-bubble-${title}`}
      position="relative"
      as="li"
      gridColumnStart={colStart}
      gridColumnEnd={'span 1'}
      gridRowStart={1}
      alignSelf="start"
      justifySelf={{ base: 'center', lg: 'end' }}
      minW={{ base: '120px', md: '212px' }}
      minH={{ base: '80px', md: '140px' }}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={{ base: '1em 1.5em', md: '1.5em 2em' }}
      color="white"
      textAlign="center"
      borderRadius="meli.md"
      overflow="hidden"
      pointerEvents="none"
    >
      <Box
        position="absolute"
        zIndex={10}
        inset="0"
        backgroundColor="#7b7b7b"
        opacity={0.7}
      />
      <Text
        zIndex={20}
        position="relative"
        fontWeight="bold"
        fontSize={{ base: '28', md: '40' }}
        lineHeight="50"
        color="white"
      >
        {bigNumber}
      </Text>
      <Text
        position="relative"
        zIndex={20}
        maxW="16ch"
        color="white"
        fontSize={{ base: '12px', md: '18' }}
        lineHeight={{ base: '14px', md: '20px' }}
      >
        {desc}
      </Text>
    </Flex>
  );
};

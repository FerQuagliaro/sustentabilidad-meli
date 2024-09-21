import { Flex, Text } from '@chakra-ui/react';

interface GiganticTextProps {
  lines: { id: number; text: string; distance: string }[];
}

export const JumboText: React.FC<GiganticTextProps> = ({ lines }) => {
  return (
    <Flex
      flexDirection="column"
      width="100vw"
      alignItems="flex-start"
      justifyContent="flex-start"
      marginTop={{ lg: '-240px' }}
      marginBottom={{ base: '-80px !important' }}
    >
      {lines.map(({ id, text, distance }, idx) => {
        return (
          <Text
            key={id}
            id={`jumbo-line-${idx + 1}`}
            fontSize={{ base: '100', md: '250', lg: '400' }}
            fontWeight="extrabold"
            whiteSpace="nowrap"
            lineHeight={{ base: '1', lg: '0.85' }}
            position="relative"
          >
            {text}
          </Text>
        );
      })}
    </Flex>
  );
};

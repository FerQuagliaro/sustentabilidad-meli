import { Flex, Image, Heading, Box, Text } from '@chakra-ui/react';
import { RichText } from '../text/rich-text';

export interface GoalProps {
  title: string;
  img: {
    src: string;
    alt: string;
  };
}

interface Props {
  goal: GoalProps;
}

export const Goal: React.FC<Props> = ({ goal }) => {
  const { title, img } = goal;

  return (
    <Flex
      position="relative"
      flex="0 0 100%"
      display="flex"
      justifyContent="center"
      cursor="none"
      pointerEvents="none"
    >
      <Flex
        flexDirection={{ base: 'column' }}
        alignItems="center"
        justifyContent="center"
        mx="18px"
        position="relative"
        py={{ lg: '40' }}
        sx={{
          '&:hover > img': {
            opacity: '100',
          },
          '&:hover > div': {
            opacity: '100',
          },
        }}
      >
        <Box
          width={{ base: '220px', lg: '260px' }}
          height={{ base: '220px', lg: '260px' }}
          marginBottom={{ base: '40', lg: '3.5em' }}
          display={{ lg: 'none' }}
          top={{ lg: '3' }}
          zIndex={0}
          opacity={{ lg: '0' }}
          borderRadius="full"
          overflow="hidden"
        >
          <Image
            src={img.src}
            alt={img.alt}
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </Box>
        <Heading
          as="h3"
          textAlign="center"
          position={{ lg: 'relative' }}
          fontSize={{ base: '30', md: '50', lg: '80' }}
          lineHeight={{ base: '50' }}
          color="meli.black"
          width="max-content"
          verticalAlign="center"
          maxW={{ base: '20ch', lg: '20ch' }}
          mixBlendMode="exclusion"
        >
          <RichText txt={title} />
        </Heading>
        {/* <Box
          display={{ base: 'none', lg: 'flex' }}
          position={{ lg: 'absolute' }}
          top={{ lg: '3' }}
          zIndex={100}
          overflow="hidden"
          borderRadius="full"
          w={{ lg: '260px' }}
          h={{ lg: '260px' }}
          alignItems="center"
          justifyContent="center"
          opacity={1}
        >
          <Text
            fontWeight="bold"
            textAlign="center"
            position={{ lg: 'absolute' }}
            top={7}
            zIndex={10}
            fontSize={{ base: '30', md: '50', lg: '80' }}
            lineHeight={{ base: '50' }}
            color="white"
            width="max-content"
            verticalAlign="center"
            maxW={{ base: '20ch', lg: '20ch' }}
          >
            <RichText fontColor="white" txt={title} />
          </Text>
        </Box> */}
      </Flex>
    </Flex>
  );
};

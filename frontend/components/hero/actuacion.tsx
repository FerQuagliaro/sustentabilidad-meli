import { Flex, Container, Text, Heading, Image } from '@chakra-ui/react';
import { ScrollDownIcon } from '../icons/scroll-down';

interface StakeholderHeroProps {
  title: string;
  overTitle: string;
  theme: string;
  img: {
    path: string;
    alt: string;
  };
}

export const Hero: React.FC<StakeholderHeroProps> = (props) => {
  const { overTitle, title, img, theme } = props;

  return (
    <Flex
      width="100vw"
      flexDirection="column"
      alignItems="center"
      marginTop={{ lg: '-120px' }}
      marginBottom={{ base: '80px', lg: '160px' }}
    >
      <Container
        position="relative"
        overflow="hidden"
        minH={{ base: '540px', lg: '640px' }}
        maxW={{
          base: 'container.mobile.lg',
          md: 'container.tablet.lg',
          lg: 'container.desktop.lg',
        }}
        borderRadius="meli.lg"
        backgroundColor={`stakeholders.${theme}.base`}
        px={0}
      >
        <Container
          maxW={{
            base: 'container.mobile.md',
            md: 'container.tablet.md',
            lg: 'container.desktop.md',
          }}
          paddingTop={{ base: '6rem', lg: '10rem' }}
        >
          <Text
            textTransform="uppercase"
            fontWeight="bold"
            fontSize={{ base: '16', lg: '20' }}
            color="white"
            marginBottom=".75em"
          >
            {overTitle}
          </Text>
          <Heading
            as="h1"
            color={`stakeholders.${theme}.hero`}
            fontWeight="bold"
            fontSize={{ base: '40', md: '60', lg: '100' }}
            lineHeight="60"
            maxW="min-content"
            mb={{ base: 0, lg: 10 }}
          >
            {title}
          </Heading>
          <ScrollDownIcon d={{ base: 'none', lg: 'block' }} />
          <Image
            src={img.path}
            alt={img.alt}
            position="absolute"
            maxW={{
              base: '100%',
              sm: '70%',
              md: '60%',
              lg: theme === 'lightGreen' ? '65%' : '40%',
            }}
            bottom={{
              base: theme === 'lightGreen' ? '0' : '-15%',
              md: '-5%',
              lg: '0%',
            }}
            right={{
              base: theme === 'lightGreen' ? '0' : '-15%',
              md: theme === 'lightGreen' ? '0%' : '-5%',
              lg: theme === 'lightGreen' ? '-10%' : '-2%',
            }}
          />
        </Container>
      </Container>
    </Flex>
  );
};

import { Container, Text, Heading } from '@chakra-ui/react';
import { RichText } from '../text/rich-text';

interface HeroProps {
  overTitle?: string;
  title: string;
  titleColor?: string | 'meli.black';
  paragraph?: string;
}

export const Hero: React.FC<HeroProps> = (props) => {
  const { overTitle, title, paragraph, titleColor } = props;

  return (
    <Container
      maxW={{
        base: 'container.mobile.lg',
        md: 'container.tablet.lg',
        lg: 'container.desktop.md',
      }}
      marginBottom={{ base: '80px' }}
    >
      {overTitle && (
        <Text
          textTransform="uppercase"
          color="meli.black"
          fontSize={{ base: '20', lg: '30' }}
          lineHeight={{ base: '20' }}
          fontWeight="bold"
          marginBottom={{ base: '14px' }}
        >
          <RichText txt={overTitle} />
        </Text>
      )}
      <Heading
        as="h1"
        color={titleColor}
        fontSize={{ base: '40', md: '60', lg: '100' }}
        lineHeight={{ base: '40', lg: '80' }}
        fontWeight="bold"
        marginBottom={{ base: '20px', lg: '40px' }}
      >
        {title}
      </Heading>
      {paragraph && (
        <Text
          color="meli.black"
          fontSize={{ base: '20', lg: '40' }}
          lineHeight={{ base: '20' }}
          fontWeight="light"
          maxW={{ md: '31ch' }}
        >
          <RichText txt={paragraph} emFontWeight={500} />
        </Text>
      )}
    </Container>
  );
};

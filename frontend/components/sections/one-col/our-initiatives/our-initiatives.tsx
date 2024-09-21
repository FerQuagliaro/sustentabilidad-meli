import { Container, Box, Heading, Accordion } from '@chakra-ui/react';
import { Initiative, InitiativeProps } from './initiative';
import { RichText } from '../../../text/rich-text';

interface OurInitiativesProps {
  title: string;
  theme?: string;
  initiatives: InitiativeProps[];
}

export const OurInitiatives: React.FC<OurInitiativesProps> = (props) => {
  const { title, initiatives, theme } = props;

  return (
    <Box
      as="section"
      width="100vw"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      //py={{ base: '120px', lg: '160px' }}
    >
      <Container
        maxW={{
          base: 'container.mobile.lg',
          md: 'container.tablet.lg',
          lg: 'container.desktop.md',
        }}
      >
        <Heading
          as="h2"
          color="meli.black"
          fontWeight="extrabold"
          fontSize={{ base: '40', lg: '70' }}
          lineHeight={{ base: '70' }}
          textAlign={'center'}
          marginBottom={{ base: '40px', lg: '80px' }}
        >
          <RichText txt={title} />
        </Heading>
        <Accordion defaultIndex={[0]} allowToggle>
          {initiatives?.map((initiative, i) => {
            return (
              <Initiative
                key={i}
                theme={theme}
                title={initiative.title}
                excerpt={initiative.excerpt}
                img={initiative.img}
                link={initiative.link}
              />
            );
          })}
        </Accordion>
      </Container>
    </Box>
  );
};

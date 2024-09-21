import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { RichText } from '../../text/rich-text';
import { VerticalList } from '../../lists/vertical-list';
import {
  MoreInitiative,
  MoreInitiativeProps,
} from '../../list-items/more-initiative';
interface MoreInitiativesProps {
  initiatives: MoreInitiativeProps[];
  overTitle: string;
  title: string;
}

export const MoreInitiatives: React.FC<MoreInitiativesProps> = (props) => {
  const { initiatives, overTitle, title } = props;

  return (
    <Box bgGradient="linear(#F4F4F4, #FFFFFF)">
      <Container
        maxW={{ base: 'container.mobile.lg', lg: 'container.desktop.md' }}
        paddingTop={{ base: '80', md: '160', lg: '240' }}
        display="flex"
        flexDirection="column"
        alignItems={{ base: 'left', lg: 'center' }}
      >
        <Text
          variant="overTitle"
          size="overTitle"
          textAlign={{ base: 'left', lg: 'center' }}
          maxW={{ base: '75%', lg: 'auto' }}
        >
          {overTitle}
        </Text>
        <Heading
          variant="section"
          size="section"
          textAlign={{ base: 'left', lg: 'center' }}
        >
          <RichText txt={title} />
        </Heading>
        <VerticalList
          items={initiatives}
          resourceName="initiative"
          itemComponent={MoreInitiative}
          spacing="0"
        />
      </Container>
    </Box>
  );
};

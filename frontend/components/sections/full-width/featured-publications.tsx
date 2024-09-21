import { Box, Container, Heading } from '@chakra-ui/react';
import { HorizontalList } from '../../lists/horizontal-list';
import {
  FeaturedPublication,
  PublicationProps,
} from '../../list-items/featured-publications';

interface FeaturedPublicationsProps {
  title: string;
  publications: PublicationProps[];
}

export const FeaturedPublications: React.FC<FeaturedPublicationsProps> = (
  props
) => {
  const { title, publications } = props;

  return (
    <Box>
      <Container
        maxW={{
          base: 'container.mobile.lg',
          md: 'container.tablet.lg',
          lg: 'container.desktop.md',
        }}
      >
        <Heading
          as="h2"
          fontWeight="black"
          fontSize={{ base: '30', md: '50', lg: '60' }}
          lineHeight={{ base: '60', lg: '60' }}
          marginBottom={{ base: '40px' }}
        >
          {title}
        </Heading>
      </Container>

      <Box
        overflow="hidden"
        pt={{ lg: '40' }}
        px={{
          base: '5',
          md: '50',
          lg: 'calc((100vw - min(80vw, 1120px)) / 2)',
        }}
      >
        <HorizontalList
          items={publications}
          resourceName="publication"
          itemComponent={FeaturedPublication}
          containScroll="keepSnaps"
        />
      </Box>
    </Box>
  );
};

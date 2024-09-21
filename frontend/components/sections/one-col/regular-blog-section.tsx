import { VStack, Heading, Container } from '@chakra-ui/react';
import { RichText } from '../../text/rich-text';
import { BlogMediaTextLists } from '../sub-components/blog-media-text-lists';

export interface RegularBlogSectionProps {
  sectionTitle?: string;
  subComponents: any[];
  listItemComponent?: {
    resourceName: string;
    itemComponent: any;
  };
}

export const RegularBlogSection: React.FC<RegularBlogSectionProps> = (
  props
) => {
  const { sectionTitle, subComponents, listItemComponent } = props;

  return (
    <Container
      maxW={{ base: 'container.mobile.lg', lg: 'container.desktop.sm' }}
    >
      <VStack
        spacing={{ base: '40', lg: '80' }}
        alignItems="flex-start"
        sx={{
          '& > *': {
            width: '100%',
          },
        }}
      >
        {sectionTitle && (
          <Heading variant="blog_section" size="blog_section">
            <RichText txt={sectionTitle} />
          </Heading>
        )}
        {subComponents.map((subComponents, i) => {
          return (
            <BlogMediaTextLists
              key={i}
              title={subComponents.title}
              paragraphs={subComponents.paragraphs}
              verticalList={subComponents.verticalList}
              images={subComponents.images}
              videos={subComponents.videos}
              listItemComponent={
                subComponents.verticalListItemComponent ?? listItemComponent
              }
            />
          );
        })}
      </VStack>
    </Container>
  );
};

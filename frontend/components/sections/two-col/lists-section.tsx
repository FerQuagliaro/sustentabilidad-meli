import { Heading, VStack, StackDivider, Container } from '@chakra-ui/react';
import { TwoColSection } from '../../layout/sub-layouts/two-col-section';
import { ColOne } from '../../layout/sub-layouts/col-one';
import { ColTwo } from '../../layout/sub-layouts/col-two';
import { RichText } from '../../text/rich-text';
import { TwoColList } from '../../lists/two-col-list';

interface ListsSectionProps {
  sectionTitle: string;
  theme?: string;
  lists: {
    listHeader?: {
      title?: string;
      excerpt?: string;
      img?: {
        src: string;
        alt: string;
      };
    };
    items: any[];
  }[];
  resourceName: string;
  itemComponent: any;
}

export const ListsSection: React.FC<ListsSectionProps> = (props) => {
  const { sectionTitle, lists, resourceName, itemComponent, theme } = props;

  return (
    <Container
      maxW={{ base: 'container.mobile.lg', lg: 'container.desktop.md' }}
    >
      <TwoColSection>
        <ColOne>
          <Heading variant="twoCol_section" size="twoCol_section">
            <RichText txt={sectionTitle} />
          </Heading>
        </ColOne>
        <ColTwo>
          <VStack
            spacing={{ base: '80', lg: '160' }}
            divider={<StackDivider borderColor="meli.black" />}
            sx={{
              '& > *': {
                width: '100%',
              },
            }}
          >
            {lists.map((list, i) => {
              return (
                <TwoColList
                  key={i}
                  theme={theme}
                  listHeader={list.listHeader}
                  items={list.items}
                  resourceName={resourceName}
                  itemComponent={itemComponent}
                />
              );
            })}
          </VStack>
        </ColTwo>
      </TwoColSection>
    </Container>
  );
};

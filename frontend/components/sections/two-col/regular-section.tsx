import { VStack, Heading, Container } from '@chakra-ui/react';
import { TwoColSection } from '../../layout/sub-layouts/two-col-section';
import { ColOne } from '../../layout/sub-layouts/col-one';
import { ColTwo } from '../../layout/sub-layouts/col-two';
import {
  MediaTextLists,
  MediaTextListsProps,
} from '../sub-components/media-text-lists';
import { RichText } from '../../text/rich-text';

export interface RegularSectionProps {
  sectionTitle?: string;
  theme?: string;
  subComponents: any[];
  verticalListItemComponent?: {
    resourceName: string;
    itemComponent: any;
  };
  horizontalListItemComponent?: {
    resourceName: string;
    itemComponent: any;
  };
  twoColListItemComponent?: {
    resourceName: string;
    itemComponent: any;
  };
}

export const RegularSection: React.FC<RegularSectionProps> = ({
  sectionTitle,
  subComponents,
  theme,
  verticalListItemComponent,
  horizontalListItemComponent,
  twoColListItemComponent,
}) => {
  return (
    <Container
      maxW={{
        base: 'container.mobile.lg',
        md: 'container.tablet.lg',
        lg: 'container.desktop.md',
      }}
    >
      <TwoColSection>
        <ColOne>
          {sectionTitle && (
            <Heading variant="twoCol_section" size="twoCol_section">
              <RichText txt={sectionTitle} />
            </Heading>
          )}
        </ColOne>
        <ColTwo
          overflow={{ lg: 'hidden' }}
          mr={{ lg: 'calc((100vw - min(80vw, 1120px)) / 2 * -1)' }}
          pr={{ lg: 'calc((100vw - min(80vw, 1120px)) / 2)' }}
        >
          <VStack spacing={{ base: '40', lg: '80' }} alignItems="flex-start">
            {subComponents.map((subComponent, i) => {
              return (
                <MediaTextLists
                  key={i}
                  logo={subComponent.logo}
                  title={subComponent.title}
                  theme={theme}
                  paragraphs={subComponent.paragraphs}
                  verticalList={subComponent.verticalList}
                  horizontalList={subComponent.horizontalList}
                  twoColList={subComponent.twoColList}
                  videos={subComponent.videos}
                  images={subComponent.images}
                  verticalListItemComponent={
                    subComponent.verticalListItemComponent ??
                    verticalListItemComponent
                  }
                  horizontalListItemComponent={
                    subComponent.horizontalListItemComponent ??
                    horizontalListItemComponent
                  }
                  twoColListItemComponent={
                    subComponent.twoColListItemComponent ??
                    twoColListItemComponent
                  }
                />
              );
            })}
          </VStack>
        </ColTwo>
      </TwoColSection>
    </Container>
  );
};

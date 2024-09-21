import { Box, Container, Text, Heading } from '@chakra-ui/react';
import { Stakeholder, StakeholderProps } from '../../list-items/stakeholder';
import { HorizontalList } from '../../lists/horizontal-list';
interface MoreStakeholdersProps {
  overTitle: string;
  title: string;
  stakeholders: StakeholderProps[];
}

export const MoreActuaciones: React.FC<MoreStakeholdersProps> = (props) => {
  const { overTitle, title, stakeholders } = props;

  return (
    <Box
      as="section"
      position="relative"
      zIndex={10}
      width="100vw"
      paddingTop={{ base: '160', lg: '240' }}
      bgGradient="linear(#F4F4F4, #FFF)"
    >
      <Container
        maxW={{
          base: 'container.mobile.lg',
          md: 'container.tablet.lg',
          lg: 'container.desktop.md',
        }}
        centerContent
      >
        <Text
          textAlign="center"
          textTransform="uppercase"
          color="meli.black"
          fontWeight="extrabold"
          fontSize={{ base: '20' }}
          lineHeight={{ base: '40' }}
          marginBottom={{ base: '20', lg: '40' }}
        >
          {overTitle}
        </Text>
        <Heading
          as="h2"
          textAlign="center"
          color="meli.black"
          fontWeight="black"
          fontSize={{ base: '30', md: '40', lg: '70' }}
          lineHeight={{ base: '60', lg: '70' }}
          marginBottom={{ base: '40', lg: '8' }}
          maxW={{ md: '15ch' }}
        >
          {title}
        </Heading>
      </Container>

      <Box overflow="hidden" px="8">
        <HorizontalList
          items={stakeholders}
          resourceName="stakeholder"
          itemComponent={Stakeholder}
          containScroll="keepSnaps"
          pl={{ lg: 'calc((100vw - min(80vw, 1120px)) / 2)' }}
          pr={{ lg: 'calc((100vw - min(80vw, 1120px)) / 2 - 24px)' }}
          mr={{ base: '-20', lg: '0' }}
        />
      </Box>
    </Box>
  );
};

import Link from 'next/link';
import { Heading, Container, Flex, Box, Button } from '@chakra-ui/react';
import { VerticalList } from '../../lists/vertical-list';
import { OtherReport } from '../../list-items/other-report';

interface ReportProps {
  href: string;
  label: string;
}
interface ReportsSectionProps {
  otherReportsTitle: string;
  otherReports: ReportProps[];
  linkToBlogPage: {
    href: string;
    label: string;
  };
}

export const OtherReports: React.FC<ReportsSectionProps> = (props) => {
  const { otherReportsTitle, otherReports, linkToBlogPage } = props;

  return (
    <Container
      maxW={{ base: 'container.mobile.lg', lg: 'container.desktop.md' }}
      marginTop={{ base: '40', lg: '80' }}
    >
      <Flex alignItems="center" marginBottom="20">
        <Heading
          as="h3"
          fontSize={{ base: '20', lg: '30' }}
          fontWeight="extrabold"
          alignSelf="flex-start"
          marginRight={{ lg: '40' }}
        >
          {otherReportsTitle}
        </Heading>
        <Box
          display={{ base: 'none', lg: 'block' }}
          height="1px"
          flex="1"
          backgroundColor="meli.black"
          transform="translateY(2px)"
        />
      </Flex>
      <VerticalList
        items={otherReports}
        resourceName="otherReport"
        itemComponent={OtherReport}
        spacing="0px"
      />
      <Container centerContent marginTop={{ base: '20' }}>
        <Link href={linkToBlogPage.href} passHref>
          <Button as="a" variant="outLine">
            {linkToBlogPage.label}
          </Button>
        </Link>
      </Container>
    </Container>
  );
};

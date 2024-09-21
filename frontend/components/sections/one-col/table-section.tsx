import { useBreakpointValue } from '@chakra-ui/react';
import { VStack, Heading, Container } from '@chakra-ui/react';
import { RichText } from '../../text/rich-text';
import { Table, TableProps } from '../sub-components/table';
import { TableMobile } from '../sub-components/table-mobile';

export interface TableSectionProps {
  sectionTitle?: string;
  tables?: TableProps[];
}

export const TableSection: React.FC<TableSectionProps> = (props) => {
  const { sectionTitle, tables } = props;
  const screenSize = useBreakpointValue({ base: 'mobile', lg: 'desktop' });

  return (
    <Container
      maxW={{
        base: 'container.mobile.lg',
        md: 'container.tablet.lg',
        lg: 'container.desktop.md',
      }}
    >
      {sectionTitle && (
        <Heading
          as="h2"
          variant="twoCol_section"
          size="twoCol_section"
          marginBottom={{ base: '40', lg: '80' }}
        >
          <RichText txt={sectionTitle} />
        </Heading>
      )}
      <VStack spacing={{ base: '160', lg: '240' }} alignItems="flex-start">
        {tables?.map((table, i) => {
          return screenSize === 'mobile' ? (
            <TableMobile
              key={i}
              title={table.title}
              heads={table.heads}
              rows={table.rows}
            />
          ) : (
            <Table
              key={i}
              title={table.title}
              heads={table.heads}
              rows={table.rows}
            />
          );
        })}
      </VStack>
    </Container>
  );
};

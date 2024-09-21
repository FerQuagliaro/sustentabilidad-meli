import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Table as ChakraTable,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { TableProps } from './table';
import { RichText } from '../../text/rich-text';

export const TableMobile: React.FC<TableProps> = (props) => {
  const { title, heads, rows } = props;

  return (
    <Box w="100%">
      {title && (
        <Heading
          as="h3"
          fontSize="30"
          lineHeight="30"
          fontWeight="extrabold"
          marginBottom="40"
        >
          <RichText txt={title} />
        </Heading>
      )}
      <Accordion defaultIndex={[0]} allowMultiple allowToggle>
        {rows.map((row, idx) => {
          return (
            <AccordionItem key={idx} px={0}>
              <h3 style={{ padding: '30px 0' }}>
                <AccordionButton px={0} _hover={{ background: 'none' }}>
                  <Box
                    flex="1"
                    textAlign="left"
                    fontWeight="bold"
                    fontSize="20"
                    lineHeight="70"
                  >
                    {row.head}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h3>
              <AccordionPanel pb={4} px={0} paddingTop={0}>
                <ChakraTable variant="unstyled">
                  <Tbody>
                    {heads.map((h, i) => {
                      return (
                        <Tr key={h}>
                          <Th
                            fontWeight="regular"
                            fontSize="20"
                            lineHeight="20"
                            color="meli.black"
                            paddingLeft={0}
                          >
                            {h}
                          </Th>
                          <Td
                            textAlign="center"
                            fontWeight="bold"
                            fontSize="20"
                            lineHeight="20"
                            color="meli.black"
                            paddingRight={0}
                          >
                            {rows[idx].cells[i]}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </ChakraTable>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Box>
  );
};

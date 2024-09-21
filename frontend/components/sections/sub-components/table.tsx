import {
  Heading,
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
} from '@chakra-ui/react';
import { RichText } from '../../text/rich-text';

export interface TableProps {
  title?: string;
  heads: string[];
  rows: {
    head: string;
    cells: string[];
  }[];
}

export const Table: React.FC<TableProps> = (props) => {
  const { title, heads, rows } = props;

  return (
    <Box w="100%">
      {title && (
        <Heading
          as="h3"
          fontSize={{ lg: '30' }}
          lineHeight={{ lg: '30' }}
          fontWeight="extrabold"
          marginBottom={{ base: '20', lg: '40' }}
        >
          <RichText txt={title} />
        </Heading>
      )}
      <ChakraTable>
        <Thead backgroundColor="#F9F9F9" h="100px">
          <Tr>
            <Th />
            {heads.map((head, i) => {
              return (
                <Th
                  key={`${head}_${i}`}
                  textAlign="center"
                  fontSize="20"
                  fontWeight="bold"
                  color="black"
                >
                  {head}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, i) => {
            return (
              <Tr
                key={i}
                h="100px"
                _even={{
                  backgroundColor: '#F9F9F9',
                }}
              >
                <Th
                  maxW="250px"
                  fontSize="20"
                  lineHeight="20"
                  fontWeight="bold"
                  color="black"
                  maxWidth="15ch"
                  textTransform="capitalize"
                >
                  {row.head}
                </Th>
                {row.cells.map((cell, i) => {
                  return (
                    <Td
                      key={i}
                      textAlign="center"
                      fontSize="20"
                      fontWeight="regular"
                      color="black"
                    >
                      {cell}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </ChakraTable>
    </Box>
  );
};

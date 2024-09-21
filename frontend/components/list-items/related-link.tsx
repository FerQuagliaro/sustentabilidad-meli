import Link from 'next/link';
import { Box, Text, Flex, Link as ChakraLink } from '@chakra-ui/react';
import { CircleArrowRight } from '../icons/circle-arrow-right';

interface RelatedLinkProps {
  href: string;
  label: string;
}

interface Props {
  link: RelatedLinkProps;
}

export const RelatedLink: React.FC<Props> = ({ link }) => {
  const { href, label } = link;

  return (
    <Box
      as="div"
      width="100%"
      listStyleType="none"
      borderBottom="1px solid"
      borderBottomColor="meli.lightGrey"
      _first={{ borderTop: '1px solid', borderTopColor: 'meli.lightGrey' }}
      py={{ base: '40', lg: '60' }}
    >
      <Link href={href} passHref>
        <ChakraLink
          target="_blank"
          cursor="pointer"
          _hover={{ listStyleType: 'none' }}
          sx={{
            '&:hover svg': {
              backgroundColor: 'meli.yellow',
            },
          }}
        >
          <Flex alignItems={{ base: 'center' }}>
            <Text
              flex="1"
              color="meli.black"
              marginRight="50px"
              fontSize={{ base: '20', lg: '30' }}
              lineHeight={{ base: '20', lg: '30' }}
              fontWeight={{ base: 'bold', lg: 'regular' }}
            >
              {label}
            </Text>
            <CircleArrowRight
              transform="rotate(-45deg)"
              borderRadius="full"
              transition="all .325s"
              width="50px"
              height="50px"
            />
          </Flex>
        </ChakraLink>
      </Link>
    </Box>
  );
};

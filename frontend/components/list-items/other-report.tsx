import Link from 'next/link';
import { Box, Heading } from '@chakra-ui/react';
import { CircleArrowRight } from '../icons/circle-arrow-right';
import { RichText } from '../text/rich-text';

interface OtherReportsProps {
  href: string;
  label: string;
}

interface Props {
  otherReport: OtherReportsProps;
}

export const OtherReport: React.FC<Props> = ({ otherReport }) => {
  const { href, label } = otherReport;

  return (
    <Box
      key={otherReport.href}
      width="100%"
      py={{ base: '14px' }}
      borderTop={{ base: '1px solid', lg: '0px' }}
      borderTopColor={{ base: 'meli.lightGrey', lg: 'none' }}
    >
      <Link href={href} passHref>
        <Box
          as="a"
          display="flex"
          alignItems="center"
          target="_blank"
          justifyContent="space-between"
          sx={{
            '&:hover svg': {
              backgroundColor: 'meli.yellow',
            },
          }}
        >
          <Heading
            as="h4"
            fontSize={{ base: '14', lg: '16' }}
            fontWeight="regular"
            lineHeight="18"
            letterSpacing="normal"
            maxW={{ base: '26ch', lg: '100%' }}
          >
            <RichText txt={label} />
          </Heading>
          <CircleArrowRight
            boxSize={{ base: 6, lg: 8 }}
            transform="rotate(90deg)"
            borderRadius="full"
            transition="all .325s"
          />
        </Box>
      </Link>
    </Box>
  );
};

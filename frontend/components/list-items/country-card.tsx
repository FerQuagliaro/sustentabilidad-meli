import Link from 'next/link';
import {
  Box,
  Text,
  Image,
  Link as ChakraLink,
  useBreakpointValue,
} from '@chakra-ui/react';
import { CircleArrowRight } from '../icons/circle-arrow-right';

interface CountryCardProps {
  img: {
    src: string;
    alt: string;
  };
  label: string;
  url?: string;
  btnText: string;
}

interface Props {
  country: CountryCardProps;
}

export const CountryCard: React.FC<Props> = ({ country }) => {
  const { img, label, url, btnText } = country;
  const size = useBreakpointValue({ base: 'mobile', lg: 'desktop' });

  return url ? (
    <Link href={url} passHref>
      <ChakraLink
        marginRight={{ base: '20px' }}
        cursor="pointer"
        target="_blank"
        _hover={{ listStyleType: 'none' }}
        sx={{
          '&:hover .img-container': {
            height: '195px',
          },
          '&:hover .link-box': {
            opacity: '1',
          },
          '&:hover .country-name': {
            opacity: '0',
          },
          '&:hover .yellow-circle': {
            opacity: '0',
          },
        }}
      >
        <Box
          flexBasis="100%"
          width={{ base: '300px' }}
          height={{ base: '400px' }}
          borderRadius={{ base: 'meli.md' }}
          overflow="hidden"
          backgroundColor="#F7F7F7"
          display="flex"
          flexDirection="column"
        >
          <Box
            className="img-container"
            width="100%"
            height={{ lg: '275px' }}
            overflow="hidden"
            transition="all .35s"
          >
            <Image src={img.src} alt={img.alt} objectFit="cover" />
          </Box>
          <Text
            className="country-name"
            fontWeight="bold"
            fontSize="18"
            mx="20px"
            marginTop="10px"
            opacity="1"
            transition="opacity .15s"
          >
            {label}
          </Text>
          <Box
            className="link-box"
            display={{ base: 'none', lg: 'flex' }}
            w="100%"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            opacity="0"
            transition="opacity .35s"
            paddingTop="10px"
          >
            <Text fontWeight="bold" fontSize="18" marginBottom="10px">
              {btnText}
            </Text>
            <CircleArrowRight transform="rotate(-45deg)" boxSize={16} />
          </Box>
          {size === 'mobile' && (
            <Box
              w="100%"
              display="flex"
              alignItems="center"
              paddingTop="10px"
              paddingLeft="20px"
              marginBottom="20px"
              marginTop="20px"
            >
              <Text
                fontWeight="bold"
                fontSize="18"
                marginBottom="10px"
                marginRight="20px"
                transform="translateY(4px)"
              >
                {btnText}
              </Text>
              <CircleArrowRight transform="rotate(-45deg)" boxSize={10} />
            </Box>
          )}
        </Box>
      </ChakraLink>
    </Link>
  ) : (
    <Box
      flexShrink="0"
      width={{ base: '300px' }}
      height={{ base: '400px' }}
      borderRadius={{ base: 'meli.md' }}
      overflow="hidden"
      backgroundColor="#F7F7F7"
      display="flex"
      flexDirection="column"
      marginRight={{ base: '20px' }}
    >
      <Box width="100%" height={{ lg: '275px' }}>
        <Image src={img.src} alt={img.alt} objectFit="cover" />
      </Box>
      <Text fontWeight="bold" fontSize="18" mx="20px" marginTop="20px">
        {label}
      </Text>
    </Box>
  );
};

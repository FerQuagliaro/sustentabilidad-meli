import Link from 'next/link';
import {
  Box,
  Flex,
  Image,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';
import { PlusIcon } from '../../../icons/plus-icon';
import { MinusIcon } from '../../../icons/minus-icon';
import { CircleArrowRight } from '../../../icons/circle-arrow-right';

export interface InitiativeProps {
  title: string;
  theme?: string;
  img: {
    src: string;
    alt: string;
  };
  excerpt: string;
  link: {
    href: string;
    label: string;
  };
}

export const Initiative: React.FC<InitiativeProps> = (props) => {
  const { title, img, excerpt, link, theme } = props;

  return (
    <AccordionItem py={{ base: 40, lg: 60 }} borderColor="meli.lightGrey">
      <h3>
        <AccordionButton
          _hover={{ background: 'none' }}
          _focus={{ outline: 'none' }}
          sx={{
            '&:hover > svg': {
              color: 'meli.yellow',
            },
            '&[aria-expanded=false] > .minus-btn': {
              display: 'none',
            },
            '&[aria-expanded=true] > .plus-btn': {
              display: 'none',
            },
          }}
        >
          <Box
            flex="1"
            textAlign="left"
            color={`stakeholders.${theme}.dark`}
            fontSize={{ base: '30', lg: '40' }}
            lineHeight={{ base: '30' }}
            fontWeight={{ base: 'bold' }}
            paddingRight="20"
            marginRight="auto"
          >
            {title}
          </Box>
          <MinusIcon
            className="minus"
            color="white"
            width={{ base: '42px', lg: '80px' }}
            height={{ base: '42px', lg: '80px' }}
          />
          <PlusIcon
            className="plus"
            color="white"
            width={{ base: '42px', lg: '80px' }}
            height={{ base: '42px', lg: '80px' }}
          />
        </AccordionButton>
      </h3>
      <AccordionPanel pb={4}>
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          marginTop={{ base: '20px' }}
          alignItems={{ lg: 'center' }}
        >
          {img.src && (
            <Image
              src={img.src}
              alt={img.alt}
              borderRadius="100%"
              width="170px"
              height="170px"
              marginBottom={{ base: '30px' }}
              marginRight={{ md: '40px' }}
              objectFit="cover"
            />
          )}
          <Box>
            <Text
              color="meli.black"
              fontWeight="regular"
              fontSize={{ base: '18' }}
              lineHeight={{ base: '18' }}
              marginBottom={{ base: '20px' }}
              maxW={{ md: '55ch' }}
            >
              {excerpt}
            </Text>
            <Link href={link.href} passHref>
              <Flex
                as="a"
                alignItems="center"
                sx={{
                  '&:hover > svg': {
                    backgroundColor: 'meli.yellow',
                  },
                }}
              >
                <Text
                  fontWeight="extrabold"
                  color={`stakeholders.${theme}.support`}
                  fontSize={{ base: '20' }}
                  marginRight={{ base: '16px' }}
                >
                  {link.label}
                </Text>
                <CircleArrowRight
                  color={`stakeholders.${theme}.support`}
                  transform="rotate(-45deg)"
                  borderRadius="full"
                  width="35px"
                  height="35px"
                />
              </Flex>
            </Link>
          </Box>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Flex,
  Box,
  UnorderedList,
  ListItem,
  Text,
  Collapse,
} from '@chakra-ui/react';
import { Close } from '../icons/close';
import { CaretDownFull } from '../icons/caret-down-full';
import { LinkProps, NavLinkProps } from './main-nav';

export interface MobileNavProps {
  isOpen: boolean;
  onMobileNavOpen: (val: boolean) => void;
  navLinks: NavLinkProps[];
  reportLink: LinkProps;
}

interface SubNavsProps {
  [key: string]: boolean;
}

export const MobileNav: React.FC<MobileNavProps> = (props) => {
  const { isOpen, onMobileNavOpen, navLinks, reportLink } = props;

  const subNavs = navLinks.reduce((acc: SubNavsProps, curr: NavLinkProps) => {
    if (curr.subNav) {
      return { ...acc, [curr.label]: false };
    } else {
      return { ...acc };
    }
  }, {});

  const [isSubNavOpen, setIsSubNavOpen] = useState(subNavs);

  const handleSubNavClick = (label: string) => {
    const curr = { ...isSubNavOpen };
    curr[label] = !curr[label];
    setIsSubNavOpen(curr);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setTimeout(() => {
        setIsSubNavOpen(subNavs);
      }, 600);
    }
  }, [isOpen]);

  return (
    <Flex
      position="fixed"
      overflow="auto"
      height="100%"
      zIndex="30"
      top="0"
      left="0"
      right="0"
      minH="100vh"
      transform={isOpen ? 'translateX(0%)' : 'translateX(100%)'}
      transition="transform .5s ease-in-out"
      backgroundColor="meli.yellow"
      flexDirection="column"
      padding="25vh 10vw 10vh 10vw"
    >
      <Box
        as="button"
        type="button"
        position="absolute"
        top="30px"
        right="30px"
      >
        <Close onClick={() => onMobileNavOpen(false)} />
      </Box>
      <UnorderedList
        marginLeft="0"
        listStyleType="none"
        display="grid"
        gridAutoFlow="row"
        gridRowGap="30px"
      >
        {navLinks.map((navLink, idx) => {
          return (
            <ListItem key={`${navLink.label}${idx}`}>
              {navLink.subNav ? (
                <Box>
                  <Flex
                    alignItems="center"
                    onClick={() => handleSubNavClick(navLink.label)}
                  >
                    <Text
                      fontSize="40"
                      lineHeight="40"
                      fontWeight="bold"
                      marginRight=".25em"
                    >
                      {navLink.label}
                    </Text>
                    <CaretDownFull
                      boxSize={4}
                      transform={
                        isSubNavOpen[navLink.label]
                          ? 'rotate(180deg)'
                          : 'rotate(0)'
                      }
                    />
                  </Flex>
                  <Collapse in={isSubNavOpen[navLink.label]} animateOpacity>
                    <UnorderedList
                      marginTop="2em"
                      display="grid"
                      gridAutoFlow="row"
                      gridRowGap="2em"
                      listStyleType="none"
                      marginLeft="0px"
                    >
                      {navLink.subNav.links.map(
                        (subNavLink: any, i: number) => {
                          return (
                            <ListItem key={`${subNavLink.label}${i}`}>
                              <Link href={subNavLink.href} passHref>
                                <Box
                                  as="a"
                                  onClick={() => onMobileNavOpen(false)}
                                >
                                  <Text fontSize="20" lineHeight="40">
                                    {subNavLink.label}
                                  </Text>
                                </Box>
                              </Link>
                            </ListItem>
                          );
                        }
                      )}
                    </UnorderedList>
                  </Collapse>
                </Box>
              ) : (
                <Link href={navLink.href || ''} passHref>
                  <Box as="a" onClick={() => onMobileNavOpen(false)}>
                    <Text fontSize="40" lineHeight="40" fontWeight="bold">
                      {navLink.label}
                    </Text>
                  </Box>
                </Link>
              )}
            </ListItem>
          );
        })}
      </UnorderedList>
      <Flex
        marginTop="3em"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Link href={reportLink.href} passHref>
          <Flex
            position="relative"
            as="a"
            alignItems="center"
            justifyContent="space-between"
            bgColor="white"
            width="100%"
            height="60px"
            padding="10px 15px"
            borderRadius="full"
            transition="all .3s"
            overflow="hidden"
          >
            <Box flex="1">
              <Text
                position="relative"
                zIndex="10"
                fontSize="20"
                fontWeight="bold"
                color="meli.black"
                transition="color .25s"
                textAlign="center"
              >
                {reportLink.label}
              </Text>
            </Box>
          </Flex>
        </Link>
      </Flex>
    </Flex>
  );
};

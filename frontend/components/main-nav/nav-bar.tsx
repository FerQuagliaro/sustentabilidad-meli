import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Flex,
  Text,
  Box,
  Image,
  UnorderedList,
  ListItem,
  Container,
  keyframes,
  Link as ChakraLink,
  HStack,
} from '@chakra-ui/react';
import { LocalizationsAttributes } from '../../lib/types/localizations';
import { CaretDownFull } from '../icons/caret-down-full';
import { LanguageSelector } from './lang-selector';
import { Hamburger } from '../icons/hamburger';
import { NavLinkProps, LinkProps, SubNavLinksProps } from './main-nav';
import { DesktopSubNav } from './desktop-subnav';
import { useState } from 'react';
import { DownloadReport } from '../icons/download-report';

const crawl = keyframes`
  from {transform: translateX(-50%);}
  to {transform: translateX(0);}
`;

interface NavBarProps {
  localizations: LocalizationsAttributes[];
  route: string;
  navLinks: NavLinkProps[];
  onMobileNavOpen: (val: boolean) => void;
  subNavLinks: SubNavLinksProps;
  reportLink: LinkProps;
  logo: { alt: string; src: string };
}

export const NavBar: React.FC<NavBarProps> = (props) => {
  const [isSubNavOpen, setIsSubNavOpen] = useState<boolean>(false);

  const {
    localizations,
    navLinks,
    onMobileNavOpen,
    subNavLinks,
    reportLink,
    logo,
    route,
  } = props;
  const urlStr = route === '/' ? 'home' : route.substring(1);
  const router = useRouter();
  const { locale } = router;

  return (
    <Container
      //className='nav-bar'
      position="relative"
      zIndex="30"
      maxWidth={{
        base: 'container.mobile.lg',
        md: 'container.tablet.lg',
        lg: 'container.desktop.lg',
      }}
    >
      <Flex
        as="nav"
        position="relative"
        zIndex="20"
        top="0"
        left="0"
        right="0"
        alignItems="center"
        padding="2rem 0"
        transition="0.3s padding"
      >
        {/* <Link href="/" passHref>
          <ChakraLink
            position="relative"
            marginRight="auto"
            cursor="pointer"
            zIndex={20}
          >
            <Image
              height={{ base: '28px', lg: '35px' }}
              src={logo.src}
              alt={logo.alt}
            />
          </ChakraLink>
        </Link> */}
        <Link href="/" passHref>
          <ChakraLink
            position="relative"
            marginRight="auto"
            cursor="pointer"
            zIndex={20}
          >
            <Image
              height={{ base: '28px', lg: '35px' }}
              src={
                locale === 'pt' ? '/img/meli-logo-pt.svg' : '/img/meli-logo.svg'
              }
              alt="meli-logo"
            />
          </ChakraLink>
        </Link>
        <UnorderedList
          listStyleType="none"
          marginLeft="0"
          display={{ base: 'none', lg: 'grid' }}
          gridAutoFlow="column"
          gridColumnGap="3.5em"
          alignItems="center"
        >
          {navLinks.map((navLink: any, idx: number) => {
            return navLink.subNav ? (
              <ListItem
                key={idx}
                className="nav-link nav-link-sub"
                onMouseOver={() => setIsSubNavOpen(true)}
                onMouseLeave={() => setIsSubNavOpen(false)}
              >
                <Flex
                  cursor="pointer"
                  position="relative"
                  zIndex="20"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text
                    fontWeight={
                      route.includes(navLink.label.toLowerCase())
                        ? 'extrabold'
                        : 'regular'
                    }
                    borderBottom={
                      route.includes(navLink.label.toLowerCase())
                        ? '1px solid'
                        : '0px'
                    }
                    borderBottomColor="meli.black"
                    sx={{
                      '&::after': {
                        content: '""',
                        display: 'block',
                        height: '1px',
                        width: '100%',
                        backgroundColor: route.includes(
                          navLink.label.toLowerCase()
                        )
                          ? 'white'
                          : 'meli.black',
                        transformOrigin: 'right',
                        transform: 'scaleX(0)',
                        transition: 'transform .35s cubic-bezier(.8,0,.2,1)',
                      },
                      '.nav-link:hover &::after': {
                        transform: 'scaleX(100%)',
                        transformOrigin: 'left',
                      },
                    }}
                  >
                    {navLink.label}
                  </Text>
                  <CaretDownFull
                    boxSize={2}
                    marginLeft="0.5em"
                    transform={
                      subNavLinks[navLink.label]
                        ? 'rotate(180deg)'
                        : 'rotate(0deg)'
                    }
                  />
                </Flex>
                <DesktopSubNav subNav={navLink.subNav} />
              </ListItem>
            ) : (
              <ListItem
                className="nav-link"
                key={idx}
                position="relative"
                zIndex="20"
              >
                <Link href={navLink.href} passHref>
                  <Flex
                    as="a"
                    position="relative"
                    cursor="pointer"
                    fontWeight="regular"
                    flexDirection="column"
                  >
                    <Text
                      fontWeight={
                        urlStr === navLink.label.toLowerCase()
                          ? 'extrabold'
                          : 'regular'
                      }
                      borderBottom={
                        urlStr === navLink.label.toLowerCase()
                          ? '1px solid'
                          : '0px'
                      }
                      borderBottomColor="meli.black"
                      sx={{
                        '&::after': {
                          content: '""',
                          display: 'block',
                          height: '1px',
                          width: '100%',
                          backgroundColor:
                            urlStr === navLink.label.toLowerCase()
                              ? 'white'
                              : 'meli.black',
                          transformOrigin: 'right',
                          transform: 'scaleX(0)',
                          transition: 'transform .3s cubic-bezier(.8,0,.2,1)',
                        },
                        '.nav-link:hover &::after': {
                          transform: 'scaleX(100%)',
                          transformOrigin: 'left',
                        },
                      }}
                    >
                      {navLink.label}
                    </Text>
                  </Flex>
                </Link>
              </ListItem>
            );
          })}
        </UnorderedList>
        <Link href={reportLink.href} passHref>
          <Box
            as="a"
            target="_blank"
            display={{ lg: 'none' }}
            marginRight={{ base: '20px' }}
            cursor="pointer"
          >
            <DownloadReport />
          </Box>
        </Link>
        <LanguageSelector localizations={localizations} />
        <Box
          position="relative"
          zIndex={20}
          display={{ base: 'none', lg: 'block' }}
        >
          <Link href={reportLink.href} passHref>
            <Flex
              className="download-btn"
              position="relative"
              as="a"
              target="_blank"
              alignItems="center"
              justifyContent="space-between"
              backgroundColor={isSubNavOpen ? 'white' : 'meli.yellow'}
              width="140px"
              height="50px"
              borderRadius="full"
              marginLeft="18px"
              transition="all .3s"
              overflow="hidden"
            >
              <Box
                position="absolute"
                left="0"
                top="0"
                backgroundColor="meli.darkBlue"
                width="140px"
                height="50px"
                borderRadius="full"
                transform="translateX(-100%)"
                transition="transform .25s ease-in-out"
                sx={{
                  '.download-btn:hover &': {
                    transform: 'translateX(0)',
                  },
                }}
              />
              <Box flex="1" overflow="hidden">
                <Text
                  as="div"
                  position="relative"
                  animation={`${crawl} infinite 6s linear reverse`}
                  whiteSpace="nowrap"
                  zIndex="10"
                  color="meli.black"
                  transition="color .25s"
                  w="290%"
                  sx={{
                    '.download-btn:hover & span': {
                      color: 'white',
                    },
                  }}
                >
                  <HStack spacing={0} justifyContent="space-around" w="full">
                    <Text as="span">{reportLink.label}</Text>
                    <Text as="span">{reportLink.label}</Text>
                  </HStack>
                </Text>
              </Box>
            </Flex>
          </Link>
        </Box>
        <Box
          onClick={() => onMobileNavOpen(true)}
          display={{ base: 'block', lg: 'none' }}
          as="button"
          type="button"
          marginLeft="2em"
        >
          <Hamburger />
        </Box>
      </Flex>
    </Container>
  );
};

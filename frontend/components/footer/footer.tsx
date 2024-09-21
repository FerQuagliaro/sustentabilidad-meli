import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Container,
  Flex,
  Box,
  Text,
  UnorderedList,
  ListItem,
  Image,
  Link as ChakraLink,
  VStack,
} from '@chakra-ui/react';
import { InstagramOutline } from '../icons/instagram-outline';
import { LinkedinOutline } from '../icons/linkedin-outline';
import { TwitterOutline } from '../icons/twitter-outline';
import { FacebookOutline } from '../icons/facebook-outline';
import { LinkProps } from '../main-nav/main-nav';
import { RichText } from '../text/rich-text';

interface FooterProps {
  mainLinks: {
    title: string;
    navLinks: LinkProps[];
  };
  sideLinks: LinkProps[];
  legalLinks?: LinkProps[];
  copy: string;
  logo: {
    src: string;
    alt: string;
  };
  socialLinks: {
    media: string;
    href: string;
  }[];
}

function getIcon(media: string) {
  switch (media.toLowerCase()) {
    case 'instagram':
      return (
        <InstagramOutline
          boxSize={5}
          //marginLeft={{ lg: '40px' }}
          cursor="pointer"
        />
      );
    case 'linkedin':
      return (
        <LinkedinOutline
          boxSize={5}
          //marginLeft={{ lg: '40px' }}
          cursor="pointer"
        />
      );
    case 'twitter':
      return (
        <TwitterOutline
          boxSize={5}
          //marginLeft={{ lg: '40px' }}
          cursor="pointer"
        />
      );
    default:
      return (
        <FacebookOutline
          boxSize={5}
          //marginLeft={{ lg: '40px' }}
          cursor="pointer"
        />
      );
  }
}

export const Footer: React.FC<FooterProps> = (props) => {
  const { mainLinks, sideLinks, legalLinks, socialLinks, copy, logo } = props;
  const router = useRouter();
  const { locale } = router;
  return (
    <Box
      as="footer"
      position={{ lg: 'fixed' }}
      w="100vw"
      minH={{ lg: '100vh' }}
      display={{ lg: 'flex' }}
      flexDirection={{ lg: 'column' }}
      justifyContent={{ lg: 'center' }}
      zIndex={0}
      bottom={0}
      backgroundColor="meli.yellow"
      pt={{ base: '160px', md: '100px', lg: 0 }}
      pb={{ base: '4rem', md: '6rem', lg: 0 }}
      // paddingBottom={{ base: '4rem', lg: '6rem' }}
      marginTop={{ base: '-100px', md: 0 }}
      overflow="hidden"
    >
      <Container
        maxWidth={{
          base: 'container.mobile.lg',
          md: 'container.tablet.lg',
          lg: 'container.desktop.md',
        }}
      >
        <Flex
          flexDirection={{ base: 'column', lg: 'row' }}
          paddingBottom={{ md: 'clamp(3rem, 10vh, 9rem)' }}
        >
          <VStack
            paddingBottom={{ base: '3rem', lg: '0' }}
            marginRight={{ base: '0px', lg: 'auto' }}
            spacing={{
              base: '2.25rem',
              md: 'clamp(4rem, 14vh, 14rem)',
            }}
          >
            <Text
              fontSize={{ base: '30', md: '40', xl: '60' }}
              lineHeight={{ base: '40', lg: '60' }}
              textAlign={{ base: 'center', lg: 'left' }}
              fontWeight="bold"
              maxWidth={{ base: 'auto', md: '20ch' }}
              mx={{ base: 'auto', lg: '0px' }}
            >
              <RichText txt={mainLinks.title} />
            </Text>
            <UnorderedList
              listStyleType="none"
              marginLeft={0}
              width="100%"
              display="grid"
              gridAutoFlow="row"
              gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
              gridRowGap={{
                base: '2rem',
                md: 'clamp(3rem, 10vh, 12rem)',
              }}
            >
              {mainLinks.navLinks.map((navLink, i) => {
                return (
                  <ListItem key={i} textAlign={{ base: 'center', lg: 'left' }}>
                    <Link href={navLink.href} passHref>
                      <Box
                        as="a"
                        className="footer-link"
                        fontSize={{ base: '16', lg: '20' }}
                        fontWeight={{ base: 'regular', lg: 'bold' }}
                      >
                        <Text
                          width="max-content"
                          mx={{ base: 'auto', lg: '0' }}
                          sx={{
                            '&::after': {
                              content: '""',
                              display: 'block',
                              height: '1px',
                              width: '100%',
                              backgroundColor: 'meli.black',
                              transformOrigin: 'right',
                              transform: 'scaleX(0) translateY(5px)',
                              transition:
                                'transform .3s cubic-bezier(.8,0,.2,1)',
                            },
                            '.footer-link:hover &::after': {
                              transform: 'scaleX(100%) translateY(5px)',
                              transformOrigin: 'left',
                            },
                          }}
                        >
                          {navLink.label}
                        </Text>
                      </Box>
                    </Link>
                  </ListItem>
                );
              })}
            </UnorderedList>
          </VStack>
          <Box
            borderTop={{ base: '1px solid', lg: 'none' }}
            borderTopColor="meli.black"
            borderLeft={{ lg: '1px solid' }}
            borderLeftColor={{ lg: 'meli.black' }}
            paddingLeft={{ lg: 'min(6rem, 8vw)' }}
            py={{ base: '3rem', lg: '0' }}
          >
            <UnorderedList
              listStyleType="none"
              marginLeft={0}
              height={{ base: 'auto', lg: '100%' }}
              display={{ base: 'grid', lg: 'flex' }}
              gridAutoFlow="row"
              gridRowGap="2rem"
              flexDirection={{ lg: 'column' }}
              justifyContent={{ lg: 'space-between' }}
            >
              {sideLinks.map((sideLink, i) => {
                return (
                  <ListItem
                    className="footer-side-link"
                    width="max-content"
                    mx={{ base: 'auto', lg: '0' }}
                    key={i}
                    textAlign={{ base: 'center', lg: 'left' }}
                  >
                    <Link href={sideLink.href} passHref>
                      <Text
                        as="a"
                        target={
                          sideLink.href.toLocaleLowerCase().includes('mercado')
                            ? '_blank'
                            : '_self'
                        }
                        fontSize={{ base: '20', lg: '40' }}
                        fontWeight={{ base: 'bold', lg: 'regular' }}
                        sx={{
                          '&::after': {
                            content: '""',
                            display: 'block',
                            height: '1px',
                            width: '100%',
                            backgroundColor: 'meli.black',
                            transformOrigin: 'right',
                            transform: 'scaleX(0) translateY(5px)',
                            transition: 'transform .3s cubic-bezier(.8,0,.2,1)',
                          },
                          '.footer-side-link:hover &::after': {
                            transform: 'scaleX(100%) translateY(5px)',
                            transformOrigin: 'left',
                          },
                        }}
                      >
                        {sideLink.label}
                      </Text>
                    </Link>
                  </ListItem>
                );
              })}
            </UnorderedList>
          </Box>
        </Flex>
        <Flex
          flexDirection={{ base: 'column', lg: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          paddingTop={{ base: '3rem', lg: '40' }}
          borderTop="1px solid"
          borderTopColor="meli.black"
        >
          {/* <Box order={-1} marginBottom={{ base: '3rem', lg: '0' }}>
            <Link href="/" passHref>
              <ChakraLink
                position="relative"
                zIndex={20}
                marginRight="auto"
                cursor="pointer"
              >
                <Image src={logo.src} alt={logo.alt} height="35px" />
              </ChakraLink>
            </Link>
          </Box> */}
          <Box order={-1} marginBottom={{ base: '3rem', lg: '0' }}>
            <Link href="/" passHref>
              <ChakraLink
                position="relative"
                zIndex={20}
                marginRight="auto"
                cursor="pointer"
              >
                <Image
                  src={
                    locale === 'pt'
                      ? '/img/meli-logo-pt.svg'
                      : '/img/meli-logo.svg'
                  }
                  alt="meli-logo"
                  height="35px"
                />
              </ChakraLink>
            </Link>
          </Box>
          <Flex
            order={{ base: '1', lg: '99' }}
            justifyContent="space-between"
            alignItems="center"
            width={{ base: 'min(90%, 320px)', lg: '200px' }}
            marginBottom={{ base: '3rem', lg: '0' }}
          >
            {socialLinks.map((socialLink, i) => {
              return (
                <Link key={i} href={socialLink.href} passHref>
                  <ChakraLink target="_blank">
                    {getIcon(socialLink.media)}
                  </ChakraLink>
                </Link>
              );
            })}
          </Flex>
          <Flex
            order={{ base: '99', lg: '1' }}
            flex="1"
            justifyContent="center"
            alignItems="center"
          >
            <Text>{copy}</Text>
            {/* {legalLinks.map((legalLink, i) => {
              return (
                <Link key={i} href={legalLink.href} passHref>
                  <Text
                    display={{ base: 'none', lg: 'block' }}
                    marginLeft={{ lg: '40px' }}
                    cursor="pointer"
                  >
                    {legalLink.label}
                  </Text>
                </Link>
              );
            })} */}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

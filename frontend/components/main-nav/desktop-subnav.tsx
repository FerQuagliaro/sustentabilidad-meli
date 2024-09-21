import Link from 'next/link';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {
  Flex,
  Box,
  Text,
  UnorderedList,
  ListItem,
  Container,
} from '@chakra-ui/react';
//import { RichText } from '../text/rich-text';
import { LinkProps } from './main-nav';

interface TopSubMenuProps {
  subNav: {
    title: string;
    links: LinkProps[];
  };
}

gsap.registerPlugin(ScrollTrigger);

export const DesktopSubNav: React.FC<TopSubMenuProps> = ({ subNav }) => {
  const { links, title } = subNav;

  useEffect(() => {
    const showAnim = gsap
      .from('.sub-nav', {
        opacity: 0,
        pointerEvents: 'none',
        paused: true,
        duration: 0.2,
      })
      .progress(1);

    ScrollTrigger.create({
      id: 'subNavTrigger',
      start: 'top top',
      end: 99999,
      onUpdate: (self: any) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse();
      },
    });

    return () => ScrollTrigger.getById('subNavTrigger')?.kill();
  }, []);

  return (
    <Box
      className="sub-nav"
      display={{ base: 'none', lg: 'block' }}
      position="fixed"
      top="0"
      left="0"
      right="0"
      transform="translateY(-100%)"
    >
      <Flex
        display={{ base: 'none', lg: 'block' }}
        position="fixed"
        zIndex={10}
        top="0"
        left="0"
        right="0"
        backgroundColor="meli.yellow"
        borderBottomRadius="meli.md"
        padding="15vh 5vw 10vh 5vw"
        opacity={0}
        transform="translateY(-60%)"
        transition="transform 3s ease 0.1s, opacity 0.4s ease-in-out 0s, pointer-events 0s"
        pointerEvents="none"
        sx={{
          'html:not(.navigating) .nav-link:hover &': {
            transform: 'translateY(0)',
            opacity: '1',
            pointerEvents: 'inherit',
            transition: 'all .3s ease-in-out 0s',
          },
        }}
      >
        <Container
          maxW="container.desktop.md"
          opacity={0}
          transition="opacity .2s ease-in-out 0s"
          sx={{
            'html:not(.navigating) .nav-link:hover &': {
              opacity: '1',
              transition: 'opacity .2s ease-in-out 0.2s',
            },
          }}
        >
          <Text fontSize="60" color="meli.black" maxW="14ch" lineHeight="50">
            {title}
          </Text>
          <Box
            height="1px"
            backgroundColor="meli.black"
            width="80px"
            marginTop="2em"
          />
          <UnorderedList
            listStyleType="none"
            marginLeft="0"
            marginTop="4em"
            display="grid"
            gridTemplateColumns="repeat(3, 1fr)"
            gridRowGap="3em"
            width="100%"
          >
            {links &&
              links.map((subNav: LinkProps, idx: number) => {
                return (
                  <ListItem key={idx}>
                    <Link href={subNav.href} passHref>
                      <Box
                        as="a"
                        className="subnav-link"
                        fontSize="20"
                        fontWeight="semibold"
                      >
                        <Text
                          width="max-content"
                          sx={{
                            '&::after': {
                              content: '""',
                              display: 'block',
                              height: '1px',
                              width: '100%',
                              backgroundColor: 'meli.black',
                              transformOrigin: 'right',
                              transform: 'scaleX(0) translateY(3px)',
                              transition:
                                'transform .3s cubic-bezier(.8,0,.2,1)',
                            },
                            '.subnav-link:hover &::after': {
                              transform: 'scaleX(100%) translateY(3px)',
                              transformOrigin: 'left',
                            },
                          }}
                        >
                          {subNav.label}
                        </Text>
                      </Box>
                    </Link>
                  </ListItem>
                );
              })}
          </UnorderedList>
        </Container>
      </Flex>
    </Box>
  );
};

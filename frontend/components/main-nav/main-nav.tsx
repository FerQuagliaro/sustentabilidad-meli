import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useState, useEffect, useRef } from 'react';
import { Flex } from '@chakra-ui/react';
import { LocalizationsAttributes } from '../../lib/types/localizations';
import { MobileNav } from './mobile-nav';
import { NavBar } from './nav-bar';

gsap.registerPlugin(ScrollTrigger);

export interface LinkProps {
  href: string;
  label: string;
}
export interface NavLinkProps {
  label: string;
  href?: string;
  subNav?: {
    title: string;
    links: LinkProps[];
  };
}
export interface SubNavLinksProps {
  [key: string]: boolean;
}

interface MainNavProps {
  localizations: LocalizationsAttributes[];
  route: string;
  navLinks: NavLinkProps[];
  reportLink: LinkProps;
  logo: { src: string; alt: string };
}

export const MainNav: React.FC<MainNavProps> = ({
  localizations,
  route,
  navLinks,
  reportLink,
  logo,
}) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const linksWithSubNav = navLinks.reduce(
    (obj: SubNavLinksProps, navLink: NavLinkProps) => {
      if (navLink.subNav) {
        const key = navLink.label;
        obj[key] = false;
      }
      return obj;
    },
    {}
  );

  const [subNavLinks, setSubNavLinks] = useState(linksWithSubNav);

  const handleMobileOpen = (value: boolean) => {
    if (value) {
      setIsMobileNavOpen(value);
      const current = { ...subNavLinks };
      Object.keys(current).forEach((subNavLink: string) => {
        current[subNavLink] = false;
      });
      setSubNavLinks(current);
    } else {
      setIsMobileNavOpen(value);
    }
  };

  useEffect(() => {
    const nav = navRef.current as HTMLElement;
    const showAnim = gsap
      .from('.nav-bar', {
        yPercent: -100,
        paused: true,
        duration: 0.2,
      })
      .progress(1);

    ScrollTrigger.create({
      id: 'mainNavTrigger',
      start: 'top top',
      end: 99999,
      onUpdate: (self) => {
        if (self.direction === -1) {
          showAnim.play();

          if (self.progress === 0) {
            nav.classList.remove('sm');
          } else {
            nav.classList.add('sm');
          }
        } else {
          showAnim.reverse();
        }
      },
    });

    return () => ScrollTrigger.getById('mainNavTrigger')?.kill();
  }, []);

  return (
    <Flex
      ref={navRef}
      className="nav-bar"
      position="fixed"
      zIndex="100"
      top="0"
      width="100vw"
      justifyContent="center"
      backgroundColor="white"
      sx={{
        '&.sm nav': {
          py: '1rem',
        },
      }}
    >
      <NavBar
        localizations={localizations}
        route={route}
        logo={logo}
        navLinks={navLinks}
        subNavLinks={subNavLinks}
        onMobileNavOpen={handleMobileOpen}
        reportLink={reportLink}
      />
      <MobileNav
        navLinks={navLinks}
        isOpen={isMobileNavOpen}
        onMobileNavOpen={handleMobileOpen}
        reportLink={reportLink}
      />
    </Flex>
  );
};

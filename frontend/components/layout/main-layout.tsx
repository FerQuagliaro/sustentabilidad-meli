import Head from 'next/head';
import { useState, useRef, useEffect, RefObject, createContext } from 'react';
import { gsap } from 'gsap';
import { useRouter } from 'next/router';
import { Box, useBreakpointValue } from '@chakra-ui/react';
import { MainNav } from '../main-nav/main-nav';
import { Footer } from '../footer/footer';
import { HeaderAttributes } from '../../lib/types/header';
import { FooterAttributes } from '../../lib/types/footer';
import { LocalizationsAttributes } from '../../lib/types/localizations';
import { WatchVideoPointer } from '../pointers/watch-video';
import { GoToLinkPointer } from '../pointers/go-to-link';
import { OurGoalsPointer } from '../pointers/our-goals';
import { SlidePointer } from '../pointers/slide';

export const GoalsContext = createContext({});

interface GoalImgProps {
  src: string;
  alt: string;
}

export const MainLayout: React.FC<{
  header: HeaderAttributes;
  footer: FooterAttributes;
  localizations: LocalizationsAttributes[];
}> = ({ header, footer, localizations, children }) => {
  const router = useRouter();
  const { route, locale } = router;
  const [goalImg, setGoalImg] = useState<GoalImgProps>({ src: '', alt: '' });
  const size = useBreakpointValue({ base: 'mobile', lg: 'desktop' });
  const heroMouseRef = useRef<HTMLDivElement>(null);
  const stakeholderMouseRef = useRef<HTMLDivElement>(null);
  const ourGoalsMouseRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  const handleSetGoalImg = (img: GoalImgProps) => {
    setGoalImg(img);
  };

  const checkHover = (
    className: string,
    customPointer: RefObject<HTMLDivElement>,
    e: MouseEvent
  ) => {
    const target = e.target as Element;
    //console.log(target.closest(`.${className}`))
    if (target.closest(`.${className}`)) {
      gsap.to(customPointer.current, {
        x: e.clientX,
        y: e.clientY,
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      });
    }

    if (!target.closest(`.${className}`)) {
      gsap.to(customPointer.current, {
        scale: 0,
        duration: 0.2,
        ease: 'power2.out',
      });
    }
  };

  const removeHover = (
    customPointer: RefObject<HTMLDivElement>,
    e: MouseEvent
  ) => {
    gsap.to(customPointer.current, {
      scale: 0,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  const checkScroll = (customPointer: RefObject<HTMLDivElement>, e: Event) => {
    gsap.to(customPointer.current, {
      scale: 0,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  useEffect(() => {
    const scrollHandler = (e: Event) => {
      checkScroll(heroMouseRef, e);
      checkScroll(stakeholderMouseRef, e);
      checkScroll(ourGoalsMouseRef, e);
      checkScroll(slideRef, e);
    };

    const mousemoveHandler = (e: MouseEvent) => {
      checkHover('home-hero-title', heroMouseRef, e);
      checkHover('stakeholder-link', stakeholderMouseRef, e);
      checkHover('our-goals', ourGoalsMouseRef, e);
      checkHover('latest-news', slideRef, e);
    };

    const mouseleaveHandler = (e: MouseEvent) => {
      removeHover(heroMouseRef, e);
      removeHover(stakeholderMouseRef, e);
      removeHover(ourGoalsMouseRef, e);
      removeHover(slideRef, e);
    };

    if (route === '/' && size === 'desktop') {
      document.addEventListener('mousemove', mousemoveHandler);
      document.addEventListener('mouseleave', mouseleaveHandler);
      document.addEventListener('scroll', scrollHandler);
    }
    return () => {
      document.removeEventListener('mousemove', mousemoveHandler);
      document.removeEventListener('mouseleave', mouseleaveHandler);
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [route, size]);

  return (
    <Box>
      {route === '/' && size === 'desktop' && (
        <>
          <WatchVideoPointer ref={heroMouseRef} locale={locale} />
          <GoToLinkPointer ref={stakeholderMouseRef} locale={locale} />
          <SlidePointer ref={slideRef} />
          <OurGoalsPointer
            ref={ourGoalsMouseRef}
            img={{
              src: goalImg.src,
              alt: goalImg.alt,
            }}
          />
        </>
      )}
      <Head>
        <meta charSet="utf-8" />
        <title>Meli Sustentabilidad 2022</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainNav
        localizations={localizations}
        route={router.route}
        navLinks={header.navbar.map((navItem) => ({
          label: navItem.title,
          href: navItem.url,
          subNav: navItem.subTitle
            ? {
                title: navItem.subTitle,
                links: navItem.items.map(({ title, url }) => ({
                  label: title,
                  href: url,
                })),
              }
            : undefined,
        }))}
        reportLink={{
          href: header.btnDownload?.file?.data?.attributes?.url,
          label: header.btnDownload?.text,
        }}
        logo={{
          src: header.logo.data.attributes.url,
          alt: header.logo.data.attributes.alternativeText,
        }}
      />
      <main>
        {route !== '/404' && route !== '/500' ? (
          <>
            <Box
              pb={{ base: '160px', lg: '255px' }}
              paddingTop={{
                base: route !== '/' ? '160' : '0',
                lg: route !== '/' ? '255px' : '0',
              }}
              marginBottom={{ lg: '100vh' }}
              overflow={
                size === 'desktop'
                  ? route === '/'
                    ? 'hidden'
                    : 'visible'
                  : 'hidden'
              }
              backgroundColor="white"
              borderBottomRadius={{
                base: 'meli.md',
                md: 'meli.lg',
                lg: 'meli.xl',
              }}
              position="relative"
              zIndex="1"
            >
              {route === '/' ? (
                <GoalsContext.Provider value={handleSetGoalImg}>
                  {children}
                </GoalsContext.Provider>
              ) : (
                <>{children}</>
              )}
            </Box>
          </>
        ) : (
          <>{children}</>
        )}
      </main>
      {route !== '/404' && route !== '/500' && (
        <Footer
          copy={footer.bottom.copy}
          logo={{
            src: footer.bottom.logo.data.attributes.url,
            alt: footer.bottom.logo.data.attributes.alternativeText,
          }}
          mainLinks={{
            title: footer.title,
            navLinks: footer.items.map((item) => ({
              href: item.url,
              label: item.title,
            })),
          }}
          sideLinks={footer.rightItems.map((item) => ({
            href: item.url,
            label: item.title,
          }))}
          socialLinks={footer.bottom.socials.map((item) => ({
            href: item.url,
            media: item.name,
          }))}
        />
      )}
    </Box>
  );
};

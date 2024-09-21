import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useRouter } from 'next/router';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Heading, Box, VStack } from '@chakra-ui/react';
import { generateLocalizationsList } from '../lib/utils';
import { NextLocale, strapiNextLocaleMap } from '../lib/types/localizations';
import { HorizontalList } from '../components/lists/horizontal-list';
import { Hero } from '../components/hero/home';
import { Stakeholders } from '../components/sections/full-width/stakeholders/stakeholders';
import { CeoQuote } from '../components/sections/full-width/ceo-quote';
import { JumboText } from '../components/sections/full-width/jumbo-text';
import { OtherReports } from '../components/sections/one-col/other-reports';
import { Newsletter } from '../components/sections/one-col/newsletter/newsletter';
import { ReportCTA } from '../components/sections/one-col/report-cta';
import { Goal } from '../components/list-items/goal';
import { LatestNews } from '../components/list-items/latest-news';
import {
  getFooter,
  getHeader,
  getHome,
  getNewslatter,
  getPublicationSection,
  getBlog,
} from '../lib/api';
import { HomeDataAttributes } from '../lib/types/home';
import { PublicationSectionAttributes } from '../lib/types/publication-section';
import { NewslatterAttributes } from '../lib/types/newslatter';
import { PostAttributes } from '../lib/types/blog';
import localesMeta from '../locales/meta';
import { transformPost } from './novedades';

const Home: NextPage<
  HomeDataAttributes & {
    publicationSection: PublicationSectionAttributes;
    featuredPosts: PostAttributes[];
    newslatter: NewslatterAttributes;
  }
> = ({
  videoHero,
  stakeholders,
  ourGoals,
  giganticText,
  quoteSection,
  publicationSection,
  lastPublications,
  lastPosts,
  featuredPosts,
  newslatter,
  localizations,
}) => {
  const router = useRouter();
  const { locale } = router;

  const [bgColor, setBgColor] = useState('white');
  const [heroDisplay, setHeroDisplay] = useState('grid');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [vw, setVw] = useState(0);

  const resizeCallBack = (entries: any[]) => {
    setVw(entries[0].contentRect.width);
  };

  const handleBgColorChange = (color: string) => {
    setBgColor(color);
  };

  const handleHeroDisplayChange = (display: string) => {
    setHeroDisplay(display);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const rObserver = new ResizeObserver(resizeCallBack);
    if (section !== null) {
      rObserver?.observe(section as Element);
    }
    return () => {
      if (section) {
        rObserver?.unobserve(section as Element);
      }
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(
      '#jumbo-line-1',
      {
        //x: vw + 1000,
        left: '100%',
        xPercent: 25,
      },
      {
        //x: -vw - 1000,
        left: '0%',
        xPercent: -125,
        duration: 5,
        ease: 'none',
        repeat: -1,
        scrollTrigger: '#jumbo-line-1',
      }
    );
    gsap.fromTo(
      '#jumbo-line-2',
      {
        //x: -vw - 1000,
        left: '0%',
        xPercent: -125,
      },
      {
        //x: vw + 1000,
        left: '100%',
        xPercent: 25,
        duration: 5,
        ease: 'none',
        repeat: -1,
        scrollTrigger: '#jumbo-line-1',
      }
    );
  }, [vw, locale]);

  return (
    <>
      <NextSeo
        title="Sustentabilidad Mercado Libre"
        description={videoHero.title}
        canonical={`${process.env.NEXT_PUBLIC_URL}/${locale}`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_URL}/${locale}`,
          title: 'Sustentabilidad Mercado Libre',
          description: videoHero.title,
          images: [
            {
              url: localesMeta[locale as string].share_image,
            },
          ],
        }}
        languageAlternates={localizations?.data?.map((l) => ({
          hrefLang: strapiNextLocaleMap[l.attributes.locale],
          href: `${process.env.NEXT_PUBLIC_URL}/${
            strapiNextLocaleMap[l.attributes.locale]
          }`,
        }))}
      />
      <Hero
        {...{
          title: videoHero.title,
          btnText: videoHero.btnText,
          display: heroDisplay,
          video: videoHero.youtubeId,
        }}
      />
      <VStack
        backgroundColor={bgColor}
        position="relative"
        zIndex={10}
        marginTop="100vh"
        spacing={{ base: '160', lg: '240' }}
        transition="all 1s"
        sx={{
          '& > *': {
            width: '100%',
          },
        }}
      >
        <Stakeholders
          stakeholders={stakeholders}
          onHeroDisplayChange={handleHeroDisplayChange}
        />
        {ourGoals && (
          <Box
            minH={{ base: '60vh', lg: '80vh' }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box>
              <Heading
                as="h2"
                textTransform="uppercase"
                textAlign="center"
                fontSize={{ base: '16' }}
                lineHeight={{ base: '16' }}
                marginLeft="auto"
                marginRight="auto"
                marginBottom={{ base: '20', lg: '40' }}
                maxW="30ch"
              >
                {ourGoals.title}
              </Heading>
              <HorizontalList
                items={ourGoals.items.map(({ title, image }) => ({
                  title,
                  img: {
                    src: image.data?.attributes?.url,
                    alt: image.data?.attributes?.alternativeText,
                  },
                }))}
                resourceName="goal"
                itemComponent={Goal}
              />
            </Box>
          </Box>
        )}
        {quoteSection && (
          <CeoQuote
            title={quoteSection.bottomLinkText}
            excerpt={quoteSection.bottomText}
            onBgColorChange={handleBgColorChange}
            ceo={{
              quote: quoteSection.title,
              author: quoteSection.subTitle,
              img: quoteSection.avatar?.data?.attributes?.url,
              altImg: quoteSection.avatar?.data?.attributes?.alternativeText,
            }}
            audioSrc={quoteSection.audio?.data?.attributes?.url}
            linkToLetter={{
              href: quoteSection.buttonUrl ?? '',
              label: quoteSection.buttonText,
            }}
            linkToAboutPage={{
              href: quoteSection.bottomLinkUrl ?? '',
              label: quoteSection.bottomLinkText,
            }}
          />
        )}
        <JumboText lines={giganticText.lines ?? []} />
        <Box ref={sectionRef}>
          {publicationSection && (
            <ReportCTA
              title={publicationSection.title}
              excerpt={publicationSection.description}
              link={{
                href:
                  publicationSection.publication?.data?.attributes?.file?.data
                    ?.attributes?.url,
                label: publicationSection.btnText,
              }}
            />
          )}
          {lastPublications && (
            <OtherReports
              otherReportsTitle={lastPublications.title}
              otherReports={lastPublications.items?.data?.map(
                ({ attributes }) => ({
                  href: attributes?.file?.data?.attributes?.url,
                  label: attributes?.title,
                })
              )}
              linkToBlogPage={{
                href: '/publicaciones',
                label: lastPublications.btnText,
              }}
            />
          )}
        </Box>
        <Box>
          <Heading
            as="h2"
            textTransform="uppercase"
            textAlign="center"
            fontSize={{ base: '16' }}
            lineHeight={{ base: '16' }}
            marginLeft="auto"
            marginRight="auto"
            marginBottom={{ base: '3.25em' }}
            maxW="30ch"
          >
            {lastPosts?.title}
          </Heading>
          {featuredPosts?.length > 0 && (
            <HorizontalList
              items={featuredPosts.map((post) =>
                transformPost(post, lastPosts?.btnText)
              )}
              resourceName="news"
              itemComponent={LatestNews}
              align="start"
            />
          )}
        </Box>
        {newslatter && (
          <Newsletter
            title={newslatter.title}
            subTitle={newslatter.subTitle}
            successTitle={newslatter.success?.title}
            successMessage={newslatter.success?.excerpt}
            errorMessage={newslatter.error?.excerpt}
            nameInput={newslatter.nameInput ?? {}}
            selectInput={{
              ...(newslatter.selectInput ?? {}),
              options: newslatter.selectOptions?.map(({ value }) => value),
            }}
            emailInput={newslatter.emailInput ?? {}}
            termsInput={newslatter.termsInput ?? {}}
          />
        )}
      </VStack>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale || 'es';

  const [
    header,
    footer,
    home,
    publication,
    newslatter,
    blog,
  ] = await Promise.all([
    getHeader(locale),
    getFooter(locale),
    getHome(locale),
    getPublicationSection(locale),
    getNewslatter(locale),
    getBlog(locale),
  ]);

  // Sort publications by id
  if (home?.data?.attributes?.lastPublications?.items?.data?.length) {
    home.data.attributes.lastPublications.items.data = home.data.attributes.lastPublications.items.data.sort(
      (a, b) => a.id - b.id
    );
  }

  return {
    props: {
      layout: {
        header: header.data.attributes,
        footer: footer.data.attributes,
      },
      ...home.data.attributes,
      localizations: generateLocalizationsList('', locale as NextLocale),
      publicationSection: publication.data.attributes,
      newslatter: newslatter.data.attributes,
      featuredPosts: blog?.data?.attributes?.hero?.posts?.data?.map(
        (post) => post.attributes
      ),
    },
    revalidate: 900,
  };
};

export default Home;

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Hero } from '../../components/hero/actuacion';
import { NextSeo } from 'next-seo';
import { VStack, StackDivider, Container } from '@chakra-ui/react';
import { ImpactStories } from '../../components/sections/full-width/impact-stories';
import { OurInitiatives } from '../../components/sections/one-col/our-initiatives/our-initiatives';
import { ReportCTA } from '../../components/sections/one-col/report-cta';
import { MoreActuaciones } from '../../components/sections/full-width/more-actuaciones';
import { ActuacionDataItem } from '../../components/list-items/actuacion-data-item';
import { RegularSection } from '../../components/sections/two-col/regular-section';
import { ListsSection } from '../../components/sections/two-col/lists-section';
import {
  getHeader,
  getFooter,
  getPublicationSection,
  getStakeholders,
  getLocale,
  getStakeholderBySlug,
} from '../../lib/api';
import { PublicationSectionAttributes } from '../../lib/types/publication-section';
import { StakeholderAttributes } from '../../lib/types/stakeholders';
import { strapiNextLocaleMap } from '../../lib/types/localizations';
import { RelatedLink } from '../../components/list-items/related-link';

const Actuacion: NextPage<
  StakeholderAttributes & {
    publicationSection: PublicationSectionAttributes;
    stakeholders: StakeholderAttributes[];
  }
> = ({
  title,
  slug,
  hero,
  theme,
  image,
  actWhere,
  importantNumbers,
  quoteSlider,
  publicationSection,
  projects,
  moreStakeholders,
  stakeholders,
  localizations,
}) => {
  const router = useRouter();
  const { locale } = router;

  return (
    <>
      <NextSeo
        title={`Sustentabilidad Mercado Libre - ${title}`}
        description={`${hero?.overTitle} ${hero?.title}`}
        canonical={`${process.env.NEXT_PUBLIC_URL}/${locale}/actuacion/${slug}`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_URL}/${locale}/actuacion/${slug}`,
          title: `Sustentabilidad Mercado Libre - ${title}`,
          description: `${hero?.overTitle} ${hero?.title}`,
          images: [
            {
              url: image?.data?.attributes?.url,
            },
          ],
        }}
        languageAlternates={localizations?.data?.map((l) => ({
          hrefLang: strapiNextLocaleMap[l.attributes.locale],
          href: `${process.env.NEXT_PUBLIC_URL}/${
            strapiNextLocaleMap[l.attributes.locale]
          }/actuacion/${l.attributes.slug}`,
        }))}
      />

      <Hero
        overTitle={hero?.overTitle}
        theme={theme}
        title={hero?.title}
        img={{
          path: image?.data?.attributes?.url,
          alt: image?.data?.attributes?.alternativeText,
        }}
      />
      <Container
        maxW={{ base: 'container.mobile.lg', lg: 'container.desktop.md' }}
        marginBottom={{ base: '80', md: '160', lg: '240' }}
      >
        <VStack
          spacing={{ base: '80', md: '160', lg: '240' }}
          divider={<StackDivider borderColor="meli.lightGrey" />}
          width="100%"
        >
          {actWhere && (
            <RegularSection
              sectionTitle={actWhere.sectionTitle}
              theme={theme}
              subComponents={[
                {
                  title: actWhere.title,
                  theme,
                  paragraphs: actWhere.paragraphs?.map(
                    ({ description }) => description
                  ),
                },
                ...(actWhere.videoId && actWhere.thumb?.data
                  ? [
                      {
                        videos: [
                          {
                            img: {
                              alt:
                                actWhere.thumb?.data?.attributes
                                  ?.alternativeText,
                              src: actWhere.thumb?.data?.attributes?.url,
                            },
                            videoUrl: actWhere.videoId,
                          },
                        ],
                      },
                    ]
                  : []),
                ...(actWhere.links?.length > 0
                  ? [
                      {
                        verticalList: {
                          items: actWhere.links.map(({ href, label }) => ({
                            href,
                            label,
                          })),
                        },
                      },
                    ]
                  : []),
              ]}
              verticalListItemComponent={{
                resourceName: 'link',
                itemComponent: RelatedLink,
              }}
            />
          )}
          {importantNumbers?.length > 0 && (
            <ListsSection
              sectionTitle={importantNumbers[0].sectionTitle}
              theme={theme}
              lists={importantNumbers.map(({ numbers, image, ...header }) => ({
                listHeader: {
                  ...header,
                  img: {
                    src: image?.data?.attributes?.url,
                    alt: image?.data?.attributes?.alternativeText,
                  },
                },
                items: numbers,
              }))}
              resourceName="dataItem"
              itemComponent={ActuacionDataItem}
            />
          )}
        </VStack>
      </Container>
      <VStack spacing={{ base: '80', md: '160', lg: '240' }}>
        {quoteSlider && (
          <ImpactStories
            title={quoteSlider.title}
            theme={theme}
            stories={quoteSlider.items?.map((item) => ({
              imgs: {
                srcLarge: item.imageLarge?.data?.attributes?.url,
                srcSmall: item.imageSmall?.data?.attributes?.url,
                alt: item.imageLarge?.data?.attributes?.alternativeText,
              },
              quoteAuthor: item?.author,
              quote: item?.description,
              videoUrl: item?.videoId,
            }))}
          />
        )}
        {projects?.items && (
          <OurInitiatives
            title={projects?.sectionTitle}
            theme={theme}
            initiatives={
              projects?.items?.map((project) => ({
                title: project.title,
                img: {
                  src: project?.thumb?.data?.attributes?.url,
                  alt: project?.thumb?.data?.attributes?.alternativeText,
                },
                excerpt: project.excerpt,
                link: {
                  href: project.url ?? '',
                  label: projects?.btnText,
                },
              })) ?? []
            }
          />
        )}
        {publicationSection && (
          <ReportCTA
            title={publicationSection.title}
            excerpt={publicationSection.description}
            link={{
              href:
                publicationSection?.publication?.data?.attributes?.file?.data
                  ?.attributes?.url,
              label: publicationSection.btnText,
            }}
          />
        )}
        <MoreActuaciones
          overTitle={moreStakeholders?.overTitle}
          title={moreStakeholders?.title}
          stakeholders={stakeholders?.map((stakeholder) => ({
            title: stakeholder.title,
            theme: stakeholder.theme,
            url: `/actuacion/${stakeholder.slug}`,
            img: {
              src: stakeholder.image?.data?.attributes?.url,
              alt: stakeholder.image?.data?.attributes?.alternativeText,
            },
          }))}
        />
      </VStack>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const stakeholders = await getStakeholders(undefined, {
    fields: ['slug', 'locale'],
  });

  const paths = locales?.reduce((acc, siteLocale) => {
    const locale = getLocale(siteLocale);

    if (!locale) return acc;

    stakeholders.data
      .filter(({ attributes }) => {
        return attributes.locale === locale;
      })
      .map(({ attributes }) =>
        acc.push({ params: { id: attributes.slug }, locale: siteLocale })
      );

    return acc;
  }, [] as any);

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale || 'es';
  const { id } = context.params ?? {};
  const [
    header,
    footer,
    publication,
    stakeholder,
    moreStakeholders,
  ] = await Promise.all([
    getHeader(locale),
    getFooter(locale),
    getPublicationSection(locale),
    getStakeholderBySlug(locale, id as string),
    getStakeholders(locale, {
      fields: ['title', 'slug', 'theme'],
      populate: {
        image: {
          fields: ['url', 'alternativeText'],
        },
      },
      filters: {
        slug: {
          $ne: id,
        },
      },
    }),
  ]);

  return {
    props: {
      layout: {
        header: header.data.attributes,
        footer: footer.data.attributes,
      },
      ...stakeholder.data.attributes,
      localizationBase: '/actuacion/',
      publicationSection: publication.data.attributes,
      stakeholders: moreStakeholders.data.map(({ attributes }) => attributes),
    },
    revalidate: 900,
  };
};

export default Actuacion;

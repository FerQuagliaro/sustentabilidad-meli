import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { VStack, StackDivider } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { Hero } from '../../components/hero/iniciativa';
import { Testimonial } from '../../components/sections/full-width/testimonial';
import { MoreInitiatives } from '../../components/sections/one-col/more-initiatives';
import { RegularSection } from '../../components/sections/two-col/regular-section';
import { TableSection } from '../../components/sections/one-col/table-section';
import {
  getHeader,
  getFooter,
  getProject,
  getProjects,
  getLocale,
  getStakeholders,
} from '../../lib/api';
import { ProjectAttributes } from '../../lib/types/projects';
import { strapiNextLocaleMap } from '../../lib/types/localizations';
import { InitiativeCTA } from '../../components/sections/one-col/initiative-cta';
import { getComponents } from '../../lib/dynamic-sections';
import { ProjectItem } from '../../lib/types/stakeholders';

const Iniciativa: NextPage<ProjectAttributes & { projects: ProjectItem[] }> = ({
  title,
  slug,
  hero,
  sections,
  moreProjects,
  projects,
  localizations,
}) => {
  const router = useRouter();
  const { locale } = router;
  return (
    <>
      <NextSeo
        title={`Sustentabilidad Mercado Libre - ${title}`}
        description={`${hero.title ? `${hero.title} ` : ''}${title}`}
        canonical={`${process.env.NEXT_PUBLIC_URL}/${locale}/iniciativas/${slug}`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_URL}/${locale}/iniciativas/${slug}`,
          title: `Sustentabilidad Mercado Libre - ${title}`,
          description: `${hero.title ? `${hero.title} ` : ''}${title}`,
          images: hero?.image?.data?.attributes?.url
            ? [
                {
                  url: hero?.image?.data?.attributes?.url,
                },
              ]
            : undefined,
        }}
        languageAlternates={localizations?.data?.map((l) => ({
          hrefLang: strapiNextLocaleMap[l.attributes.locale],
          href: `${process.env.NEXT_PUBLIC_URL}/${
            strapiNextLocaleMap[l.attributes.locale]
          }/iniciativas/${l.attributes.slug}`,
        }))}
      />

      {hero && (
        <Hero
          overTitle={hero.title ? `*${hero.title}*` : ''}
          title={title}
          img={{
            src: hero.image?.data?.attributes?.url,
            alt: hero.image?.data?.attributes?.alternativeText,
          }}
          video={hero.videoId}
        />
      )}
      <VStack
        my={{ base: '80', md: '160', lg: '240' }}
        spacing={{ base: '80', md: '160', lg: '240' }}
        alignItems="center"
        justifyContent="center"
        divider={
          <StackDivider
            w={{ base: 'container.mobile.lg', lg: 'container.desktop.lg' }}
            mx="auto !important"
            borderColor="meli.lightGrey"
          />
        }
        width="100%"
      >
        {sections.map((section) => {
          switch (section.__component) {
            case 'projects.quote':
              return (
                <Testimonial
                  key={`${section.id}${section.__component}`}
                  img={{
                    src: section.image?.data?.attributes?.url ?? '',
                    alt: section.image?.data?.attributes?.alternativeText ?? '',
                  }}
                  quote={section.description ?? ''}
                  author={section.author}
                  country={section.bottomText}
                />
              );
            case 'projects.tables-section':
              return (
                <TableSection
                  sectionTitle={section.name}
                  key={`${section.id}${section.__component}`}
                  tables={section.tables?.map((table) => ({
                    title: table.title,
                    heads: table.content?.heads ?? [],
                    rows:
                      table.content?.rows?.map((row) => ({
                        head: row.head ?? '',
                        cells: row.cells ?? [],
                      })) ?? [],
                  }))}
                />
              );
            case 'projects.cta-section':
              return (
                <InitiativeCTA
                  key={`${section.id}${section.__component}`}
                  title={section.name}
                  link={{
                    href: section.cta?.href ?? '',
                    label: section.cta?.label ?? '',
                  }}
                />
              );
            default:
              const sub = section.components
                ? getComponents(section.components, 'projects')
                : [];
              return (
                <RegularSection
                  key={`${section.id}${section.__component}`}
                  sectionTitle={section.name}
                  subComponents={sub}
                />
              );
          }
        })}
      </VStack>

      <MoreInitiatives
        overTitle={moreProjects?.overTitle}
        title={moreProjects?.title}
        initiatives={projects?.map((project) => ({
          img: {
            src: project.thumb?.data?.attributes?.url,
            alt: project.thumb?.data?.attributes?.alternativeText,
          },
          title: project.title,
          link: project.url ?? '',
        }))}
      />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const projects = await getProjects(undefined, {
    fields: ['slug', 'locale'],
  });

  const paths = locales?.reduce((acc, siteLocale) => {
    const locale = getLocale(siteLocale);

    if (!locale) return acc;

    projects.data
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
  const { id } = context.params || {};

  const [header, footer, project] = await Promise.all([
    getHeader(locale),
    getFooter(locale),
    getProject(locale, id as string),
  ]);

  const stakeholders = await getStakeholders(locale, {
    filters: {
      id: {
        $eq: project.data.attributes.stakeholder.data.id,
      },
    },
    fields: [],
    populate: {
      projects: {
        populate: {
          items: {
            populate: {
              thumb: {
                fields: ['url', 'width', 'height', 'alternativeText'],
              },
            },
          },
        },
      },
    },
  });

  const projects =
    stakeholders.data[0]?.attributes.projects?.items?.filter(
      (item) => !item.url.includes(`iniciativas/${id}`)
    ) ?? [];

  return {
    props: {
      layout: {
        header: header.data.attributes,
        footer: footer.data.attributes,
      },
      ...project?.data?.attributes,
      localizationBase: '/iniciativas/',
      projects,
    },
    revalidate: 900,
  };
};

export default Iniciativa;

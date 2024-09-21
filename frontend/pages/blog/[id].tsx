import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { Container, VStack } from '@chakra-ui/react';
import { Hero } from '../../components/hero/blog';
import { Testimonial } from '../../components/sections/full-width/testimonial';
import { RegularBlogSection } from '../../components/sections/one-col/regular-blog-section';

import {
  getHeader,
  getFooter,
  getPublicationSection,
  getLocale,
  getPostBySlug,
  getPostsPath,
  getRelatedPosts,
} from '../../lib/api';
import { PublicationSectionAttributes } from '../../lib/types/publication-section';
import { ReportCTA } from '../../components/sections/one-col/report-cta';
import { PostAttributes } from '../../lib/types/blog';
import { strapiNextLocaleMap } from '../../lib/types/localizations';
import { getComponents } from '../../lib/dynamic-sections';
import { VerticalList } from '../../components/lists/vertical-list';
import { LatestNewsResult } from '../../components/list-items/search-latest-news';
import { transformPost } from '../novedades';

const BlogPost: NextPage<
  PostAttributes & {
    publicationSection: PublicationSectionAttributes;
    posts: PostAttributes[];
  }
> = ({
  title,
  slug,
  hero,
  sections,
  posts,
  publicationSection,
  localizations,
}) => {
  const router = useRouter();
  const { locale } = router;

  return (
    <>
      <NextSeo
        title={`Sustentabilidad Mercado Libre - ${title}`}
        description={hero?.excerpt}
        canonical={`${process.env.NEXT_PUBLIC_URL}/${locale}/blog/${slug}`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_URL}/${locale}/blog/${slug}`,
          title: `Sustentabilidad Mercado Libre - ${title}`,
          description: `${hero?.excerpt}`,
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
          }/blog/${l.attributes.slug}`,
        }))}
      />

      <VStack
        spacing={{ base: '160', lg: '240' }}
        sx={{
          '& > *': {
            width: '100%',
          },
        }}
      >
        <Hero
          overTitle={hero?.overTitle}
          title={title}
          paragraph={hero?.excerpt}
          img={{
            src: hero?.image?.data?.attributes?.url,
            alt: hero?.image?.data?.attributes?.alternativeText,
          }}
        />

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
            default:
              const sub = section.components
                ? getComponents(section.components, 'blog')
                : [];
              return (
                <RegularBlogSection
                  key={`${section.id}${section.__component}`}
                  sectionTitle={section.name}
                  subComponents={sub}
                />
              );
          }
        })}

        {posts && (
          <Container
            maxW={{ base: 'container.mobile.lg', lg: 'container.desktop.md' }}
            centerContent
          >
            <VerticalList
              items={posts?.map((post) => transformPost(post))}
              resourceName="news"
              itemComponent={LatestNewsResult}
              spacing={{ base: '10px', lg: '40' }}
              divider
            />
          </Container>
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
      </VStack>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const posts = await getPostsPath();

  const paths = locales?.reduce((acc, siteLocale) => {
    const locale = getLocale(siteLocale);

    if (!locale) return acc;

    posts.data
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

  const [header, footer, publication, post, posts] = await Promise.all([
    getHeader(locale),
    getFooter(locale),
    getPublicationSection(locale),
    getPostBySlug(locale, id as string),
    getRelatedPosts(locale, id as string),
  ]);

  return {
    props: {
      layout: {
        header: header.data.attributes,
        footer: footer.data.attributes,
      },
      ...post.data.attributes,
      localizationBase: '/blog/',
      posts: posts?.data?.map((post) => post.attributes),
      publicationSection: publication.data.attributes,
    },
    revalidate: 900,
  };
};

export default BlogPost;

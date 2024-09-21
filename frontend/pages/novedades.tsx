import { useEffect, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { Box, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import format from 'date-fns/format';
import { generateLocalizationsList } from '../lib/utils';
import { NextLocale, strapiNextLocaleMap } from '../lib/types/localizations';
import { Hero } from '../components/hero/novedades-publicaciones';
import { HorizontalList } from '../components/lists/horizontal-list';
import { LatestNews } from '../components/list-items/latest-news';
import { Search } from '../components/sections/one-col/search/search';
import { LatestNewsResult } from '../components/list-items/search-latest-news';
import { ReportCTA } from '../components/sections/one-col/report-cta';
import {
  getBlog,
  getFooter,
  getHeader,
  getPosts,
  getPublicationSection,
} from '../lib/api';
import { BlogDataAttributes, PostAttributes, Posts } from '../lib/types/blog';
import { PublicationSectionAttributes } from '../lib/types/publication-section';
import localesMeta from '../locales/meta';

export const transformPost = (post: PostAttributes, btnText?: string) => ({
  title: post?.title,
  img: post?.thumb?.data?.attributes?.url,
  imgAlt: post?.thumb?.data?.attributes?.alternativeText,
  postDate: format(new Date(post.postDate || post.createdAt), 'dd-MM-yyyy'),
  excerpt: post?.hero?.excerpt,
  linkToArticle: {
    href: `/blog/${post?.slug}`,
    label: btnText,
  },
});

const Novedades: NextPage<
  BlogDataAttributes & {
    publicationSection: PublicationSectionAttributes;
    posts: Posts;
  }
> = ({ hero, search, posts, publicationSection, localizations }) => {
  const router = useRouter();
  const { locale } = router;
  const [tagId, setTagId] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [data, setData] = useState(posts.data ?? []);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(posts.meta.pagination.total);
  const [page, setPage] = useState(1);

  const [loading, showLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetch() {
      showLoading(true);

      try {
        const posts = await getPosts(router.locale, {
          title: searchInput,
        });
        setPage(1);
        setTotal(posts.meta.pagination.total);
        setData(posts.data);

        showLoading(false);
      } catch (e) {
        showLoading(false);
      }
    }
    fetch();
  }, [router.locale, searchInput, tagId]);

  const loadMore = async () => {
    showLoading(true);

    const newPage = page + 1;

    try {
      const publications = await getPosts(router.locale, {
        title: searchInput,
        cursor: newPage,
      });
      setPage(newPage);
      setData((prevData) => [...prevData, ...(publications.data ?? [])]);
      showLoading(false);
    } catch (e) {
      showLoading(false);
    }
  };
  useEffect(() => {
    setHasMore(total > data.length ? true : false);
  }, [data, total]);

  return (
    <>
      <NextSeo
        title={`Sustentabilidad Mercado Libre - ${hero?.title}`}
        description={hero?.excerpt?.replace(/\*|_/g, '')}
        canonical={`${process.env.NEXT_PUBLIC_URL}/${locale}/novedades`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_URL}/novedades`,
          title: `Sustentabilidad Mercado Libre - ${hero?.title}`,
          description: hero?.excerpt?.replace(/\*|_/g, ''),
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
          }/novedades`,
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
        <Box as="header">
          <Hero title={hero?.title} paragraph={hero?.excerpt} />
          {hero?.posts?.data.length > 0 && (
            <Box overflow="hidden">
              <HorizontalList
                items={hero.posts.data.map((post) =>
                  transformPost(post.attributes, hero?.btnText)
                )}
                resourceName="news"
                itemComponent={LatestNews}
                align="start"
              />
            </Box>
          )}
        </Box>
        <Search
          title={search?.title}
          placeholder={search?.placeholder}
          btnText={search?.btnText}
          results={data?.map((post) => transformPost(post.attributes))}
          resultComponent={LatestNewsResult}
          resourceName="news"
          search={searchInput}
          filter={tagId}
          handleSearch={(title) => setSearchInput(title)}
          handleFilter={(tagId) => setTagId(tagId)}
          resetSearch={() => setSearchInput('')}
          loadMore={loadMore}
          hasMore={hasMore}
          loading={loading}
        />
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
      </VStack>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale || 'es';

  const [header, footer, publication, blog] = await Promise.all([
    getHeader(locale),
    getFooter(locale),
    getPublicationSection(locale),
    getBlog(locale),
  ]);

  // const postsIds =
  //   blog?.data?.attributes?.hero?.posts?.data?.map((posts) => posts.id) ?? [];

  const posts = await getPosts(locale);

  return {
    props: {
      layout: {
        header: header.data.attributes,
        footer: footer.data.attributes,
      },
      ...blog.data.attributes,
      localizations: generateLocalizationsList(
        '/novedades',
        locale as NextLocale
      ),
      posts,
      publicationSection: publication.data.attributes,
    },
    revalidate: 900,
  };
};

export default Novedades;

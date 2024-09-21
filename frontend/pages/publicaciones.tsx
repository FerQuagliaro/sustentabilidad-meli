import { useEffect, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { Box, VStack } from '@chakra-ui/react';
import { generateLocalizationsList } from '../lib/utils';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { NextLocale, strapiNextLocaleMap } from '../lib/types/localizations';
import { Hero } from '../components/hero/novedades-publicaciones';
import { FeaturedPublications } from '../components/sections/full-width/featured-publications';
import { ReportCTA } from '../components/sections/one-col/report-cta';
import { Search } from '../components/sections/one-col/search/search';
import { PublicationResult } from '../components/list-items/search-publications';
import {
  getFooter,
  getHeader,
  getPublicationPage,
  getPublicationSection,
  getPublicationTags,
  searchPublications,
} from '../lib/api';
import {
  PublicationPageAttributes,
  Publications,
  TagAttributes,
} from '../lib/types/publication';
import { PublicationSectionAttributes } from '../lib/types/publication-section';
import localesMeta from '../locales/meta';

const Publicaciones: NextPage<
  PublicationPageAttributes & {
    publicationSection: PublicationSectionAttributes;
    tags: TagAttributes[];
    publications: Publications;
  }
> = ({
  hero,
  publicationSection,
  featured,
  search,
  tags,
  publications,
  localizations,
}) => {
  const router = useRouter();
  const { locale } = router;
  const [tagId, setTagId] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [data, setData] = useState(publications.data ?? []);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(publications.meta.pagination.total);
  const [page, setPage] = useState(1);
  const colours = ['#14C7AA', '#3483FA', '#2D3277'];

  const [loading, showLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetch() {
      showLoading(true);

      try {
        const publications = await searchPublications(router.locale, {
          title: searchInput,
          tagId,
        });
        setPage(1);
        setTotal(publications.meta.pagination.total);
        setData(publications.data);

        showLoading(false);
      } catch (e) {
        showLoading(false);
      }
    }
    fetch();
  }, [searchInput, tagId]);

  const loadMore = async () => {
    showLoading(true);

    const newPage = page + 1;

    try {
      const publications = await searchPublications(router.locale, {
        title: searchInput,
        tagId,
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
        canonical={`${process.env.NEXT_PUBLIC_URL}/${locale}/publicaciones`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_URL}/${locale}/publicaciones`,
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
          }/publicaciones`,
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
          <ReportCTA
            title={publicationSection?.publication?.data?.attributes?.title}
            link={{
              href:
                publicationSection?.publication?.data?.attributes.file.data
                  .attributes.url,
              label: publicationSection?.btnText,
            }}
          />
        </Box>
        <FeaturedPublications
          title={featured?.title}
          publications={featured?.publications?.data?.map((publi, index) => ({
            tag: publi.attributes?.tag?.data?.attributes?.name,
            title: publi.attributes?.title,
            color: colours[index % colours.length],
            link: {
              url: publi.attributes?.file?.data?.attributes?.url,
              label: featured?.btnText,
            },
          }))}
        />

        <Search
          title={search?.title}
          placeholder={search?.placeholder}
          filters={tags.map((tag) => ({
            id: tag.id,
            name: tag.attributes.name,
          }))}
          resultComponent={PublicationResult}
          search={searchInput}
          filter={tagId}
          handleSearch={(title) => setSearchInput(title)}
          handleFilter={(tagId) => setTagId(tagId)}
          resetSearch={() => setSearchInput('')}
          loadMore={loadMore}
          hasMore={hasMore}
          results={data?.map((publication) => ({
            img: {
              src: publication.attributes?.thumb?.data?.attributes?.url,
              alt:
                publication.attributes?.thumb?.data?.attributes
                  ?.alternativeText,
            },
            text: publication.attributes?.title,
            tag: publication.attributes?.tag?.data?.attributes?.name,
            link: {
              url: publication.attributes?.file?.data?.attributes?.url ?? '',
            },
          }))}
          resourceName="publication"
          btnText={search.btnText}
          loading={loading}
        />
      </VStack>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale || 'es';

  const [
    header,
    footer,
    publication,
    publicationPage,
    tags,
    publications,
  ] = await Promise.all([
    getHeader(locale),
    getFooter(locale),
    getPublicationSection(locale),
    getPublicationPage(locale),
    getPublicationTags(locale),
    searchPublications(locale),
  ]);

  return {
    props: {
      layout: {
        header: header.data.attributes,
        footer: footer.data.attributes,
      },
      ...publicationPage.data.attributes,
      localizations: generateLocalizationsList(
        '/publicaciones',
        locale as NextLocale
      ),
      tags: tags?.data ?? [],
      publicationSection: publication.data.attributes,
      publications,
    },
    revalidate: 900,
  };
};

export default Publicaciones;

import qs from 'qs';
import { Home } from './types/home';
import { PublicationSection } from './types/publication-section';
import { Header } from './types/header';
import { Footer } from './types/footer';
import { Newslatter } from './types/newslatter';
import { Stakeholders, Stakeholder } from './types/stakeholders';
import { Project, Projects } from './types/projects';
import { Blog, Post, Posts } from './types/blog';
import { PublicationPage, Publications, Tags } from './types/publication';

enum LOCALES {
  AR = 'es-AR',
  BR = 'pt-BR',
  EN = 'en-US',
}

export const getHeader = async (siteLocale?: string): Promise<Header> => {
  const locale = getLocale(siteLocale);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/header?_locale=${locale}`
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const header = <Header>await response.json();

  return header;
};

export const getFooter = async (siteLocale?: string): Promise<Footer> => {
  const locale = getLocale(siteLocale);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/footer?_locale=${locale}`
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const footer = <Footer>await response.json();

  return footer;
};

export const getHome = async (siteLocale?: string): Promise<Home> => {
  const locale = getLocale(siteLocale);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/home-page?_locale=${locale}`
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const home = <Home>await response.json();

  return home;
};

export const getPublicationPage = async (
  siteLocale?: string
): Promise<PublicationPage> => {
  const locale = getLocale(siteLocale);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/publication-page?locale=${locale}`
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const publicationPage = <PublicationPage>await response.json();

  return publicationPage;
};

export const searchPublications = async (
  siteLocale?: string,
  query?: { title: string; tagId?: number; cursor?: number }
): Promise<Publications> => {
  const locale = siteLocale ? getLocale(siteLocale) : 'all';
  const cursor = query?.cursor ?? 1;

  const q = qs.stringify(
    {
      locale,
      populate: {
        thumb: {
          fields: ['url', 'alternativeText'],
        },
        file: {
          fields: ['url'],
        },
        tag: {
          fields: ['name'],
        },
      },
      filters: {
        ...(query?.title
          ? {
              title: {
                $containsi: query.title,
              },
            }
          : {}),
        ...(query?.tagId
          ? {
              tag: {
                id: {
                  $eq: query.tagId,
                },
              },
            }
          : {}),
      },
      pagination: {
        page: cursor,
        pageSize: 5,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/publications?${q}`
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const publications = <Publications>await response.json();

  return publications;
};

export const getPublicationTags = async (
  siteLocale?: string
): Promise<Tags> => {
  const locale = siteLocale ? getLocale(siteLocale) : 'all';

  const q = qs.stringify(
    {
      locale,
      fields: ['name'],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/publication-tags?${q}`
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const tags = <Tags>await response.json();

  return tags;
};

export const getPublicationSection = async (
  siteLocale?: string
): Promise<PublicationSection> => {
  const locale = getLocale(siteLocale);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/publication-section?_locale=${locale}`
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const publicationSection = <PublicationSection>await response.json();

  return publicationSection;
};

export const getNewslatter = async (
  siteLocale?: string
): Promise<Newslatter> => {
  const locale = getLocale(siteLocale);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/newslatter?_locale=${locale}`
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const newslatter = <Newslatter>await response.json();

  return newslatter;
};

export const getStakeholders = async (
  siteLocale?: string,
  query?: any
): Promise<Stakeholders> => {
  const locale = siteLocale ? getLocale(siteLocale) : 'all';

  const q = qs.stringify(
    {
      locale,
      ...query,
    },
    {
      encodeValuesOnly: true,
    }
  );
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/stakeholders?${q}`
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const stakeholders = <Stakeholders>await response.json();

  return stakeholders;
};

export const getStakeholderBySlug = async (
  siteLocale: string,
  slug?: string
): Promise<Stakeholder> => {
  const locale = getLocale(siteLocale);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/stakeholders/slug/${slug}?_locale=${locale}`
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const stakeholder = <Stakeholder>await response.json();

  return stakeholder;
};

export const getProject = async (
  siteLocale: string,
  slug: string
): Promise<Project> => {
  const locale = getLocale(siteLocale);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects/slug/${slug}?locale=${locale}`
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const project = <Project>await response.json();

  return project;
};

export const getProjects = async (
  siteLocale?: string,
  query?: any
): Promise<Projects> => {
  const locale = siteLocale ? getLocale(siteLocale) : 'all';

  const q = qs.stringify(
    {
      locale,
      pagination: {
        limit: -1,
      },
      ...query,
    },
    {
      encodeValuesOnly: true,
    }
  );
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects?${q}`
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const projects = <Projects>await response.json();

  return projects;
};

export const getBlog = async (siteLocale?: string): Promise<Blog> => {
  const locale = getLocale(siteLocale);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog-page?locale=${locale}`
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const blog = <Blog>await response.json();

  return blog;
};

export const getPostsPath = async (): Promise<Posts> => {
  const q = qs.stringify(
    {
      locale: 'all',
      fields: ['slug', 'locale'],
      pagination: {
        limit: -1,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?${q}`);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const Posts = <Posts>await response.json();

  return Posts;
};

export const getPosts = async (
  siteLocale?: string,
  query?: any
): Promise<Posts> => {
  const locale = siteLocale ? getLocale(siteLocale) : 'all';
  const cursor = query?.cursor ?? 1;

  const q = qs.stringify(
    {
      locale,
      populate: {
        thumb: {
          fields: ['url', 'alternativeText'],
        },
        hero: {
          fields: ['excerpt'],
        },
      },
      filters: {
        ...(query?.title
          ? {
              title: {
                $containsi: query.title,
              },
            }
          : {}),
      },
      pagination: {
        page: cursor,
        pageSize: 5,
      },
      sort: ['postDate:desc'],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?${q}`);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const Posts = <Posts>await response.json();

  return Posts;
};

export const getRelatedPosts = async (
  siteLocale: string,
  postId: string
): Promise<Posts> => {
  const locale = getLocale(siteLocale);

  const q = qs.stringify(
    {
      locale,
      filters: {
        slug: {
          $ne: [postId],
        },
      },
      fields: ['title', 'slug', 'createdAt', 'postDate'],
      populate: {
        thumb: {
          fields: ['url', 'alternativeText'],
        },
      },
      pagination: {
        pageSize: 5,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?${q}`);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const Posts = <Posts>await response.json();

  return Posts;
};

export const getPostBySlug = async (
  siteLocale: string,
  slug?: string
): Promise<Post> => {
  const locale = getLocale(siteLocale);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/slug/${slug}?locale=${locale}`
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const post = <Post>await response.json();

  return post;
};

export const getLocale = (locale?: string) => {
  switch (locale) {
    case 'pt':
      return LOCALES.BR;
    case 'es':
      return LOCALES.AR;
    case 'en':
      return LOCALES.EN;
  }
};

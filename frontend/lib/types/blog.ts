import { Image } from './home';
import { Localizations } from './localizations';

export type Blog = {
  data: BlogData;
};
export type BlogData = {
  id: number;
  attributes: BlogDataAttributes;
};

export type BlogDataAttributes = {
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: string;
  hero: {
    title: string;
    excerpt: string;
    posts: Posts;
    btnText: string;
  };
  search: {
    title: string;
    placeholder: string;
    btnText: string;
  };
  localizations: Localizations;
};

export type Post = {
  data: {
    id: number;
    attributes: PostAttributes;
  };
};

export type Posts = {
  data: Array<{
    id: number;
    attributes: PostAttributes;
  }>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type PostAttributes = {
  title: string;
  slug: string;
  createdAt: Date;
  locale: string;
  postDate: Date;
  hero: {
    id: number;
    overTitle: string;
    excerpt: string;
    image: Image;
  };
  sections: Array<{
    id: number;
    __component: string;
    name?: string;
    description?: string;
    image?: Image;
    components?: BlogComponent[];
    bottomText?: string;
    author?: string;
  }>;
  thumb: Image;
  localizations: Localizations;
};

export type BlogComponent = {
  id: number;
  __component: string;
  title?: string;
  paragraphs?: Array<{
    id: number;
    description: string;
  }>;
  logo?: Image;
  items?: Array<{
    id: number;
    title: string;
    description: any;
  }>;
  links?: Array<Link>;
  images?: {
    data: Array<{
      id: number;
      attributes: {
        alternativeText: string;
        width: number;
        height: number;
        url: string;
      };
    }>;
  };
};

type Link = {
  id: number;
  href: string;
  label: string;
  target: string;
  isExternal: boolean;
};

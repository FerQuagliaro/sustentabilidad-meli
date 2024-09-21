import { Localizations } from './localizations';
import { Image } from './home';

export type PublicationPage = {
  data: {
    id: number;
    attributes: PublicationPageAttributes;
  };
};

export type PublicationPageAttributes = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  hero: {
    id: number;
    title: string;
    excerpt: string;
  };
  featured: {
    id: number;
    title: string;
    btnText: string;
    publications: {
      data: Array<{
        id: number;
        attributes: PublicationAttributes;
      }>;
    };
  };
  search: {
    id: number;
    title: string;
    placeholder: string;
    btnText: string;
  };
  localizations: Localizations;
};

export type Publications = {
  data: Array<{
    id: number;
    attributes: PublicationAttributes;
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

export type PublicationAttributes = {
  title: string;
  thumb: Image;
  file: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  tag: Tag;
};

export type Tags = {
  data: TagAttributes[];
};

export type Tag = {
  data: TagAttributes;
};

export type TagAttributes = {
  id: number;
  attributes: {
    name: string;
  };
};

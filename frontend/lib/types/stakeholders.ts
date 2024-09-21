import { Image } from './home';
import { Localizations } from './localizations';

export type Stakeholders = {
  data: Array<{
    id: number;
    attributes: StakeholderAttributes;
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

export type Stakeholder = {
  data: {
    id: number;
    attributes: StakeholderAttributes;
  };
  meta: {};
};

export type StakeholderAttributes = {
  title: string;
  overTitle: string;
  slug: string;
  description: any;
  image: Image;
  theme: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  hero: {
    overTitle: string;
    title: string;
  };
  actWhere: {
    id: number;
    title: string;
    sectionTitle: string;
    links: Array<{
      id: number;
      href: string;
      label: string;
      target: string;
      isExternal: boolean;
    }>;
    paragraphs: Array<{
      id: number;
      description: string;
    }>;
    videoId: string;
    thumb: Image;
  };
  importantNumbers: Array<{
    id: number;
    title: string;
    sectionTitle: string;
    excerpt: string;
    image: Image;
    numbers: Array<{
      title: string;
      excerpt: string;
      icon: string;
    }>;
  }>;
  quoteSlider: {
    title: string;
    items: Array<{
      id: number;
      description: string;
      author: string;
      imageLarge: Image;
      imageSmall: Image;
      videoId?: string;
    }>;
  };
  projectsTitle: string;
  projects: {
    sectionTitle: string;
    btnText: string;
    items: Array<ProjectItem>;
  };
  moreStakeholders: {
    overTitle: string;
    title: string;
  };
  localizations: Localizations;
};

export type ProjectItem = {
  title: string;
  excerpt: string;
  url: string;
  thumb: Image;
};

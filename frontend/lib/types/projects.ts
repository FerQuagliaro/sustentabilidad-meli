import { Section } from '../dynamic-sections';
import { Localizations } from './localizations';
import { Image } from './home';

export type Project = {
  data: {
    id: number;
    attributes: ProjectAttributes;
  };
};

export type Projects = {
  data: {
    id: number;
    attributes: ProjectAttributes;
  }[];
};

export type ProjectAttributes = {
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  thumb: Image;
  stakeholder: {
    data: {
      id: number;
      attributes: {};
    };
  };
  hero: {
    id: number;
    title: string;
    image: Image;
    videoId: string;
  };
  sections: Array<Section>;
  moreProjects: {
    overTitle: string;
    title: string;
  };
  localizations: Localizations;
};

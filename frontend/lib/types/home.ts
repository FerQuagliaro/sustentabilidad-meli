import { Localizations } from './localizations';

export interface Home {
  data: HomeData;
}
export interface HomeData {
  id: number;
  attributes: HomeDataAttributes;
}

export interface HomeDataAttributes {
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: string;
  videoHero: VideoHero;
  stakeholders: Stakeholder[];
  ourGoals: OurGoals;
  quoteSection: QuoteSection;
  giganticText: GiganticText;
  lastPublications: LastPublications;
  lastPosts: LastPosts;
  localizations: Localizations;
}

export interface GiganticText {
  id: number;
  lines: Line[];
}

export interface Line {
  id: number;
  text: string;
  distance: string;
}

export interface OurGoals {
  id: number;
  title: string;
  items: OurGoalsItem[];
}

export interface OurGoalsItem {
  id: number;
  title: string;
  image: Image;
}

export interface QuoteSection {
  id: number;
  title: string;
  subTitle: string;
  buttonText: string;
  buttonUrl: string;
  bottomText: string;
  bottomLinkText: string;
  bottomLinkUrl: string;
  audio: Audio;
  avatar: Image;
}

export interface Audio {
  data: {
    attributes: {
      url: string;
      ext: string;
      mime: string;
      size: number;
    };
  };
}

export interface Stakeholder {
  id: number;
  overTitle: string;
  description: string;
  btnText: string;
  related: {
    data: {
      id: number;
      attributes: {
        title: string;
        slug: string;
        theme: string;
        image: Image;
        hero: {
          overTitle: String;
          title: string;
        };
      };
    };
  };
  items: StakeholderItem[];
  featuredProjectsTitle: string;
  projects: {
    label: string;
    url: string;
  }[];
}

export interface StakeholderItem {
  desc: string;
  bigNumber: string;
}

export interface VideoHero {
  id: number;
  youtubeId?: string;
  video: Audio;
  title: string;
  btnText: string;
}

export interface Image {
  data: {
    attributes: {
      url: string;
      width: number;
      height: number;
      alternativeText: string;
    };
  };
}

export interface LastPublications {
  id: number;
  title: string;
  btnText: string;
  items: {
    data: {
      id: number;
      attributes: {
        title: string;
        file: {
          data: {
            attributes: {
              url: string;
            };
          };
        };
      };
    }[];
  };
}

export interface LastPosts {
  title: string;
  btnText: string;
}

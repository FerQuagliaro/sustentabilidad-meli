import { Image } from './home';

export interface Footer {
  data: {
    id: number;
    attributes: FooterAttributes;
  };
}

export interface FooterItem {
  id: number;
  title: string;
  url: string;
}

export interface FooterAttributes {
  title: string;
  items: FooterItem[];
  rightItems: FooterItem[];
  bottom: {
    id: number;
    copy: string;
    logo: Image;
    socials: Array<{
      id: number;
      name: string;
      url: string;
    }>;
    items: FooterItem[];
  };
}

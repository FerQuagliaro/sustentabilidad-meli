import { Image } from './home';

export interface Header {
  data: {
    attributes: HeaderAttributes;
  };
}

export interface HeaderAttributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  logo: Image;
  navbar: Navbar[];
  btnDownload: {
    text: string;
    file: {
      data: { attributes: { url: string } };
    };
  };
}

export interface Navbar {
  id: number;
  title: string;
  url?: string;
  subTitle: string;
  items: Item[];
}
export interface Item {
  id: number;
  title: string;
  url: string;
}

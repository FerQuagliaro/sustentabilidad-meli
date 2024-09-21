import { BigNumberAndText } from '../components/list-items/big-number-and-text';
import { BigYellowNumberAndText } from '../components/list-items/big-yellow-number-and-text';
import { CollapseItem } from '../components/list-items/collapse-item';
import { CountryCard } from '../components/list-items/country-card';
import { RelatedLink } from '../components/list-items/related-link';
import { Image } from './types/home';

const getStandardSection = (child: Component) => ({
  title: child.title,
  paragraphs: child.paragraphs?.map(({ description }) => description) ?? [],
});

export type Section = {
  id: number;
  __component: string;
  name?: string;
  description?: string;
  image?: Image;
  cta?: Link;
  components?: Component[];
  tables?: Array<{
    id: number;
    title: string;
    content?: {
      heads?: Array<string>;
      rows?: Array<{
        head?: string;
        cells?: Array<string>;
      }>;
    };
  }>;
  bottomText?: string;
  author?: string;
};

export type Component = {
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
  cards?: Array<{
    id: number;
    label: string;
    image: Image;
    url: string;
    btnText: string;
  }>;
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

export const getComponents = (childs: Component[], type: string) => {
  return childs.map((child) => {
    switch (child.__component) {
      case 'projects.regular-section':
        return {
          ...getStandardSection(child),
          ...(child.logo?.data
            ? {
                logo: {
                  src: child.logo.data.attributes.url,
                  alt: child.logo.data.attributes.alternativeText,
                },
              }
            : {}),
        };
      case 'projects.list-section':
        return {
          ...getStandardSection(child),
          ...(child.items && child.items.length > 0
            ? {
                twoColList: {
                  items: child.items?.map((item) => ({
                    bigNumber: item.title,
                    txt: item.description,
                  })),
                },
                twoColListItemComponent: {
                  resourceName: 'data',
                  itemComponent: BigNumberAndText,
                },
              }
            : {}),
        };
      case 'projects.yellow-list-section':
        return {
          ...getStandardSection(child),
          ...(child.items && child.items.length > 0
            ? {
                verticalList: {
                  items: child.items?.map((item) => ({
                    yellowNumber: item.title,
                    excerpt: item.description,
                  })),
                  spacing: '0',
                },
                verticalListItemComponent: {
                  resourceName: 'data',
                  itemComponent: BigYellowNumberAndText,
                },
              }
            : {}),
        };
      case 'projects.related-section':
        return {
          ...getStandardSection(child),
          ...(child.links && child.links.length > 0
            ? {
                verticalList: {
                  items: child.links?.map((item) => ({
                    label: item.label,
                    href: item.href,
                  })),
                  spacing: '0',
                },
                verticalListItemComponent: {
                  resourceName: 'link',
                  itemComponent: RelatedLink,
                },
              }
            : {}),
        };
      case 'projects.slider-section':
        return {
          ...getStandardSection(child),
          ...(child.cards && child.cards.length > 0
            ? {
                horizontalList: {
                  items: child.cards?.map((card) => ({
                    label: card.label,
                    img: {
                      src: card.image?.data?.attributes?.url,
                      alt: card.image?.data?.attributes?.alternativeText,
                    },
                    url: card.url,
                    btnText: card.btnText,
                  })),
                },
                horizontalListItemComponent: {
                  resourceName: 'country',
                  itemComponent: CountryCard,
                },
              }
            : {}),
        };
      case 'projects.more-list-section':
        return {
          ...getStandardSection(child),
          ...(child.items && child.items.length > 0
            ? {
                verticalList: {
                  items: child.items?.map((item) => ({
                    title: item.title,
                    txt: item.description,
                  })),
                  spacing: '0',
                },
                verticalListItemComponent: {
                  resourceName: 'data',
                  itemComponent: CollapseItem,
                },
              }
            : {}),
        };
      case 'projects.image-section':
        return {
          images:
            child?.images?.data?.map((image) => ({
              src: image.attributes.url,
              alt: image.attributes.alternativeText,
            })) ?? [],
        };
      default:
        return;
    }
  });
};

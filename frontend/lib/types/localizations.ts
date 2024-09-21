export type NextLocale = 'es' | 'pt' | 'en';

export type StrapiLocale = 'es-AR' | 'pt-BR' | 'en-US';

export enum strapiNextLocaleMap {
  'es-AR' = 'es',
  'pt-BR' = 'pt',
  'en-US' = 'en',
}

export enum nextStrapiLocaleMap {
  es = 'es-AR',
  pt = 'pt-BR',
  en = 'en-US',
}

export interface Localizations {
  data: LocalizationsAttributes[];
}

export interface LocalizationsAttributes {
  attributes: {
    locale: StrapiLocale;
    slug: string;
  };
  id?: number;
}

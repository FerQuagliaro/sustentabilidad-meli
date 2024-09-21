import {
  NextLocale,
  StrapiLocale,
  Localizations,
  nextStrapiLocaleMap,
} from './types/localizations';

export function generateLocalizationsList(
  url: string,
  locale: NextLocale,
  langs: NextLocale[] = ['es', 'pt'] // , 'en'
): Localizations {
  return {
    data: langs
      .filter((l) => l !== locale)
      .map((l) => ({
        attributes: {
          locale: nextStrapiLocaleMap[l] as StrapiLocale,
          slug: `/${l}${url}`,
        },
      })),
  };
}

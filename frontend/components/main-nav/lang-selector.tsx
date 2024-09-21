import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Flex, Text, Box, Collapse, VStack } from '@chakra-ui/react';
import {
  LocalizationsAttributes,
  nextStrapiLocaleMap,
  NextLocale,
} from '../../lib/types/localizations';

type localesLabelsMapType = {
  [key: string]: string;
};

const localesLabelsMap: localesLabelsMapType = {
  es: 'Esp',
  en: 'Eng',
  pt: 'Por',
};

interface LangBtnProps {
  lang: NextLocale;
  localizedHref?: string;
}

const LangInnerBtn: React.FC<LangBtnProps> = (props) => {
  const { lang, localizedHref, ...inheritedProps } = props;
  return (
    <Flex
      as={localizedHref ? 'a' : 'button'}
      position="relative"
      zIndex={30}
      type="button"
      width={{ base: '57px', lg: '65px' }}
      height={{ base: '42px', lg: '50px' }}
      border="1px solid"
      borderColor="meli.black"
      backgroundColor="white"
      color="meli.black"
      borderRadius="full"
      alignItems="center"
      justifyContent="center"
      transition="all .2s"
      _hover={{
        backgroundColor: 'meli.black',
        color: 'white',
      }}
      {...inheritedProps}
    >
      <Text fontSize="16" color="inherit">
        {localesLabelsMap[lang]}
      </Text>
    </Flex>
  );
};

const LangBtn: React.FC<LangBtnProps> = ({ lang, localizedHref }) => {
  return localizedHref ? (
    <Link href={localizedHref} passHref locale={lang}>
      <LangInnerBtn lang={lang} localizedHref={localizedHref} />
    </Link>
  ) : (
    <LangInnerBtn lang={lang} localizedHref={localizedHref} />
  );
};

export interface LanguageSelectorProps {
  localizations: LocalizationsAttributes[];
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  localizations,
}) => {
  const router = useRouter();
  const { locale, locales } = router;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      setIsOpen(false);
    };
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const getLocalizedLink = (lang: NextLocale) => {
    const localization = localizations?.find(
      (l) => l.attributes.locale === nextStrapiLocaleMap[lang]
    );
    return localization?.attributes?.slug || '/';
  };

  return (
    <Box
      position="relative"
      zIndex={20}
      marginLeft={{ base: '0', lg: '40' }}
      onClick={() => setIsOpen((curr) => !curr)}
    >
      <LangBtn lang={locale as NextLocale} />

      <Box position="absolute" top={'115%'}>
        <Collapse in={isOpen} animateOpacity>
          <VStack>
            {locales?.map((l) => {
              if (l !== locale) {
                return (
                  <LangBtn
                    key={l}
                    lang={l as NextLocale}
                    localizedHref={getLocalizedLink(l as NextLocale)}
                  />
                );
              }
            })}
          </VStack>
        </Collapse>
      </Box>
    </Box>
  );
};

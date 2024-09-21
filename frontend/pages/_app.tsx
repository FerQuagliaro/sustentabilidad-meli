import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import Script from 'next/script';

import SEO from '../next-seo.config';
import Fonts from '../theme/fonts';
import theme from '../theme';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { MainLayout } from '../components/layout/main-layout';
import { Loading } from '../components/loading';

function MyApp({ Component, pageProps: { layout, ...pageProps } }: AppProps) {
  const router = useRouter();
  const { events } = router;
  let timer = useRef(0);

  const [loading, showLoading] = useState(false);

  useEffect(() => {
    const handleRouteStart = (url: URL) => {
      timer.current = Date.now();
      document.documentElement.classList.add('navigating');
      showLoading(true);
    };

    const handleRouteChange = (url: URL) => {
      const timerHelper = Date.now();
      const timeout = 300 - (timerHelper - timer.current);
      const handler = () => {
        document.documentElement.classList.remove('navigating');
        showLoading(false);
      };
      if (timeout > 0) {
        return setTimeout(handler, timeout);
      }
      return handler();
    };

    events.on('routeChangeStart', handleRouteStart);
    events.on('routeChangeComplete', handleRouteChange);

    return () => {
      events.off('routeChangeStart', handleRouteStart);
      events.off('routeChangeComplete', handleRouteChange);
    };
  }, [events]);

  let localizationsData = pageProps?.localizations?.data;

  if (pageProps?.localizationBase && pageProps?.localizations?.data) {
    localizationsData = pageProps?.localizations.data.map((l: any) => ({
      attributes: {
        slug: `${pageProps?.localizationBase}${l.attributes.slug}`,
        locale: l.attributes.locale,
      },
    }));
  }

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script id="ga-analytics">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
      </Script>
      <Fonts />
      <MainLayout {...layout} localizations={localizationsData}>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.12.1/mercadolibre/180x180.png"
          />
          <link rel="icon" type="image/svg" sizes="32x32" href="/favicon.svg" />
          <link rel="icon" type="image/svg" sizes="16x16" href="/favicon.svg" />
        </Head>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
        <Loading show={loading} size="xl" variant="fullscreen" overlay />
      </MainLayout>
    </ChakraProvider>
  );
}

export default MyApp;

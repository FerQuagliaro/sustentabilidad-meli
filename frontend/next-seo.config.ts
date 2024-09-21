import { DefaultSeoProps } from 'next-seo';

const defaultSeo: DefaultSeoProps = {
  title: 'Sustentabilidad Mercado Libre',
  description:
    'Una historia que conecta a muchas. Transformamos la vida de millones de latinoamericanos, democratizando el comercio y los servicios financieros.',
  openGraph: {
    url: 'https://sustentabilidadmercadolibre.com/',
    title: 'Sustentabilidad Mercado Libre',
    description:
      'Una historia que conecta a muchas. Transformamos la vida de millones de latinoamericanos, democratizando el comercio y los servicios financieros.',
    type: 'website',
    site_name: 'Sustentabilidad Mercado Libre',
    images: [
      {
        url:
          'https://meli-sustentabilidad-bucket.s3.amazonaws.com/share_es_29647563d8.png',
      },
    ],
  },
  twitter: {
    handle: '@ML_Argentina',
    site: '@ML_Argentina',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      property: 'mobile-web-app-capable',
      content: 'yes',
    },
    {
      property: 'apple-mobile-web-app-title',
      content: 'Sustentabilidad Mercado Libre',
    },
    {
      httpEquiv: 'x-ua-compatible',
      content: 'IE=edge; chrome=1',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    },
  ],
};

export default defaultSeo;

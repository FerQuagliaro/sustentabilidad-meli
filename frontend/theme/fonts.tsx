import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    // styles={`
    //   @font-face {
    //     font-family: 'Proxima Nova';
    //     font-style: normal;
    //     font-weight: 300;
    //     src: url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-light.woff2) format('woff2'), url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-light.woff) format('woff');
    //   }
    //   @font-face {
    //     font-family: 'Proxima Nova';
    //     font-style: normal;
    //     font-weight: 400;
    //     src: url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-regular.woff2) format('woff2'), url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-regular.woff) format('woff');
    //   }
    //   @font-face {
    //     font-family: 'Proxima Nova';
    //     font-style: normal;
    //     font-weight: 500;
    //     src: url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-semibold.woff2) format('woff2'), url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-semibold.woff) format('woff');
    //   }
    //   @font-face {
    //     font-family: 'Proxima Nova';
    //     font-style: normal;
    //     font-weight: 700;
    //     src: url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-bold.woff2) format('woff2'), url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-bold.woff) format('woff');
    //   }
    //   @font-face {
    //     font-family: 'Proxima Nova';
    //     font-style: normal;
    //     font-weight: 800;
    //     src: url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-bold.woff2) format('woff2'), url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-bold.woff) format('woff');
    //   }
    //   `}
    styles={`
      @font-face {
        font-family: 'Proxima Nova';
        font-style: normal;
        font-weight: 300;
        src: url(https://meli-sustentabilidad-bucket.s3.amazonaws.com/meli-fonts/Proxima+Nova+Light.otf) format('opentype');
      }
      @font-face {
        font-family: 'Proxima Nova';
        font-style: normal;
        font-weight: 400;
        src: url(https://meli-sustentabilidad-bucket.s3.amazonaws.com/meli-fonts/Proxima+Nova+Regular.otf) format('opentype');
      }
      @font-face {
        font-family: 'Proxima Nova';
        font-style: normal;
        font-weight: 500;
        src: url(https://meli-sustentabilidad-bucket.s3.amazonaws.com/meli-fonts/Proxima+Nova+Semibold.otf) format('opentype');
      }
      @font-face {
        font-family: 'Proxima Nova';
        font-style: normal;
        font-weight: 600;
        src: url(https://meli-sustentabilidad-bucket.s3.amazonaws.com/meli-fonts/Proxima+Nova+Bold.otf) format('opentype');
      }
      @font-face {
        font-family: 'Proxima Nova';
        font-style: normal;
        font-weight: 700;
        src: url(https://meli-sustentabilidad-bucket.s3.amazonaws.com/meli-fonts/Proxima+Nova+Extrabold.otf) format('opentype');
      }
      @font-face {
        font-family: 'Proxima Nova';
        font-style: normal;
        font-weight: 800;
        src: url(https://meli-sustentabilidad-bucket.s3.amazonaws.com/meli-fonts/Proxima+Nova+Black.otf) format('opentype');
      }
      `}
  />
);

export default Fonts;

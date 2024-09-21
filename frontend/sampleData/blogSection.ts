import { RegularBlogSectionProps } from '../components/sections/one-col/regular-blog-section';

export const blogSectionDataOne: RegularBlogSectionProps = {
  sectionTitle: 'Lo hacemos posible',
  subComponents: [
    {
      title:
        'El comercio electrónico se volvió clave para que las empresas lleguen a sus clientes y sostengan a sus colaboradores en tiempos de coronavirus.',
    },
    {
      paragraphs: [
        {
          miniTitle: 'Récord',
          paragraph:
            '1, 4 millones de envíos en un solo día A pesar de las dificultades, 55% de los paquetes fueron entregados en menos de 48 horas.',
        },
        {
          miniTitle: '0% Comisiones',
          paragraph:
            'Durante marzo eliminamos las comisiones de los productos de primera necesidad. Facilitamos las ventas de productos como pañales, artículos de limpieza y alimentos no perecederos, para afrontar el avance de la pandemia.',
        },
        {
          miniTitle: 'Envíos',
          paragraph:
            'Destacamos un nuevo filtro en la plataforma para comprar y vender con normalidad. El nuevo filtro permite visibilizar los productos que se pueden enviar sin inconvenientes durante estos días.',
        },
        {
          miniTitle: 'Más oportunidades',
          paragraph:
            'Impulsamos la inclusión financiera de millones de personas en la región. Luego de la pandemia, 7 de cada 10 latinoamericanos aseguraron que seguirán realizando pagos online.',
        },
      ],
    },
  ],
};

export const blogSectionDataTwo: RegularBlogSectionProps = {
  sectionTitle: 'Motor de recuperación',
  subComponents: [
    {
      title: 'PyMEs aceleraron su reconversión tecnológica.',
    },
    {
      paragraphs: [
        {
          miniTitle: 'Créditos',
          paragraph:
            'Postergamos la fecha de cobro de nuestros créditos. Acompañamos a nuestros clientes en Argentina, Brasil y México, y los apoyamos desde el primer momento para brindarles la tranquilidad que tanto necesitaba.',
        },
        {
          miniTitle: 'Mercado Pago',
          paragraph:
            'Beneficiamos con nuestros descuentos a monotributistas y autónomos. Como un alivio frente a la crisis, decidimos ofrecer descuentos a quienes pagaron sus impuestos por primera vez con su cuenta digital.',
        },
      ],
    },
    {
      images: [
        {
          src: '/img/sample-blog-section-img.png',
          alt: 'sample blog section img',
        },
      ],
    },
    {
      title: 'Codo a codo con quienes más lo necesitan',
    },
    {
      paragraphs: [
        {
          miniTitle: 'Orientados a las comunidades',
          paragraph:
            'Pusimos nuestro ecosistema al servicio de quienes más lo necesitan. Donamos a Bancos de Alimentos y Cruz Roja.',
        },
      ],
    },
    {
      verticalList: {
        items: [
          {
            title: 'Geração de Impacto Socioambiental Positivo:',
            excerpt:
              'Geração de renda e / ou conservação da biodiversidade e de modos de vida tradicionais.',
          },
          {
            title: 'Atuação em um dos seguintes Biomas Brasileiros:',
            excerpt: 'Amazônia, Cerrado e Mata Atlântica.',
          },
          {
            title: 'Operação em andamento e constituição formal:',
            excerpt: 'Mais de 1 ano de operação + CNPJ ativo.',
          },
          {
            title: 'Produtos em estágio comercial:',
            excerpt:
              'Produto já possui embalagem, rótulo e estoque para vendas.',
          },
        ],
      },
    },
  ],
};

export const blogSectionDataThree: RegularBlogSectionProps = {
  sectionTitle: 'Links relacionados',
  subComponents: [
    {
      paragraphs: [
        {
          paragraph:
            'Si querés leer más acerca de esta iniciativa te brindamos algunos links con más información y contenido relacionado.',
        },
      ],
    },
    {
      verticalList: {
        items: [
          {
            href: '/',
            label: 'Título del Link 01',
          },
          {
            href: '/',
            label: 'Título del Link 02',
          },
        ],
      },
    },
  ],
};

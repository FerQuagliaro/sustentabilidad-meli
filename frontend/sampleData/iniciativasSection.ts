import { RegularSectionProps } from "../components/sections/two-col/regular-section";

export const iniciativasSectionOne:RegularSectionProps = {
  sectionTitle: 'Sobre la *iniciativa*',
  subComponents: [
    {
      title: 'Impactos que *importan*',
      paragraphs: [
        'Periodicamente, vamos a campo averiguar como nossos objetivos estratégicos se traduzem na prática. Fizemos isso em setembro de 2021, com a pesquisa Impactos que Importam, realizada em parceria com a Euromonitor.',
        'O estudo de impacto socioeconômico utilizou resultados concretos e tangíveis, levantados em 2019 e 2020, para avaliar como nosso ecossistema de soluções gera valor e promove um desenvolvimento inclusivo na Argentina, Brasil, Chile, Colômbia e México.',
        'Um recorte sobre os pequenos e médios empreendedores dimensionou o alcance da contribuição do Mercado Livre para a geração de empregos, crescimento econômico, inclusão financeira e transformação digital dos PMEs desses países. A pesquisa captou o efeito vigoroso do nosso ecossistema em um período em que muitas portas se fecharam.',
      ],
    },
    {
      title: 'Resiliencia financiera *das PMEs*',
      paragraphs: [
        'Junto com a Mastercard e outros parceiros, lançamos uma iniciativa para apoiar os pequenos empreendedores da América Latina na retomada de seus negócios, duramente prejudicados pela pandemia.',
        'Com previsão de dois anos, o projeto pretende difundir modelos de comportamento que favoreçam a resiliência financeira das PMEs e sua preparação  para tomar as melhores decisões.',
        'O primeiro passo será um estudo. Nossa plataforma servirá como base operacional para os pesquisadores e o projeto-piloto será feito no México.',
      ],
    },
  ],
};

export const iniciativasSectionTwo:RegularSectionProps = {
  sectionTitle: 'Más *información*',
  subComponents: [
    {
      title: 'Links relacionados',
      paragraphs: [
        'Si querés leer más acerca de esta iniciativa te brindamos algunos **links** con más información y contenido relacionado.',
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

export const iniciativasSectionThree:RegularSectionProps = {
  sectionTitle: 'Sobre las *inciativas*',
  subComponents: [
    {
      title: 'Central de Vendedores',
      paragraphs: [
        'Temos um canal totalmente dedicado à capacitação dos vendedores do Mercado Livre, a Central de Vendedores. Nesse espaço, disponibilizamos conteúdos, cursos e webinars sobre diversos temas - de educação financeira a estratégia de vendas - para que eles aprimorem seus conhecimentos sobre nossas soluções e ferramentas. O canal está atualmente disponível na Argentina, Brasil, Chile, Colômbia, México e Uruguai.'
      ]
    },
    {
      verticalList: {
        items: [
          {
            yellowNumber: 'XX',
            excerpt: 'XX empreendedores capacitados desde xxxxx'
          },
          {
            yellowNumber: 'XXXX',
            excerpt: 'xx em bolsas concedidas desde xxxx'
          },
          {
            yellowNumber: 'XXX',
            excerpt: 'US xxxx investidos'
          },
        ],
      },
    },
  ]
}

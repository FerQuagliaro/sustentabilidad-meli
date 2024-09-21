const Heading = {
  Heading: {
    baseStyle: {
      color: 'meli.black',
      fontWeight: 'bold',
    },
    sizes: {
      main: {
        fontSize: { base: '40', lg: '100' },
        lineHeight: { base: '40', lg: '100' },
      },
      section: {
        fontSize: { base: '40', lg: '70' },
        lineHeight: { base: '40', lg: '70' },
        maxW: { base: 'auto', lg: '20ch' },
      },
      blog_section: {
        fontSize: { base: '40', lg: '50' },
        lineHeight: { base: '60', lg: '50' },
      },
      blog_secTitle: {
        fontSize: { base: '22', lg: '30' },
        lineHeight: { base: '20', lg: '30' },
      },
      twoCol_section: {
        fontSize: { base: '30', lg: '40' },
        lineHeight: '60',
        width: { base: 'auto' },
      },
      twoCol_subSection: {
        fontSize: { base: '40', lg: '55' },
        lineHeight: { base: '40', lg: '55' },
      },
      twoCol_listItem: {
        fontSize: { base: '40', lg: '60' },
        lineHeight: { base: '40', lg: '60' },
      },
    },
    variants: {
      main: {
        fontWeight: 'bold',
      },
      section: {
        color: 'meli.black',
        fontWeight: 'extrabold',
        marginBottom: { base: '80', lg: '160' },
      },
      blog_section: {
        color: 'meli.black',
        fontWeight: 'extrabold',
        marginBottom: { base: '10px', lg: '0' },
      },
      blog_secTitle: {
        color: 'meli.black',
        fontWeight: 'bold',
      },
      twoCol_section: {
        color: 'meli.black',
        fontWeight: {
          base: 'normal',
          lg: 'extrabold',
        },
        marginBottom: { base: '10', md: '80', lg: '0' },
        '> span': {
          display: {
            base: 'inline !important',
            lg: 'block !important',
          },
        },
      },
      twoCol_subSection: {
        color: 'meli.black',
        fontWeight: 'semibold',
        gridColumnStart: { base: '1', lg: '2' },
        gridColumnEnd: -1,
      },
      twoCol_listItem: {
        color: 'meli.black',
        marginBottom: '20',
        fontWeight: 'extrabold',
      },
    },
  },
};

export default Heading;

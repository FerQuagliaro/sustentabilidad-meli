const Button = {
  Button: {
    baseStyle: {
      fontWeight: 'bold',
      maxW: '100%',
      lineHeigth: '20',
      textAlign: 'center',
      borderRadius: 'full',
      py: '30px',
      transition: 'all .325s',
    },
    variants: {
      blue: {
        bg: 'meli.lightBlue',
        fontSize: '20',
        color: 'white',
        px: '40px',
        _hover: {
          bg: 'meli.darkBlue',
        },
      },
      white: {
        bg: 'white',
        color: 'meli.black',
        fontSize: '20',
        lineHeigth: '20',
        px: '50px',
        _hover: {
          bg: 'meli.black',
          color: 'white',
        },
      },
      whiteBlue: {
        bg: 'white',
        fontSize: '20',
        color: 'meli.lightBlue',
        px: '50px',
        _hover: {
          bg: 'meli.darkBlue',
          color: 'white',
        },
      },
      yellow: {
        bg: 'meli.yellow',
        fontSize: '20',
        px: '50px',
        _hover: {
          bg: 'meli.darkBlue',
          color: 'white',
        },
      },
      dark: {
        bg: 'meli.black',
        color: 'white',
        fontSize: '20',
        px: '50px',
        _hover: {
          bg: 'white',
          color: 'meli.dark',
        },
      },
      outLine: {
        bg: 'white',
        fontSize: '20',
        color: 'meli.black',
        border: '1px solid',
        borderColor: 'meli.black',
        px: '50px',
        _hover: {
          bg: 'meli.black',
          color: 'white',
        },
      },
      icon: {
        px: '0px',
        py: '0px',
      },
      iconHoverWhite: {
        px: '0px',
        py: '0px',
        _hover: {
          backgroundColor: 'white',
        },
      },
      iconHoverYellow: {
        px: '0px',
        py: '0px',
        _hover: {
          backgroundColor: 'meli.yellow',
        },
      },
      player: {
        borderColor: 'meli.black',
        borderWidth: '1px',
        borderRadius: 'full',
        fontSize: 'xl',
        p: 0,
        top: 3,
        h: '2.625rem',
        w: '2.625rem',
        _hover: {
          bg: 'meli.yellow',
        },
      },
    },
    defaultProps: {
      variant: 'whiteBlue',
    },
  },
};

export default Button;

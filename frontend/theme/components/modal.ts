const Modal = {
  Modal: {
    variants: {
      video: {
        dialog: {
          boxShadow: 'none',
          maxW: 'container.desktop.lg',
        },
        overlay: {
          bg: 'white',
        },
        header: {
          pb: 6,
        },
        closeButton: {
          borderColor: 'meli.black',
          borderWidth: '1px',
          borderRadius: 'full',
          p: 0,
          top: 3,
          h: '2.625rem',
          w: '2.625rem',
          _hover: {
            bg: 'meli.yellow',
          },
        },
      },
    },
  },
};

export default Modal;

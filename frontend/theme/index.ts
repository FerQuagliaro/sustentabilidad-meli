import { extendTheme } from '@chakra-ui/react';
import styles from './styles';
import Button from './components/button';
import Container from './components/container';
import Heading from './components/heading';
import Loading from './components/loading';
import Modal from './components/modal';
import Slider from './components/slider';
import Text from './components/text';

const overrides = {
  ...styles,
  components: {
    ...Button,
    ...Container,
    ...Heading,
    ...Loading,
    ...Modal,
    ...Slider,
    ...Text,
  },
};

const theme = extendTheme(overrides);

export default theme;

import ReactMarkdown from 'react-markdown';
import { Text } from '@chakra-ui/react';

interface RichTextProps {
  txt: string;
  highLightColor?: 'white';
  emFontWeight?: 400 | 500 | 600 | 700;
  fontColor?: string;
}

export const RichText: React.FC<RichTextProps> = ({
  txt,
  highLightColor,
  emFontWeight,
  fontColor,
}) => {
  return (
    <ReactMarkdown
      // eslint-disable-next-line react/no-children-prop
      children={txt}
      unwrapDisallowed={true}
      components={{
        p: ({ node, ...props }) => (
          <span style={{ display: 'block' }} {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul style={{ paddingLeft: '20px' }} {...props} />
        ),
        em: ({ node, ...props }) => {
          return (
            <Text
              {...props}
              as="span"
              color={fontColor || 'meli.black'}
              position="relative"
              display="inline-block"
              zIndex={10}
              fontWeight={emFontWeight || 'inherit'}
              sx={{
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: '101%',
                  height: '30%',
                  bottom: '1',
                  left: '0',
                  mixBlendMode: 'color',
                  backgroundColor: highLightColor || 'meli.yellow',
                },
                strong: {
                  fontWeight: emFontWeight || 'inherit',
                },
              }}
            />
          );
        },
      }}
    />
  );
};

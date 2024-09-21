import ReactMarkdown from 'react-markdown';
import { Text, VStack, StackDivider, Box, Heading, Image } from '@chakra-ui/react';

interface RichTextProps {
  txt: string;
  highLightColor?: 'white';
  fontColor?: string;
}

export const RichText: React.FC<RichTextProps> = ({
  txt,
}) => {
  return (
    <ReactMarkdown
      // eslint-disable-next-line react/no-children-prop
      children={txt}
      unwrapDisallowed={true}
      components={{
        h2: ({ node, ...props }) => {
          return (
            <Heading
              {...props}
              as='h2'
              textAlign='left'
              fontSize={{lg: '50'}}
              lineHeight={{lg: '50'}}
              fontWeight='bold'
              />
          )
        },
        h3: ({node, ...props}) => {
          return (
            <Heading
              {...props}
              as='h3'
              textAlign='left'
              fontSize={{base: '20', lg: '30'}}
              lineHeight={{base: '20', lg: '30'}}
              fontWeight='bold'
              marginTop='20'
            />
          )
        },
        h4: ({node, ...props}) => {
          return (
            <Heading
              {...props}
              as='h3'
              textAlign='left'
              fontSize={{base: '20', lg: '20'}}
              lineHeight={{base: '20', lg: '20'}}
              fontWeight='bold'
              marginTop='20'
            />
          )
        },
        p: ({node, ...props}) => {
          return (
            <Text
              {...props}
              fontSize={{base: '18', lg: '18'}}
              lineHeight={{base: '18', lg: '18'}}
              fontWeight='regular'
            />
          )
        },
        ul: ({ node, ...props }) => {
          return (
              //@ts-ignore
              <VStack
                as='ul'
                listStyleType='none'
                alignItems='flex-start'
                spacing={{base: '10px'}}
                overflow='hidden'
                my='20'
                divider={<StackDivider transform='translateX(25px)' borderColor='#999' />}
                {...props} />
          )
        },
        li: ({node, ...props}) => {
          return (
            //@ts-ignore
            <Text
              {...props}
              as='li'
              color="meli.black"
              fontSize={{ base: '20' }}
              lineHeight={{ base: '20' }}
              fontWeight="bold"
              marginBottom={{ base: '6px' }}
              display='flex'
              alignItems='center'
              sx={{
                '&::before': {
                  content: '""',
                  backgroundColor: 'meli.yellow',
                  fontWeight: "bold",
                  display: "inline-block",
                  width: "6px",
                  height: '6px',
                  borderRadius: 'full',
                  marginRight: '20px',
                  transform: 'translateY(2px)'
                }
              }}
            />
          )
        },
        img: ({node, ...props}) => {
          return (
            <Box
              width={{lg: '715px'}}
              height={{lg: '400px'}}
              overflow='hidden'
              borderRadius='50px'
              my={{base: '20', lg: '40'}}>
              <Image
                {...props}
                width='100%'
                height='100%'
                objectFit='cover'
              />
            </Box>
          )
        },
      }}
    />
  );
};

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import {
  Grid,
  GridItem,
  Text,
  Heading,
  Image,
  Box,
  UnorderedList,
  Flex,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Projects } from './projects';
import { CircleArrowRight } from '../../../icons/circle-arrow-right';
import { DataBubble, DataBubbleProps } from './data-bubble';
import { RichText } from '../../../text/rich-text';

export interface StakeholderCard {
  theme: string;
  img: string;
  altImg: string;
  overTitle: string;
  title: string;
  excerpt: string;
  dataBubbles?: DataBubbleProps[];
  projects: {
    title: string;
    items: {
      label: string;
      href: string;
    }[];
  };
  btn: {
    href: string;
    label: string;
  };
}

interface Props {
  card: StakeholderCard;
  current: number;
  idx: number;
  onStakeholderSelect: () => void;
}

export const Card: React.FC<Props> = (props) => {
  const { current, idx, card, onStakeholderSelect } = props;
  const [cardSize, setCardSize] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const {
    title,
    overTitle,
    img,
    altImg,
    excerpt,
    btn,
    dataBubbles,
    theme,
    projects,
  } = card;

  function callBack(entries: any) {
    const entry = entries[0];
    setCardSize((entry.contentRect.height + 300) * -1);
  }

  useEffect(() => {
    const card = cardRef.current;
    const observer = new ResizeObserver(callBack);
    if (card !== null) {
      observer?.observe(card as Element);
    }
    return () => {
      if (card) {
        observer?.unobserve(card as Element);
      }
    };
  }, []);

  useEffect(() => {
    const bubbleAnim = gsap.fromTo(
      `.data-bubble-${theme}`,
      {
        y: 0,
      },
      {
        y: cardSize,
        duration: 10,
        repeat: -1,
        stagger: 3,
        delay: 1,
        ease: 'none',
      }
    );

    if (idx === current) {
      bubbleAnim.play();
    } else {
      bubbleAnim.pause();
    }

    return () => {
      bubbleAnim.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, cardSize]);

  return (
    <Flex
      position="relative"
      ref={cardRef}
      flex={{ base: '0 0 100%', lg: '0 0 100%' }}
      justifyContent="center"
      overflow="hidden"
      paddingTop={{ base: '40', lg: '0' }}
      minH={{ base: '100vh', md: '0' }}
    >
      <Box
        display={{ lg: 'none' }}
        position="absolute"
        top={0}
        left={0}
        transformOrigin="left"
        height="8px"
        width="100%"
        backgroundColor={`stakeholders.${theme}.accent`}
        transition={`transform ${idx === current ? '16s' : '0'} linear`}
        transform={idx === current ? 'scaleX(100%)' : 'scaleX(0)'}
      />
      <Flex
        position="relative"
        flexDirection="column"
        alignItems="center"
        marginTop={{ base: '0', lg: '0' }}
      >
        <Grid
          maxWidth={{
            base: 'container.mobile.md',
            md: 'container.tablet.md',
            lg: 'container.desktop.md',
          }}
          as="article"
          height="100%"
          width="100%"
          position="relative"
          gridTemplateColumns={{ base: '1fr', lg: 'repeat(4, 1fr)' }}
          gridTemplateRows={{
            base: 'auto 20px max-content 40px auto 1fr',
            md:
              'auto minmax(20px, 4vh) minmax(450px, max-content) 20px auto 1fr',
            lg:
              '20px 0px minmax(315px, max-content) 40px minmax(315px, max-content) 1fr',
            xl:
              'minmax(10px, 5vh) 0px minmax(315px, max-content) minmax(20px, 80px) minmax(315px, max-content) 1fr',
          }}
        >
          <UnorderedList
            marginLeft={0}
            listStyleType="none"
            position="absolute"
            right={{ lg: '0' }}
            zIndex={50}
            width={{ base: '100%', lg: '50%' }}
            height="100%"
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gridTemplateRows="repeat(auto-fill, 200px)"
            transform="translateY(100%)"
            pointerEvents="none"
          >
            {dataBubbles?.map((dataBubble: DataBubbleProps, i: number) => {
              return (
                <DataBubble
                  key={i}
                  title={theme}
                  bigNumber={dataBubble.bigNumber}
                  desc={dataBubble.desc}
                  colStart={i % 2 === 0 ? 1 : 2}
                />
              );
            })}
          </UnorderedList>
          <Image
            src={img}
            alt={altImg}
            objectFit="contain"
            maxH={{ lg: '850px' }}
            width={{ base: '130%', lg: '100%' }}
            //maxW={{lg: '600px', xl: 'auto'}}
            gridColumnStart={{ base: '1', lg: '2' }}
            gridColumnEnd={{ base: '-1', lg: '5' }}
            gridRowStart={{ base: '4', lg: '1' }}
            gridRowEnd={-1}
            opacity={current === idx ? 1 : 0}
            transform={{
              base: current === idx ? 'translateX(25%)' : 'translate(-10%)',
              lg:
                current === idx
                  ? 'translate(25%, -15%)'
                  : 'translate(40%, -15%)',
              xl: current === idx ? 'translate(25%, 0%)' : 'translate(40%, 0%)',
            }}
            transformOrigin="botttom"
            alignSelf="end"
            justifySelf="end"
            transition="all .75s cubic-bezier(.15,0,.15,1)"
          />
          <Box
            as="button"
            type="button"
            aria-label="next"
            gridRowStart={1}
            gridRowEnd={2}
            justifySelf="end"
            display={{ lg: 'none' }}
            onClick={() => onStakeholderSelect()}
            sx={{
              '&:active > svg': {
                backgroundColor:
                  theme === 'yellow'
                    ? `stakeholders.${theme}.support`
                    : `stakeholders.${theme}.accent`,
              },
            }}
          >
            <CircleArrowRight boxSize={10} color="white" borderRadius="full" />
          </Box>
          <GridItem
            as="header"
            className="stakeholder-link"
            rowStart={3}
            rowEnd={4}
            colStart={1}
            colSpan={3}
            cursor="none"
          >
            <Link href={btn.href} passHref>
              <ChakraLink
                _hover={{ listStyleType: 'none' }}
                className="stakeholder-link"
                cursor="none"
              >
                <Text
                  color="white"
                  className="stakeholder-link"
                  cursor="none"
                  textTransform="uppercase"
                  fontSize={{ base: '16', md: '20' }}
                  marginBottom="1em"
                  fontWeight="bold"
                  opacity={current === idx ? 1 : 0}
                  transition="opacity .5s"
                >
                  {overTitle}
                </Text>
                <Heading
                  className="stakeholder-link"
                  cursor="none"
                  position="relative"
                  zIndex={20}
                  as="h3"
                  color={`stakeholders.${theme}.accent`}
                  fontSize={{ base: '30', md: '60', lg: '100' }}
                  lineHeight={{ base: '30', md: '60', lg: '100' }}
                  marginBottom={{ base: '20', md: '40' }}
                  opacity={current === idx ? 1 : 0}
                  transform={
                    current === idx ? 'translateY(0%)' : 'translateY(20%)'
                  }
                  transition="all .55s cubic-bezier(.15,0,.15,1) .15s"
                >
                  <RichText txt={title} />
                </Heading>
                <Text
                  className="stakeholder-link"
                  cursor="none"
                  position="relative"
                  zIndex={20}
                  fontSize={{ base: '14', md: '20' }}
                  lineHeight="20"
                  color="white"
                  opacity={current === idx ? 1 : 0}
                  transform={
                    current === idx ? 'translateY(0%)' : 'translateY(20%)'
                  }
                  transition="all .55s cubic-bezier(.15,0,.15,1) .35s"
                  //marginBottom={{ base: '40', md: '0' }}
                  maxW={{ lg: '60%' }}
                >
                  {excerpt}
                </Text>
              </ChakraLink>
            </Link>
            {/* <Link href={btn.href} passHref>
              <Box
                as="a"
                target="_blank"
                gridColumnStart={1}
                gridColumnEnd={2}
                gridRowStart={5}
                gridRowEnd={6}
                display={{ base: 'inline-block', lg: 'none' }}
                justifySelf="start"
                bgColor={`stakeholders.${theme}.accent`}
                borderRadius="full"
                padding="20px 40px"
                color={theme === 'yellow' ? 'meli.black' : 'white'}
                fontSize={{ base: '20', md: '30', lg: '20' }}
                fontWeight="bold"
                _hover={{ textDecoration: 'none' }}
                opacity={current === idx ? 1 : 0}
                transform={current === idx ? 'translateY(0%)' : 'translateY(45%)'}
                transition="all .55s cubic-bezier(.15,0,.15,1) .75s"
              >
                {btn.label}
              </Box>
            </Link> */}
          </GridItem>
          <Link href={btn.href} passHref>
            <Box
              as="a"
              gridColumnStart={1}
              gridColumnEnd={2}
              gridRowStart={5}
              gridRowEnd={6}
              display={{ lg: 'none' }}
              justifySelf="start"
              bgColor={`stakeholders.${theme}.accent`}
              borderRadius="full"
              padding="15px 30px"
              color={theme === 'yellow' ? 'meli.black' : 'white'}
              fontSize="20"
              fontWeight="bold"
              _hover={{ textDecoration: 'none' }}
              opacity={current === idx ? 1 : 0}
              transform={current === idx ? 'translateY(0%)' : 'translateY(45%)'}
              transition="all .55s cubic-bezier(.15,0,.15,1) .75s"
              position="relative"
            >
              {btn.label}
            </Box>
          </Link>
          {projects?.items?.length > 0 && (
            <Box
              display={{ base: 'none', lg: 'block' }}
              gridRowStart={5}
              gridRowEnd={6}
              gridColumnStart={1}
              gridColumnEnd={3}
              opacity={current === idx ? 1 : 0}
              transform={current === idx ? 'translateX(0)' : 'translateX(25%)'}
              transition="all .5s cubic-bezier(.15,0,.15,1) .75s"
            >
              <Projects title={projects.title} projects={projects.items} />
            </Box>
          )}
        </Grid>
      </Flex>
    </Flex>
  );
};

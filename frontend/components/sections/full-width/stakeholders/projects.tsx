import Link from 'next/link';
import {
  Box,
  Heading,
  UnorderedList,
  ListItem,
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react';
import { ArrowRight } from '../../../icons/arrow-right';

interface StakeholderProjectsProps {
  title: string;
  projects: {
    href: string;
    label: string;
  }[];
}

export const Projects: React.FC<StakeholderProjectsProps> = ({
  title,
  projects,
}) => {
  return (
    <Box
      marginBottom="3em"
      display={{ base: 'none', md: 'none', lg: 'block' }}
      width="max-content"
    >
      <Box as="header" display="flex" alignItems="center">
        <Heading
          as="h4"
          fontSize="14"
          fontWeight="light"
          color="white"
          marginRight="1em"
        >
          {title}
        </Heading>
        <Box as="span" height="0.5px" flex="1" backgroundColor="white" />
      </Box>
      <UnorderedList
        marginLeft={0}
        listStyleType="none"
        color="white"
        width="max-content"
      >
        {projects.map((project) => (
          <ListItem key={project.label} marginTop="1.5em" width="100%">
            <Link href={project.href} passHref>
              <ChakraLink display="flex" alignItems="center">
                <Text
                  color="white"
                  fontSize="20"
                  fontWeight="bold"
                  marginRight="auto"
                >
                  {project.label}
                </Text>
                <ArrowRight marginLeft="80" />
              </ChakraLink>
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

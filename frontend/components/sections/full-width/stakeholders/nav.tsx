import { Box, UnorderedList, ListItem, Link } from '@chakra-ui/react';
interface StakeHoldersNav {
  current: number;
  navLinks: string[];
  onStakeholderSelect: (id: string) => void;
}

export const Nav: React.FC<StakeHoldersNav> = ({
  current,
  navLinks,
  onStakeholderSelect,
}) => {
  return (
    <Box
      as="nav"
      paddingTop={{ lg: '160', xl: '0' }}
      width="100%"
      zIndex={20}
      top={16}
      display={{ base: 'none', md: 'none', lg: 'block' }}
      paddingBottom="15px"
      borderBottom="0.5px solid #FFF"
    >
      <UnorderedList
        listStyleType="none"
        marginLeft={0}
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        {navLinks.map((link, idx) => {
          return (
            <ListItem key={link} fontSize="18">
              <Link
                fontWeight={idx === current ? 'extrabold' : 'regular'}
                marginBottom=".5em"
                display="inline-block"
                textDecoration="none"
                _hover={{ textDecoration: 'none' }}
                onClick={() => onStakeholderSelect(link)}
                position="relative"
                sx={
                  idx === current
                    ? {
                        _after: {
                          bg: 'white',
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          bottom: '-24px',
                          h: '2px',
                          w: 'full',
                        },
                      }
                    : {}
                }
              >
                {link}
              </Link>
            </ListItem>
          );
        })}
      </UnorderedList>
    </Box>
  );
};

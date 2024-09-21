import {
  Container,
  Heading,
  Box,
  Button,
  Text,
  VStack,
} from '@chakra-ui/react';
import { SearchInput } from './search-input';
import { Filters } from './filters';
import { VerticalList } from '../../../lists/vertical-list';
import { Loading } from '../../../loading';
import { useRouter } from 'next/router';
interface SearchProps {
  title: string;
  placeholder: string;
  btnText?: string;
  filters?: { id: number; name: string }[];
  resultComponent: any;
  results: any[];
  resourceName: string;
  search: string;
  filter: number;
  handleFilter: (tagId: number) => void;
  handleSearch: (title: string) => void;
  resetSearch: () => void;
  loadMore: () => void;
  hasMore: boolean;
  loading?: boolean;
}
export const Search: React.FC<SearchProps> = (props) => {
  const {
    title,
    filters,
    resultComponent,
    resourceName,
    results,
    placeholder,
    btnText,
    search,
    filter,
    handleFilter,
    handleSearch,
    resetSearch,
    loadMore,
    hasMore,
    loading = false,
  } = props;

  const router = useRouter();

  return (
    <Box>
      <Container
        maxW={{ base: 'container.mobile.lg', lg: 'container.desktop.md' }}
        display={{ lg: 'flex' }}
        alignItems={{ base: 'center', lg: 'flex-end' }}
        marginBottom={{ base: '20', lg: '40' }}
      >
        <Heading
          as="h2"
          fontSize={{ base: '30', lg: '60' }}
          fontWeight="black"
          lineHeight={{ base: '60' }}
          maxW={{ base: 'min-content' }}
          marginRight={{ lg: '80px' }}
          marginBottom={{ base: '40', lg: '0px' }}
        >
          {title}
        </Heading>
        <SearchInput
          placeholder={placeholder}
          value={search}
          handleChange={(e) => handleSearch(e.target.value)}
          resetValue={() => resetSearch()}
        />
      </Container>
      {filters && (
        <Filters
          filters={filters}
          current={filter}
          onFilterSelect={(tagId) => handleFilter(tagId)}
        />
      )}
      <Container
        maxW={{ base: 'container.mobile.lg', lg: 'container.desktop.md' }}
        position="relative"
        centerContent
      >
        {results.length ? (
          <VerticalList
            items={results}
            resourceName={resourceName}
            itemComponent={resultComponent}
            spacing={{ base: '10px', lg: '40' }}
            divider
          />
        ) : (
          <VStack spacing={4} py={{ base: 28, lg: 52 }}>
            <Heading
              as="h3"
              fontSize={{ base: '20px', lg: '30px' }}
              lineHeight={{ base: '20px', lg: '30px' }}
              fontWeight="700"
              maxW="550px"
              textAlign="center"
            >
              {router.locale === 'pt'
                ? 'Desculpe, não conseguimos encontrar o que você está procurando.'
                : router.locale === 'en'
                ? "Sorry, we can't find what you're looking for."
                : 'Lo sentimos, no encontramos lo que estás buscando.'}
            </Heading>
            <Text textAlign="center">
              {router.locale === 'pt'
                ? 'Tente novamente usando outra palavra-chave.'
                : router.locale === 'en'
                ? 'Please try again using another keyword.'
                : 'Intente nuevamente usando otra palabra clave.'}
            </Text>
          </VStack>
        )}
        {hasMore && (
          <Button
            variant="yellow"
            marginTop={{ base: '40', lg: '80' }}
            onClick={loadMore}
          >
            {btnText}
          </Button>
        )}

        <Loading show={loading} size="lg" variant="absolute" overlay />
      </Container>
    </Box>
  );
};

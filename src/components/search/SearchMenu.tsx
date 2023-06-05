import {
  Box,
  Center,
  Heading,
  Menu,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuListProps,
  MenuProps,
  Text
} from '@chakra-ui/react';
import { FC, useEffect, useMemo, useRef, useState } from 'react';

import { highLightQuery, searchDocs } from '../../functions/search';
import { TSearchResult, TSearchResultSection } from '../../types/search';
import SearchInput from './SearchInput';
import Link from '../Link';

/**
 * The search menu item component for displaying a specific search result item.
 */
const SearchResultItem: FC<{
  item: TSearchResult;
  query: string;
  id: number;
}> = ({ item, query, id }) => {
  return (
    <MenuItem
      key={id}
      fontWeight="normal"
      _active={{
        '.chakra-heading': {
          color: 'components.menu.item.focus.headingColor'
        },
        bgColor: 'components.menu.item.focus.bgColor',
        boxShadow: '0 0 0 2px #00bce6'
      }}
      _hover={{
        '.chakra-heading': {
          color: 'components.menu.item.focus.headingColor'
        },
        bgColor: 'components.menu.item.focus.bgColor',
        boxShadow: '0 0 0 2px #00bce6'
      }}
      transition="background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out">
      <Link href={item.href}>
        <Heading
          size="sm"
          transition="color 0.2s ease-in-out"
          color="shared.text.bright">
          {highLightQuery(item.title, query, 0)}
        </Heading>
        <Text color="text.default">
          {highLightQuery(item.description, query)}
        </Text>
      </Link>
    </MenuItem>
  );
};

/**
 * The search menu section component for displaying a search result section containing multiple search result items.
 */
const SearchResultSection: FC<{
  section: TSearchResultSection;
  idx: number;
  query: string;
}> = ({ section, idx, query }) => {
  return (
    <MenuGroup key={idx}>
      <Heading
        key={-1}
        fontSize="12px"
        mb={2}
        mt={idx === 0 ? 2 : 5}
        textTransform="uppercase"
        color="components.menu.groupTitle.color">
        {section.title}
      </Heading>
      <MenuDivider />
      {section.results.map((result, i) => (
        <SearchResultItem item={result} query={query} id={i} key={i} />
      ))}
    </MenuGroup>
  );
};

interface SearchMenuProps {
  menuProps?: Partial<MenuProps>;
  menuListProps?: Partial<MenuListProps>;
}

/**
 * Search menu component - shows a navigatable list of search results
 */
const SearchMenu: FC<SearchMenuProps> = ({ menuProps, menuListProps }) => {
  const r = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResultData, setSearchResultData] = useState<
    TSearchResultSection[]
  >([]);
  const resultItems = useMemo(() => {
    if (searchResultData.length > 0) {
      return searchResultData.map((section, idx) => (
        <SearchResultSection
          section={section}
          idx={idx}
          query={searchQuery}
          key={idx}
        />
      ));
    }
    return (
      <Center my={5} color="components.menu.noResults.color">
        No results found.
      </Center>
    );
  }, [searchResultData]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      // Retrieve the search data
      searchDocs(searchQuery).then(setSearchResultData);
    } else setSearchResultData([]);
  }, [searchQuery]);

  return (
    <Menu variant="search-result" {...menuProps} autoSelect={false}>
      <SearchInput setSearchQuery={setSearchQuery} />

      <MenuList
        fontSize="sm"
        //TODO: Fix the backdrop blur not working
        backdropBlur={8}
        {...menuListProps}>
        {resultItems}
      </MenuList>
    </Menu>
  );
};

export default SearchMenu;

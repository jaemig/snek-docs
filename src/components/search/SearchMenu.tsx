import {
  Box,
  Center,
  Heading,
  Menu,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuItemProps,
  MenuList,
  MenuListProps,
  MenuProps,
  Portal,
  Text
} from '@chakra-ui/react';
import { FC, useEffect, useMemo, useRef, useState } from 'react';

import { highLightQuery, searchDocs } from '../../functions/search';
import { TSearchResult, TSearchResultSection } from '../../types/search';
import SearchInput from './SearchInput';
import Link from '../app/Link';
import { isInternalLink } from '../../functions/utils';
import { navigate } from 'gatsby';

/**
 * The search menu item component for displaying a specific search result item.
 */
const SearchResultItem: FC<{
  item: TSearchResult;
  query: string;
  id: number;
  defaultFocus?: boolean;
}> = ({ item, query, id, defaultFocus = false }) => {
  let props: MenuItemProps = {};

  if (defaultFocus) {
    props = {
      ...props,
      bgColor: 'components.menu.item.focus.bgColor',
      boxShadow: '0 0 0 2px #00bce6'
    };
  }

  return (
    <MenuItem
      key={id}
      fontWeight="normal"
      _focus={{
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
      onKeyDownCapture={e => {
        if (e.key === 'Enter') {
          // Redirect to the item's link if the user presses enter
          if (isInternalLink(item.href)) navigate(item.href);
          else window.location.href = item.href;
        }
      }}
      {...props}
      transition="background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out">
      <Link href={item.href}>
        <Heading
          size="sm"
          transition="color 0.2s ease-in-out"
          color={
            defaultFocus
              ? 'components.menu.item.focus.headingColor'
              : 'shared.text.bright'
          }>
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
  defaultHighlight?: boolean;
}> = ({ section, idx, query, defaultHighlight }) => {
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
        <SearchResultItem
          item={result}
          query={query}
          id={i}
          key={i}
          defaultFocus={defaultHighlight && i === 0}
        />
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
  const [isAnyItemFocused, setIsAnyItemFocused] = useState(false);
  const resultItems = useMemo(() => {
    if (searchResultData.length > 0) {
      return searchResultData.map((section, idx) => (
        <SearchResultSection
          section={section}
          idx={idx}
          query={searchQuery}
          key={idx}
          defaultHighlight={idx === 0 && !isAnyItemFocused}
        />
      ));
    }
    return (
      <Center my={5} color="components.menu.noResults.color">
        No results found.
      </Center>
    );
  }, [searchResultData, isAnyItemFocused]);

  const openFirstLink = () => {
    if (
      searchResultData.length > 0 &&
      searchResultData[0]?.results.length > 0
    ) {
      const href = searchResultData[0].results[0].href;
      if (isInternalLink(href)) navigate(href);
      else window.location.href = href;
      setIsAnyItemFocused(false);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      // Retrieve the search data
      searchDocs(searchQuery).then(setSearchResultData);
    } else setSearchResultData([]);
  }, [searchQuery]);

  return (
    <Menu
      variant="search-result"
      {...menuProps}
      autoSelect={false}
      onClose={() => {
        setIsAnyItemFocused(false);
      }}>
      <SearchInput
        setSearchQuery={setSearchQuery}
        openFirstLink={openFirstLink}
      />

      <Portal>
        <MenuList
          fontSize="sm"
          backgroundColor="rgba(255, 255, 255, 0.8)"
          backdropBlur={8}
          {...menuListProps}
          onFocusCapture={e => {
            // If the user focuses on any result item for the first time, set the isAnyItemFocused state to true
            if (!isAnyItemFocused && e.target instanceof HTMLButtonElement)
              setIsAnyItemFocused(true);
          }}>
          {resultItems}
        </MenuList>
      </Portal>
    </Menu>
  );
};

export default SearchMenu;

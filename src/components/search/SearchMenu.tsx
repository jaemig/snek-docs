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
import React, { FC, Fragment, ReactElement, useEffect, useRef } from 'react';
import SearchInput from './SearchInput';
import { TSearchResultSection, TSearchResult } from '../../types/search';

const exampleSearchResult: TSearchResultSection[] = [
  {
    title: 'Page Configuration',
    results: [
      {
        title: 'Page Configuration',
        description:
          'In Nextra, the site and page structure can be configured via the co-located _meta.json files. In the docs theme, there are some extra options available to customize it further.Those configurations affect the overall ',
        href: '#'
      },
      {
        title: 'Layouts',
        description:
          'By default, each page has "layout": "default" in their theme config, which is the default behavior.',
        href: '#'
      }
    ]
  },
  {
    title: 'Custom Theme',
    results: [
      {
        title: 'Custom Theme',
        description:
          'A theme in Nextra works like a layout, that will be rendered as a wrapper for all pages',
        href: '#'
      },
      {
        title: 'Create a Basic Theme',
        description:
          'Inside your theme layout, you can use CSS imports or other ways to style it. Next.js hooks such as useRouter, Head are also available.',
        href: '#'
      }
    ]
  }
];

// Index key for the menu component
let menuIdx = 0;

/**
 * Highlight all occurences the search query in the text
 * @param text  The text to highlight
 * @param query  The search query
 * @returns  The text with highlighted query
 */
const highLightQuery = (text: string, query: string) => {
  const lowercase_text = text.toLowerCase();
  const lowercase_query = query.toLowerCase();
  let searchIdx = 0; // The index of the last search
  let occ; // The index of the current occurrence
  const textParts = [];
  while ((occ = lowercase_text.indexOf(lowercase_query, searchIdx)) !== -1) {
    const prefix = text.substring(searchIdx, occ);
    searchIdx = occ + query.length;
    textParts.push(
      <Fragment key={occ}>
        {prefix}
        <Text as="span" color="theme.600">
          {text.substring(occ, occ + query.length)}
        </Text>
      </Fragment>
    );
  }
  // Add the last part of the text
  if (searchIdx < text.length) {
    textParts.push(
      <Fragment key={text.length}>
        {text.substring(searchIdx, text.length)}
      </Fragment>
    );
  }
  return textParts.length > 0 ? <>{textParts}</> : text;
};

/**
 * The search menu item component for displaying a specific search result item.
 */
const SearchResultItem: FC<{ item: TSearchResult; query: string }> = ({
  item,
  query
}) => {
  return (
    <MenuItem
      key={menuIdx++}
      fontWeight="normal"
      _focus={{
        '.chakra-heading': {
          color: 'components.menu.item.focus.headingColor'
        },
        bgColor: 'components.menu.item.focus.bgColor',
        boxShadow: '0 0 0 2px #00bce6'
      }}
      transition="background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out">
      <Box>
        <Heading
          size="sm"
          transition="color 0.2s ease-in-out"
          color="shared.text.bright">
          {highLightQuery(item.title, query)}
        </Heading>
        <Text color="text.default">
          {highLightQuery(item.description, query)}
        </Text>
      </Box>
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
        <SearchResultItem item={result} query={query} key={i} />
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

  const [searchQuery, setSearchQuery] = React.useState('');

  useEffect(() => {
    retrieveSearchData();
  }, []);

  const retrieveSearchData = async () => {
    try {
      const res = await fetch('/search-index-alpha.json', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
    } catch (err) {
      console.error('Could not retrieve search data.');
    }
  };

  useEffect(() => {
    // Reset the menu index when the search query changes
    menuIdx = 0;
  });

  let searchResults;

  if (searchQuery.length > 0) {
    searchResults = exampleSearchResult.map((section, idx) => (
      <SearchResultSection
        section={section}
        idx={idx}
        query={searchQuery}
        key={idx}
      />
    ));
    if (!searchResults.length) {
      searchResults = (
        <Center my={5} color="components.menu.noResults.color">
          No results found.
        </Center>
      );
    }
  }

  return (
    <Menu variant="search-result" initialFocusRef={r} isLazy {...menuProps}>
      <SearchInput ref={r} setSearchQuery={setSearchQuery} />

      {searchResults && (
        <MenuList
          fontSize="sm"
          //TODO: Fix the backdrop blur not working
          backdropBlur={8}
          {...menuListProps}>
          {searchResults}
        </MenuList>
      )}
    </Menu>
  );
};

export default SearchMenu;

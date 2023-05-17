import {
  Box,
  Heading,
  Menu,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { FC, Fragment, useEffect, useRef } from "react";
import { SearchResult, SearchResultSection } from "./search.types";
import SearchInput from "./SearchInput";

const exampleSearchResult: SearchResultSection[] = [
  {
    title: "Page Configuration",
    results: [
      {
        title: "Page Configuration",
        description:
          "In Nextra, the site and page structure can be configured via the co-located _meta.json files. In the docs theme, there are some extra options available to customize it further.Those configurations affect the overall ",
        href: "#",
      },
      {
        title: "Layouts",
        description:
          'By default, each page has "layout": "default" in their theme config, which is the default behavior.',
        href: "#",
      },
    ],
  },
  {
    title: "Custom Theme",
    results: [
      {
        title: "Custom Theme",
        description:
          "A theme in Nextra works like a layout, that will be rendered as a wrapper for all pages",
        href: "#",
      },
      {
        title: "Create a Basic Theme",
        description:
          "Inside your theme layout, you can use CSS imports or other ways to style it. Next.js hooks such as useRouter, Head are also available.",
        href: "#",
      },
    ],
  },
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
                { prefix }
                <Text as="span" color="theme.600">{ text.substring(occ, occ + query.length) }</Text>
            </Fragment>
        );
    }
    // Add the last part of the text
    if (searchIdx < text.length) {
        textParts.push(<Fragment key={text.length}>{ text.substring(searchIdx, text.length) }</Fragment>);
    }
    return textParts.length > 0 ? (<>{ textParts }</>) : text;
}

/**
 * Generate a search result item
 * @param item  The search result item
 * @param query  The search query
 * @returns The search result item component with highlighted query
 */
const generateSearchResultItem = (item: SearchResult, query: string) => {
  return (
    <MenuItem
        key={menuIdx++}
        fontWeight="normal"
        _focus={{
            ".chakra-heading": {
                color: "components.menu.item.focus.headingColor",
            },
            bgColor: "components.menu.item.focus.bgColor",
            boxShadow: "0 0 0 2px #00bce6",
        }}
        transition="background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
      >
        <Box>
          <Heading
            size="sm"
            transition="color 0.2s ease-in-out"
          >
            {highLightQuery(item.title, query)}
        </Heading>
          <Text color="gray.500">
            { highLightQuery(item.description, query) }
          </Text>
        </Box>
      </MenuItem>
  )
};

/**
 * Generate a search result section
 * @param section  The search result section
 * @param idx  The index of the section
 * @param query  The search query
 * @returns  The search result section component
 */
const generateSearchresultSection = (
  section: SearchResultSection,
  idx: number,
  query: string
) => {
  return (
    <MenuGroup key={idx}>
        <Heading 
            size="xs"
            mb={2}
            mt={idx === 0 ? 2 : 5}
            textTransform='uppercase'
            color='components.menu.groupTitle.color'
        >{section.title}</Heading>
      <MenuDivider />
      {section.results.map((result) => generateSearchResultItem(result, query))}
    </MenuGroup>
  );
};

/**
 * Search menu component - shows a navigatable list of search results
 */
const SearchMenu: FC = () => {
  const r = useRef(null);

  const [searchQuery, setSearchQuery] = React.useState('');

  useEffect(() => {
    // Reset the menu index when the search query changes
    menuIdx = 0;
  })

  return (
    <Menu variant="search-result" initialFocusRef={r} isLazy>
      <SearchInput ref={r} setSearchQuery={setSearchQuery} />

      <MenuList
        w="500px"
        fontSize="sm"
      >
        {searchQuery.length > 0 && exampleSearchResult.map((section, idx) =>
          generateSearchresultSection(section, idx, searchQuery)
        )}
      </MenuList>
    </Menu>
  );
};


export default SearchMenu;

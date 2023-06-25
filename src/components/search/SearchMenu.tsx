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
import Link from '../core/Link';
import { useLocation, navigate } from '@reach/router';

/**
 * The search menu item component for displaying a specific search result item.
 */
const SearchResultItem: FC<{
  item: TSearchResult;
  query: string;
  id: number;
  defaultFocus?: boolean;
  onClickCapture?: () => void;
}> = ({
  item,
  query,
  id,
  defaultFocus = false,
  onClickCapture = undefined
}) => {
  let props: MenuItemProps = {};

  if (defaultFocus) {
    props = {
      ...props,
      bgColor: 'components.menu.item.focus.bgColor'
      // boxShadow: '0 0 0 2px #00bce6'
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
        outline: 'none',
        border: '0px',
        bgColor: 'components.menu.item.focus.bgColor'
        // boxShadow: '0 0 0 2px #00bce6'
      }}
      _hover={{
        '.chakra-heading': {
          color: 'components.menu.item.focus.headingColor'
        },
        bgColor: 'components.menu.item.focus.bgColor'
        // boxShadow: '0 0 0 2px #00bce6'
      }}
      onKeyDownCapture={e => {
        if (e.key === 'Enter') {
          // Redirect to the item's link if the user presses enter
          navigate(item.href);
        }
      }}
      onClickCapture={onClickCapture}
      {...props}
      transition="background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
    >
      <Link href={item.href}>
        <Heading
          size="sm"
          transition="color 0.2s ease-in-out"
          color={
            defaultFocus
              ? 'components.menu.item.focus.headingColor'
              : 'shared.text.bright'
          }
        >
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
  onItemClickCapture?: () => void;
}> = ({ section, idx, query, defaultHighlight, onItemClickCapture }) => {
  return (
    <MenuGroup key={idx}>
      <Heading
        key={-1}
        fontSize="12px"
        mb={2}
        mt={idx === 0 ? 2 : 5}
        textTransform="uppercase"
        color="components.menu.groupTitle.color"
      >
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
          onClickCapture={onItemClickCapture}
        />
      ))}
    </MenuGroup>
  );
};

interface SearchMenuProps {
  menuProps?: Partial<MenuProps>;
  menuListProps?: Partial<MenuListProps>;
  onItemClickCapture?: () => void;
}

/**
 * Search menu component - shows a navigatable list of search results
 */
const SearchMenu: FC<SearchMenuProps> = ({
  menuProps,
  menuListProps,
  onItemClickCapture
}) => {
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
          onItemClickCapture={onItemClickCapture}
        />
      ));
    }
    return (
      <Center my={5} color="components.menu.noResults.color">
        No results found.
      </Center>
    );
  }, [searchResultData, isAnyItemFocused]);

  // Open the first link if the user presses enter (the search input is not focused at this point)
  const openFirstLink = () => {
    if (
      searchResultData.length > 0 &&
      searchResultData[0]?.results.length > 0
    ) {
      const href = searchResultData[0].results[0].href;
      navigate(href);
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
      }}
      isLazy
      id="search-menu"
    >
      <SearchInput
        setSearchQuery={setSearchQuery}
        openFirstLink={openFirstLink}
      />

      <Portal>
        <Box
          __css={{
            '.sd-search-menu-list::-webkit-scrollbar-thumb': {
              borderRadius: 'full',
              backgroundColor: 'shared.scrollbar.thumb.bgColor',
              '&:hover': {
                backgroundColor: 'shared.scrollbar.thumb.hover.bgColor'
              }
            },
            '.sd-search-menu-list::-webkit-scrollbar': {
              width: '4px',
              backgroundColor: 'transparent'
            }
          }}
        >
          <MenuList
            className="sd-search-menu-list"
            style={{
              scrollbarColor: 'red'
            }}
            fontSize="sm"
            backgroundColor="shared.translucent.bgColor"
            backdropBlur={8}
            h="50%"
            height="auto"
            maxHeight="xs"
            overflowY="scroll"
            {...menuListProps}
            onFocusCapture={e => {
              // If the user focuses on any result item for the first time, set the isAnyItemFocused state to true
              if (!isAnyItemFocused && e.target instanceof HTMLButtonElement)
                setIsAnyItemFocused(true);
            }}
          >
            {resultItems}
          </MenuList>
        </Box>
      </Portal>
    </Menu>
  );
};

export default SearchMenu;

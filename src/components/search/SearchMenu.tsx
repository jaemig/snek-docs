import { Heading, Menu, MenuDivider, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";
import React, { Dispatch, FC, SetStateAction } from "react";
import { SearchResult, SearchResultSection } from "./search.types";

const exampleSearchResult: SearchResultSection[] = [
    {
        title: 'Page Configuration',
        results: [
            {
                title: 'Page Configuration',
                description: 'In Nextra, the site and page structure can be configured via the co-located _meta.json files. In the docs theme, there are some extra options available to customize it further.Those configurations affect the overall ',
                href: '#',
            },
            {
                title: 'Layouts',
                description: 'By default, each page has "layout": "default" in their theme config, which is the default behavior.',
                href: '#',
            },
        ],
    },
    {
        title: 'Custom Theme',
        results: [
            {
                title: 'Custom Theme',
                description: 'A theme in Nextra works like a layout, that will be rendered as a wrapper for all pages',
                href: '#',
            },
            {
                title: 'Create a Basic Theme',
                description: 'Inside your theme layout, you can use CSS imports or other ways to style it. Next.js hooks such as useRouter, Head are also available.',
                href: '#',
            },
        ],
    },
]


const generateSearchResultItem = (item: SearchResult, query: string) => {
    const stringParts = item.description.split(query);
    const highlightedString = stringParts.map((part, idx) => {
        return (
            <>
                {part}
                {idx !== stringParts.length - 1 && <span style={{ color: 'yellow' }}>{query}</span>}
            </>
        )
    });
    return (
        <MenuItem
            key={item.title}
            fontSize='sm'
            fontWeight='normal'
            color='gray.500'
        >
            <Heading size='s,m'>{item.title}</Heading>
            { highlightedString }
        </MenuItem>
    )
}

const generateSearchresultSection = (section: SearchResultSection, idx: number, query: string) => {
    return (
        <MenuGroup
            key={idx}
            title={section.title}
            mt={idx === 0 ? 0 : 5}
        >
            <MenuDivider />
            {section.results.map((result) => generateSearchResultItem(result, query))}
        </MenuGroup>
    )
}

interface SearchMenuProps {
    isOpen: boolean;
    setIsOpen: SetStateAction<Dispatch<boolean>>;
    query: string;
}
/**
 * Search menu component - shows a navigatable list of search results
 */
const SearchMenu: FC<SearchMenuProps> = ({ isOpen, setIsOpen, query }) => {

    return (
        <Menu
            isOpen={isOpen}
            variant='search-result'
        >
            <MenuList
                position='relative'
                top={10}
                right='57%'
                w='500px'
                fontSize='sm'
            >
                {exampleSearchResult.map((section, idx) => generateSearchresultSection(section, idx, query))}
            </MenuList>
        </Menu>
    )
}

export default SearchMenu;
import { Box, Flex, ListItem, UnorderedList } from "@chakra-ui/react";
import { it } from "node:test";
import React, { FC } from "react";

type MenuItem = {
    name: string;
    href: string;
    isExternal?: boolean;
    children?: MenuItem[];
}

type MenuSection = {
    name?: string;
    items: MenuItem[];
}

const menuStructure: MenuSection[] = [
    {
        items: [
            {
                name: 'Introduction',
                href: '/docs/introduction',
                children: [],
            },
            {
                name: 'Guide',
                href: '/docs/guide',
                children: [
                    {
                        name: 'Organize Files',
                        href: '/docs/guide/organize-files',
                    },
                    {
                        name: 'Markdown',
                        href: '/docs/guide/markdown',
                    },
                    {
                        name: 'Advanced',
                        href: '/docs/guide/advanced',
                        children: [
                            {
                                name: 'Rendering Tables',
                                href: '/docs/guide/advanced/rendering-tables',                           
                            },
                            {
                                name: 'Remote Content',
                                href: '/docs/guide/advanced/remote-content',
                            }
                        ]
                    }
                ],
            },
        ],
    },
    {
        name: 'Themes',
        items: [
            {
                name: 'Docs Theme',
                href: '/docs/themes/docs-theme',
            },
            {
                name: 'Blog Theme',
                href: '/docs/themes/blog-theme',
            },
            {
                name: 'Custom Theme',
                href: '/docs/themes/custom-theme',
            }
        ],
    },
    {
        name: 'More',
        items: [
            {
                'name': 'About Snek',
                'href': '/docs/about-snek',
            },
            {
                'name': 'Snek CLI',
                'href': 'https://snek.at',
                'isExternal': true,
            },
        ],      
    },
];

const generateMenuItem = (item: MenuItem) => {

    const children = item.children?.map((child) => generateMenuItem(child));

    //TODO: Hover effect gets triggered when hovering over children
    return (
        <ListItem
            p={1}
            mt={1}
            opacity={0.8}
            _hover={{
                opacity: 1,
            }}
        >
            {item.name}
            {children && (
                <UnorderedList styleType='none'>
                    {children}
                </UnorderedList>
            )}
        </ListItem>
    )
}

/**
 * Left navigation bar.
 */
const LeftNav: FC = () => {
    return (
        <Box
            as='nav'
            position='sticky'
        >
            {
                menuStructure.map((section, i) => (
                    <Box
                        color='gray.800'
                    >
                        {
                            section.name && (
                                <Box
                                    mt={i === 0 ? 0 : 7}
                                    fontSize='sm'
                                    fontWeight='bold'
                                >
                                    {section.name}
                                </Box>
                            )
                        }
                        <UnorderedList styleType='none'>
                            { section.items.map((item) => generateMenuItem(item))}
                        </UnorderedList>
                    </Box>
                ))
            }
        </Box>
    )
}

export default LeftNav
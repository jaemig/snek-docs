import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, Flex, ListItem, UnorderedList, } from "@chakra-ui/react";
import { it } from "node:test";
import React, { FC } from "react";

type MenuItem = {
    name: string;
    href: string;
    isExternal?: boolean;
    children?: MenuItem[];
    isActive?: boolean;
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
                isActive: true,
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

const baseMenuItemProps = {
    transition: 'opacity 0.2s ease-in-out, background-color 0.2s ease-in-out',
};

const inactiveMenuItemProps = {
    ...baseMenuItemProps,
    opacity: 0.8,
    _hover: {
        opacity: 1,
        bgColor: 'gray.100',
    },
}

const activeMenuItemProps = {
    ...baseMenuItemProps,
    opacity: 1,
    bgColor: 'blue.100',
    color: 'blue.500',
    fontWeight: 'bold',
    _hover: {
        bgColor: 'blue.100',
    },
};

const generateMenuItem = (item: MenuItem, idx: number) => {
    const children = item.children?.map((child, i) => generateMenuItem(child, i));

    if (item.children && item.children.length > 0) {
        return (
            <AccordionItem 
                borderWidth={0}
                key={idx}
                css={{
                    '& .chakra-collapse .chakra-accordion__panel':  {
                        'paddingTop': 0,
                    },
                    '&:last-child .chakra-collapse .chakra-accordion__panel':  {
                        'paddingBottom': 0,
                    },
                }}
            >
                {({ isExpanded }) => (
                    <>
                        <AccordionButton
                            borderRadius='md'
                            py={1.5}
                            {...item.isActive ? activeMenuItemProps : inactiveMenuItemProps}
                        >
                            <Box 
                                as='span'
                                flex='1'
                                textAlign='left'
                                fontSize='sm'
                            >
                                {item.name}
                            </Box>
                            <Center
                                as='span'
                                _hover={{
                                    backgroundColor: item.isActive ? 'blue.200' : 'gray.200',
                                    borderRadius: 'sm'
                                }}
                                transition='background-color 0.2s ease-in-out'
                            >
                                <AccordionIcon
                                opacity='inherit'
                                    transform={`rotate(${isExpanded ? 0 : -90}deg)`}
                                />
                            </Center>
                        </AccordionButton>
                        <AccordionPanel
                                position='relative'
                        >
                            <Box
                                _before={{
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 2,
                                    borderRadius: 'full',
                                    left: '10px',
                                    width: '1px',
                                    height: '100%',
                                    backgroundColor: 'gray.200',
                                }}
                            >
                                {children}
                            </Box>
                        </AccordionPanel>
                    </>
                )}
            </AccordionItem>
        )
    }
    return (
        <Box
            py={1.5}
            px={4}
            mt={1}
            cursor='pointer'
            borderRadius='md'
            {...item.isActive ? activeMenuItemProps : inactiveMenuItemProps}
        >
            {item.name}
            {children}
        </Box>
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
            fontSize='sm'
        >
            <Accordion
                allowMultiple
                css={{
                    // Remove border from last accordion item
                    '& .chakra-accordion__item:last-child': {
                        borderBottomWidth: 0,
                    },
                }}
            >
            {
                menuStructure.map((section, i) => (
                    <>
                        {
                            section.name && (
                                <Box
                                    key={-i}
                                    mt={i === 0 ? 0 : 9}
                                    fontSize='sm'
                                    fontWeight='bold'
                                    ml={4}
                                >
                                    {section.name}
                                </Box>
                            )
                        }
                        <Box key={i}>
                            { section.items.map((item, idx) => generateMenuItem(item, idx))}
                        </Box>
                    </>
                ))
            }
            </Accordion>
        </Box>
    )
}

export default LeftNav
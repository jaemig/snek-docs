import { Accordion, AccordionButton, AccordionButtonProps, AccordionIcon, AccordionItem, AccordionPanel, Center, CenterProps, Link, LinkProps, Box } from "@chakra-ui/react";
import React, { FC } from "react";
import { NavMenuItem, NavMenuSection } from "../navigation.types";
import { ArrowForwardIcon } from "@chakra-ui/icons";

// Example menu structure - this would be fetched from a CMS
const menuStructure: NavMenuSection[] = [
    {
        items: [
            {
                name: 'Introduction',
                href: '#',
                children: [],
            },
            {
                name: 'Guide',
                href: '#',
                isActive: true,
                children: [
                    {
                        name: 'Organize Files',
                        href: '#',
                    },
                    {
                        name: 'Markdown',
                        href: '#',
                    },
                    {
                        name: 'Advanced',
                        href: '#',
                        children: [
                            {
                                name: 'Rendering Tables',
                                href: '#',                           
                            },
                            {
                                name: 'Remote Content',
                                href: '#',
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
                href: '#',
            },
            {
                name: 'Blog Theme',
                href: '#',
            },
            {
                name: 'Custom Theme',
                href: '#',
            }
        ],
    },
    {
        name: 'More',
        items: [
            {
                'name': 'About Snek',
                href: '/docs/about-snek',
            },
            {
                name: 'Snek CLI',
                href: 'https://snek.at',
                isExternal: true,
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
}

const activeMenuItemProps = {
    ...baseMenuItemProps,
    opacity: 1,
    bgColor: 'theme.100',
    color: 'leftNav.accordion.activeItem.button.text.color',
    fontWeight: 'bold',
};

// Generates a menu item recursively
const generateMenuItem = (item: NavMenuItem, idx: number) => {
    
    const externalLinkIcon = <ArrowForwardIcon transform={`rotate(-45deg)`} ml={2} />;

    const props:CenterProps & AccordionButtonProps & LinkProps = { _hover: { opacity: 1}};
    
    if (item.isActive) props.backgroundColor = 'leftNav.accordion.activeItem.bgColor';
    else if (props._hover) props._hover.backgroundColor = 'leftNav.accordion.inactiveItem.hoverBgColor';

    if (item.children && item.children.length > 0) {
        const children = item.children.map((child, i) => generateMenuItem(child, i));

        const semanticPath = `leftNav.accordion.${item.isActive ? '' : 'in'}activeItem.`;
        return (
            <AccordionItem
                key={idx}
                css={{
                    // Remove padding from last accordion item
                    '&:last-child .chakra-collapse .chakra-accordion__panel':  {
                        'paddingBottom': 0,
                    },
                }}
            >
                {({ isExpanded }) => (
                    <>
                        <AccordionButton
                            {...item.isActive ? activeMenuItemProps : inactiveMenuItemProps}
                            {...props}
                            as={Link}
                            href={item.href}
                            isExternal={item.isExternal}
                            borderRadius='md'
                            py={1.5}
                            backgroundColor={item.isActive ? (semanticPath + 'bgColor') : undefined}
                        >
                            <Box 
                                as='span'
                                flex='1'
                            >
                                {item.name}
                                {item.isExternal && externalLinkIcon}
                            </Box>
                            <Center
                                {...props}
                                as='span'
                                borderRadius='sm'
                                transition='background-color 0.2s ease-in-out'
                                backgroundColor='transparent'
                                _hover={{
                                    bgColor: semanticPath + 'button.icon.hoverContainerBgColor',
                                }}
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
                                    backgroundColor: 'leftNav.accordion.panel.borderLeftColor',
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
        <Link
            {...item.isActive ? activeMenuItemProps : inactiveMenuItemProps}
            {...props}
            href={item.href}
            isExternal={item.isExternal}
            display='block'
            py={1.5}
            px={4}
            mt={1}
            cursor='pointer'
            borderRadius='md'
        >
            {item.name}
            {item.isExternal && externalLinkIcon}
        </Link>
    )
}

interface PageDirectoryProps {
    isExpanded?: boolean;
}
/**
 * The page directory component that shows the documentation structure.
 */
const PageDirectory: FC<PageDirectoryProps> = ({ isExpanded = true }) => {
    return (
        <Accordion
            visibility={isExpanded ? 'visible' : 'hidden'}
            opacity={isExpanded ? 1 : 0}
            w={isExpanded ? '100%' : 'max-content'}
            allowMultiple
            css={{
                // Remove border from last accordion item
                '& .chakra-accordion__item:last-child': {
                    borderBottomWidth: 0,
                },
            }}
            variant='leftNav'
            transition='opacity 0.2s ease-in-out, width 0.2s ease-in-out'
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
    )
};

export default PageDirectory;
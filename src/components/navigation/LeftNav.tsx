import { ArrowForwardIcon, SunIcon } from "@chakra-ui/icons";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, Flex, Link, Spacer, Button, IconButton, useColorMode } from "@chakra-ui/react";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import HideSidebarIcon from "../icons/HideSidebar";
import { NavMenuSection, NavMenuItem } from "./navigation.types";

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

const generateMenuItem = (item: NavMenuItem, idx: number) => {
    
    const externalLinkIcon = <ArrowForwardIcon transform={`rotate(-45deg)`} ml={2} />;

    if (item.children && item.children.length > 0) {
        const children = item.children.map((child, i) => generateMenuItem(child, i));
        return (
            <AccordionItem
                borderWidth={0}
                key={idx}
                css={{
                    // Remove top padding from accordion item
                    '& .chakra-collapse .chakra-accordion__panel':  {
                        'paddingTop': 0,
                        'paddingRight': 0,
                    },
                    // Remove padding from last accordion item
                    '&:last-child .chakra-collapse .chakra-accordion__panel':  {
                        'paddingBottom': 0,
                    },
                    // Remove text decoration (underline) from accordion button
                    '& .chakra-link.chakra-accordion__button': {
                        'textDecoration': 'none',
                    }
                }}
            >
                {({ isExpanded }) => (
                    <>
                        <AccordionButton
                            as={Link}
                            href={item.href}
                            isExternal={item.isExternal}
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
                                {item.isExternal && externalLinkIcon}
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
        <Link
            href={item.href}
            isExternal={item.isExternal}
            display='block'
            py={1.5}
            px={4}
            mt={1}
            cursor='pointer'
            borderRadius='md'
            {...item.isActive ? activeMenuItemProps : inactiveMenuItemProps}
        >
            {item.name}
            {item.isExternal && externalLinkIcon}
        </Link>
    )
}

/**
 * Left navigation bar.
 */
interface LeftNavProps {
    isMobile?: boolean;
}

const LeftNav: FC<LeftNavProps> = ({ isMobile }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <Flex
            as='nav'
            fontSize='sm'
            flexDirection='column'
            h='100%'
            w={isExpanded ? 'auto' : '5rem'}
        >
            <Box
                w={isExpanded ? 'auto' : 0}
            >
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
            </Box>
            <Spacer />
            <LeftBottomMenu isExpanded={isExpanded} setisExpanded={setIsExpanded} />
        </Flex>
    )
}

/**
 * Left bottom menu (part of the left navigation bar).
 */
interface LeftBottomMenuProps {
    isExpanded: boolean;
    setisExpanded: Dispatch<SetStateAction<boolean>>;
}
const LeftBottomMenu: FC<LeftBottomMenuProps> = ({ isExpanded, setisExpanded }) => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Flex
            borderTop={isExpanded ? '1px solid' : undefined }
            borderTopColor='gray.200'
            py={5}
            gap={3}
            flexDir={isExpanded ? 'row' : 'column'}
            alignItems={isExpanded ? 'flex-start' : 'center'}
        >
            <Button
                size='sm'
                variant='ghost'
                flex={isExpanded ? 1 : 'auto'}
                justifyContent='start'
                fontWeight='normal'
                onClick={toggleColorMode}
            >
                <SunIcon mr={isExpanded ? 2 : 0} />
                { 
                    isExpanded && (colorMode === 'light' ? 'Light' : 'Dark') 
                }
            </Button>
            <IconButton
                icon={
                    <HideSidebarIcon
                        transform={!isExpanded ? 'rotate(180deg)' : undefined} 
                        transition='transform 0.2s ease-in-out'
                    />
                }
                aria-label={`${isExpanded ? 'Close' : 'Open'}`}
                size='sm'
                variant='ghost'
                onClick={() => setisExpanded(!isExpanded)}
            />
        </Flex>
    )
}

export default LeftNav
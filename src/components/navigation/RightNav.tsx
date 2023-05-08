import React, { FC } from "react";
import { Box, Flex, Link, VStack } from "@chakra-ui/react";
import { NavMenuItem } from "./navigation.types";
import { ArrowForwardIcon, ArrowLeftIcon } from "@chakra-ui/icons";

// Example menu structure - this would be fetched from a CMS or other data source
const menuStructure: NavMenuItem[] = [
    {
        name: 'Quick Start from Template',
        href: '#',
        children: [
            {
                name: 'Deploy to Vercel',
                href: '#'
            },
            {
                name: 'Fork the Template',
                href: '#'
            },
        ]
    },
    {
        name: 'Start as New Project',
        href: '#',
        children: [
            {
                name: 'Install ',
                href: '#'
            },
            {
                name: 'Add Next.js Config',
                href: '#',
                isActive: true,
            },
            {
                name: 'Create Docs Theme Config',
                href: '#'
            },
            {
                name: 'Ready to Go!',
                href: '#'
            },
        ]
    },
];

const generateMenuItem = (item: NavMenuItem, intendation: number = 0) => {

    let children = null;

    if (item.children) {
        children = item.children.map((child) => {
            return generateMenuItem(child, intendation + 1);
        });
    }

    return (
        <Box
            display='block'
            key={item.name}
            py={1}    
        >
            <Link 
                href={item.href}
                paddingLeft={intendation * 4}
                opacity={item.isActive ? 1 : 0.8}
                color={item.isActive ? 'blue.500' : 'gray.800'}
                fontWeight={item.isActive ? 'semibold' : 'normal'}
                _hover={{
                    textDecoration: 'none',
                    opacity: 1
                }}
                transition='opacity 0.2s ease-in-out'
            >{item.name}</Link>
            {children}
        </Box>
    )
};

/**
 * Right navigation bar.
 */
const RightNav: FC = () => {
    return (
        <Box 
            as='aside'
        >
            <Flex
                as='nav'
                direction='column'
                fontSize='sm'
            >
                {menuStructure.map((item) => generateMenuItem(item))}
            </Flex>
            <Box
                mt={7}
                pt={7}
                borderTop='1px solid'
                borderTopColor='gray.200'
                fontSize='xs'
            >
                {
                    //TODO: Outsource shared props to a variable
                }
                <VStack rowGap={1} textAlign='left'>
                    <Link
                        href='#'
                        w='100%'
                        display='block'
                        color='gray.800'
                        opacity={0.8}
                        _hover={{
                            textDecoration: 'none',
                            opacity: 1
                        }}
                    >Question? Give us feedback <ArrowForwardIcon /></Link>
                    <Link
                        href='#'
                        w='100%'
                        display='block'
                        color='gray.800'
                        opacity={0.8}
                        _hover={{
                            textDecoration: 'none',
                            opacity: 1
                        }}
                        transition='opacity 0.2s ease-in-out'
                    >Question? Give us feedback <ArrowForwardIcon /></Link>
                </VStack>
            </Box>
        </Box>
    )
}

export default RightNav;
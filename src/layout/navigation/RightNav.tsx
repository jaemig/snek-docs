import React, { FC } from "react";
import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import MemoizedLinks from "../../components/MemoizedLink";
import TableOfContent from "./components/TableOfContent";
import { NavMenuItem } from "../../types/navigation";

// Example links - these would probably be fetched from a CMS or other data source
const links = [
    {
        name: 'Question? Give us feedback',
        href: '#'
    },
    {
        name: 'Edit this page on GitHub',
        href: '#'
    },
];

/**
 * Right navigation bar.
 */
const RightNav: FC = ({  }) => {
    return (
        <Box
            position='sticky'
            top='80px'
            as='aside'
            display={{ base: 'none', xl: 'block' }}
            color='shared.text.default'
            fontSize='sm'
        >
            <Text 
                color='rightNav.titleTop.color'
                fontWeight='semibold'
            >On This Page</Text>
            <Flex
                as='nav'
                direction='column'
                mt={5}
            >
                <TableOfContent />
            </Flex>
            <Box
                mt={7}
                pt={7}
                borderTop='1px solid'
                borderTopColor='components.separator.borderColor'
                fontSize='xs'
            >
                <VStack rowGap={1} textAlign='left'>
                    <MemoizedLinks links={links} props={{
                        variant: 'right-bottom-nav',
                        w: '100%',
                        display: 'block'
                    }} />
                </VStack>
            </Box>
        </Box>
    )
}

export default RightNav;
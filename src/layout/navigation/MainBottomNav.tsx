import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, Link, Spacer, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { LinkData } from "./navigation.types";

interface MainBottomNavProps {
    previousPage?: LinkData;
    nextPage?: LinkData;
}

const props = {
    opacity: 0.7,
    _hover: {
        color: 'main.bottomNav.linkHoverColor',
        opacity: 1,
    },
}

/**
 * Main bottom navigation component.
 * This shows links to the respective previous and next page.
 */
const MainBottomNav: FC<MainBottomNavProps> = ({ previousPage, nextPage }) => {

    return (
        <Flex
            borderTop='1px solid'
            borderColor='main.bottomNav.borderColor'
            mt={10}
            pt={5}
        >
            {
                previousPage && (
                    <Link 
                        href={previousPage.href}
                        {...props}
                    >
                        <ChevronLeftIcon />
                        <Text
                            as='span'
                            verticalAlign='middle'
                        >{ previousPage.name }</Text>
                    </Link>
                )
            }
            <Spacer />
            {
                nextPage && (
                    <Link 
                        href={nextPage.href}
                        {...props}
                    >
                        <Text
                        as='span'
                        verticalAlign='middle'
                        >{ nextPage.name }</Text>
                        <ChevronRightIcon />
                    </Link>
                )
            }
        </Flex>
    );
};

export default MainBottomNav;
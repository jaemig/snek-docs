import { Box, Flex, VStack } from "@chakra-ui/react";
import React, { FC } from "react";
import MainBreadcrumb from "./MainBreadcrumb";
import MainContent from "./MainContent";
import MainBottomNav from "../navigation/MainBottomNav";

/**
 * Main wrapper component.
 */
const MainWrapper: FC = () => {
    return (
        <Flex
            as='main'
            px={{ base: 0, md: 0 }}
            direction='column'
        >
            <MainBreadcrumb />
            <MainContent />
            <MainBottomNav
                previousPage={{ href: '#', name: 'Flamingo Facts'}}
                nextPage={{ href: '#', name: 'Wacky Wings'}} 
            />
        </Flex>
    )
}

export default MainWrapper;
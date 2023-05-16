import { CheckIcon, Icon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Flex, Spacer, Button, IconButton, useColorMode, Menu, MenuButton, MenuList, MenuItem, ColorMode } from "@chakra-ui/react";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import HideSidebarIcon from "../../components/icons/HideSidebar";
import PageDirectory from "./components/PageDirectory";
import NavbarControls from "./components/NavbarControls";

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
            color='text'
        >
            <Box w={isExpanded ? 'auto' : 0} >
                <PageDirectory isExpanded={isExpanded} />
            </Box>
            <Spacer />
            <NavbarControls isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        </Flex>
    )
}

export default LeftNav
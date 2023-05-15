import { CheckIcon, Icon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Flex, Spacer, Button, IconButton, useColorMode, Menu, MenuButton, MenuList, MenuItem, ColorMode } from "@chakra-ui/react";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import HideSidebarIcon from "../../components/icons/HideSidebar";
import PageDirectory from "./components/PageDirectory";

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
            <Box
                w={isExpanded ? 'auto' : 0}
            >
                <PageDirectory isExpanded={isExpanded} />
            </Box>
            <Spacer />
            <LeftBottomMenu isExpanded={isExpanded} setisExpanded={setIsExpanded} />
        </Flex>
    )
}

/**
 * Memoized color mode menu items.
 */
const colorModes = ['Light', 'Dark', 'System'];
//TODO: Fix system color mode toggle (doesnt work - doesnt stay in sync with system)
const MemoizedColorModeMenuItems = React.memo<{currentColorMode: ColorMode, toggleColorMode: () => void }>(({ currentColorMode, toggleColorMode }) => {
    return (
        <>
            {
                colorModes.map((mode, i) => {
                    const isCurrentColorMode = currentColorMode === mode.toLocaleLowerCase();
                    return (
                        <MenuItem
                            key={i}
                            position='relative'
                            disabled={isCurrentColorMode}
                            onClick={!isCurrentColorMode && mode !== 'System' ? toggleColorMode : undefined}
                        >
                            { mode }
                            { 
                                isCurrentColorMode && (
                                    <CheckIcon
                                        position='absolute'
                                        right={3}
                                        top='50%'
                                        transform='translateY(-50%)'
                                        boxSize='10px'
                                    /> 
                                )
                            }
                        </MenuItem>
                    )
                })
            }
        </>
    )
}, (prevProps, nextProps) => prevProps.currentColorMode === nextProps.currentColorMode);

/**
 * Left bottom menu (part of the left navigation bar).
 */
interface LeftBottomMenuProps {
    isExpanded: boolean;
    setisExpanded: Dispatch<SetStateAction<boolean>>;
}
const LeftBottomMenu: FC<LeftBottomMenuProps> = ({ isExpanded, setisExpanded }) => {
    const { colorMode, toggleColorMode } = useColorMode();

    const isLightColorMode = colorMode === 'light';
    return (
        <Flex
            borderTop={isExpanded ? '1px solid' : undefined }
            borderTopColor='gray.200'
            py={5}
            gap={3}
            flexDir={isExpanded ? 'row' : 'column'}
            alignItems='center'
        >
            <Menu 
                placement='top'
                variant='brand-hover'
                isLazy
            >
                <MenuButton
                    as={Button}
                    size='sm'
                    variant='ghost'
                    flex={isExpanded ? 1 : 'auto'}
                    textAlign='left'
                >
                    <Icon as={isLightColorMode ? SunIcon : MoonIcon} mr={isExpanded ? 2 : 0} />
                { 
                    isExpanded && (isLightColorMode ? 'Light' : 'Dark') 
                }
                </MenuButton>
                <MenuList>
                    <MemoizedColorModeMenuItems
                        currentColorMode={colorMode}
                        toggleColorMode={toggleColorMode}
                    />
                </MenuList>
            </Menu>
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
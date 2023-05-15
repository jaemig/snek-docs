import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Input, InputGroup, InputRightElement, Kbd, useDisclosure } from "@chakra-ui/react";
import React, { FC } from "react";

interface MobileNavDrawerProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

/**
 * The mobile navigation drawer.
 * This is used for mobile devices and contains all core menus and search functionalities.
 */
const MobileNavDrawer: FC<MobileNavDrawerProps> = ({ isOpen, onOpen, onClose }) => {
    return (
        <Drawer 
            isOpen={isOpen}
            onClose={onClose}
            placement='top'
            size='full'
        >
            <DrawerOverlay />
            <DrawerContent zIndex={1000}>
                <DrawerBody pt={20}>
                    { /* // TODO: Outsource search to own component */ }
                    <InputGroup
                        size='sm'
                    >
                        <Input
                            htmlSize={20}
                            placeholder='Search documentation'
                            borderRadius='md'
                            backgroundColor='blackAlpha.50'
                            pr='45px'
                            _focus={{
                                backgroundColor: 'topNav.input.focus.bgColor',
                            }}
                            focusBorderColor='theme.500'
                        />
                        <InputRightElement
                            children={
                                <Kbd
                                    borderBottomWidth={1}
                                    background='transparent'
                                    borderRadius={4}
                                    py={0.5}
                                >⌘ K</Kbd>
                            }
                            pr='10px' 
                            color='rgb(107, 114, 128)'
                        />
                    </InputGroup>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default MobileNavDrawer;
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Input, InputGroup, InputRightElement, Kbd, useDisclosure } from "@chakra-ui/react";
import React, { FC } from "react";
import SearchInput from "./components/SearchInput";
import PageDirectory from "./components/PageDirectory";

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
                    <SearchInput />
                    <PageDirectory 
                        isMobile={true}
                        closeMobileDrawer={onClose}
                    />
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default MobileNavDrawer;
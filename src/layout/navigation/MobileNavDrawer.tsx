import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure } from "@chakra-ui/react";
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
        <Drawer isOpen={isOpen} onClose={onClose} placement='top' size='full'>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Mobile Menu</DrawerHeader>
                <DrawerBody>
                    
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default MobileNavDrawer;
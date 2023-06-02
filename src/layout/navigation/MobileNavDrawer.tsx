import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay
} from '@chakra-ui/react'
import React, {FC} from 'react'
import SearchInput from '../../components/search/SearchInput'
import PageDirectory from './components/PageDirectory'
import NavbarControls from './components/NavbarControls'
import SearchMenu from '../../components/search/SearchMenu'

interface MobileNavDrawerProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

/**
 * The mobile navigation drawer.
 * This is used for mobile devices and contains all core menus and search functionalities.
 */
const MobileNavDrawer: FC<MobileNavDrawerProps> = ({
  isOpen,
  onOpen,
  onClose
}) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="top" size="full">
      <DrawerOverlay />
      <DrawerContent zIndex={1000} bgColor="shared.body">
        <DrawerBody pt={20}>
          <SearchMenu menuProps={{matchWidth: true}} />
          <Box mt={5}>
            <PageDirectory isMobile closeMobileDrawer={onClose} />
          </Box>
          <NavbarControls isMobile />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileNavDrawer

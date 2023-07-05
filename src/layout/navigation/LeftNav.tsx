import { Box, Flex, Spacer } from '@chakra-ui/react';
import { FC, ReactNode, useState } from 'react';
import PageDirectory from './components/PageDirectory';
import NavbarControls from './components/NavbarControls';
import { useNavOffset } from '../../hooks/use-nav-offset';
import { useMenuContext } from '../../contexts/menu';

interface ILeftNavProps {
  isExpanded?: boolean;
  children: ReactNode;
}

/**
 * Left navigation bar.
 */
const LeftNav: FC<ILeftNavProps> = ({ isExpanded, children }) => {
  const navTopOffset = useNavOffset();
  return (
    <Flex
      position="sticky"
      top={`calc(70px + ${navTopOffset})`}
      as="nav"
      fontSize="sm"
      flexDirection="column"
      h={`calc(100vh - 100px - ${navTopOffset})`}
      w={isExpanded ? 'auto' : '5rem'}
      color="shared.text.default"
    >
      {children}
    </Flex>
  );
};

export default LeftNav;

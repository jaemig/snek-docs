import React, { FC, useEffect, useState } from 'react';
import TopNav from './navigation/TopNav';
import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import theme from '../theme/theme';
import Footer from './Footer';
import { PageManagerProvider, useJaenPageTree } from '@snek-at/jaen';
import Filesystem from '../components/main-content/filesystem/Filesystem';
import DocsLayout from './DocsLayout';
import { useNavOffset } from '../hooks/use-nav-offset';
import { useLocation } from '@reach/router';
import { convertPageTreeToMenu } from '../functions/navigation';
import { TMenuStructure } from '../types/menu';
import { MenuContext } from '../contexts/menu';

interface AppLayoutProps {
  children?: React.ReactNode;
  isDocs?: React.ReactNode;
  path?: string;
}

/**
 * The global layout component.
 * This should not be directly used in pages, but used in gatsby.
 */
const AppLayout: FC<AppLayoutProps> = ({ children, isDocs, path }) => {
  const pageTree = useJaenPageTree();
  const location = useLocation();
  //TODO: This only works on first load, but not on page change
  const [menuStructure, setMenuStructure] = useState<TMenuStructure>(
    convertPageTreeToMenu(pageTree, location.pathname)
  );

  const navTopOffset = useNavOffset();

  return (
    <ChakraProvider theme={theme}>
      <PageManagerProvider>
        <MenuContext.Provider value={{ menuStructure, setMenuStructure }}>
          <Flex
            minW="210px"
            h="max(100%, 100vh)"
            minH="100vh"
            direction="column"
            pb={5}
          >
            <TopNav />
            <Box flex="1" mt={navTopOffset}>
              {isDocs ? (
                <DocsLayout path={path}>{children}</DocsLayout>
              ) : (
                <>{children}</>
              )}
            </Box>
          </Flex>
        </MenuContext.Provider>
        <Footer />
      </PageManagerProvider>
    </ChakraProvider>
  );
};

export default AppLayout;

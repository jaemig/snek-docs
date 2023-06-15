import React, { FC, useMemo } from 'react';
import TopNav from './navigation/TopNav';
import { Box, Button, ChakraProvider, Flex } from '@chakra-ui/react';
import theme from '../theme/theme';
import Footer from './Footer';
import { PageManagerProvider, useJaenPageTree } from '@snek-at/jaen';
import DocsLayout from './DocsLayout';
import { useNavOffset } from '../hooks/use-nav-offset';
import { useLocation } from '@reach/router';
import { convertPageTreeToMenu } from '../functions/navigation';
import { MenuContext } from '../contexts/menu';

interface AppLayoutProps {
  children?: React.ReactNode;
  isDocs?: boolean;
  path?: string;
}

/**
 * The global layout component.
 * This should not be directly used in pages, but used in gatsby.
 */
const AppLayout: FC<AppLayoutProps> = ({ children, isDocs, path }) => {
  const pageTree = useJaenPageTree();
  const location = useLocation();

  // This generates the menu structure from the page tree that is used over the whole app by accessing the context.
  const menuStructure = useMemo(
    () => convertPageTreeToMenu(pageTree, location.pathname),
    [pageTree, path]
  );

  const navTopOffset = useNavOffset();

  return (
    <ChakraProvider theme={theme}>
      <PageManagerProvider>
        <MenuContext.Provider value={{ menuStructure }}>
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

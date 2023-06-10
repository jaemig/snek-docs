import React, { FC, useEffect } from 'react';
import TopNav from './navigation/TopNav';
import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import theme from '../theme/theme';
import Footer from './Footer';
import { PageManagerProvider } from '@snek-at/jaen';
import Filesystem from '../components/main-content/filesystem/Filesystem';
import DocsLayout from './DocsLayout';
import { useNavOffset } from '../hooks/use-nav-offset';

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
  const navTopOffset = useNavOffset();

  return (
    <ChakraProvider theme={theme}>
      <PageManagerProvider>
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
        <Footer />
      </PageManagerProvider>
    </ChakraProvider>
  );
};

export default AppLayout;

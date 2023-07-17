import React, { FC, ReactNode, useMemo } from 'react';
import TopNav, {
  TBrandImage,
  TMobileMenuButtonProps,
  TTopNavLinkProps,
  TTopNavWrapperProps
} from './navigation/TopNav';
import { Box, ChakraProvider, Flex, useDisclosure } from '@chakra-ui/react';
import theme from '../theme/theme';
import Footer from './Footer';
import { PageManagerProvider, useJaenPageTree } from '@snek-at/jaen';
import DocsLayout from './DocsLayout';
import { useNavOffset } from '../hooks/use-nav-offset';
import { useLocation } from '@reach/router';
import { convertPageTreeToMenu } from '../functions/navigation';
import { MenuContext } from '../contexts/menu';
import ColorizedUniWienLogo from '../photonq/assets/icons/uni-wien-logo-colorized.svg';
import { THamburgerMenuIconStylerProps } from '../components/core/HamburgerMenuIcon';
import { TSearchMenuStyleProps } from '../components/search/SearchMenu';

interface AppLayoutProps {
  children?: React.ReactNode;
  isDocs?: boolean;
  path?: string;
  footer?: FC;
  customTopNavDisclosure?: ReturnType<typeof useDisclosure>;
  topNavProps?: {
    isVisible?: boolean;
    wrapper?: TTopNavWrapperProps;
    link?: TTopNavLinkProps;
    colorMode?: 'light' | 'dark';
    hamburger?: THamburgerMenuIconStylerProps;
    searchProps?: TSearchMenuStyleProps;
    mobileMenuButtonProps?: TMobileMenuButtonProps;
  };
  brandImage?: TBrandImage;
}

/**
 * The global layout component.
 * This should not be directly used in pages, but used in gatsby.
 */
const AppLayout: FC<AppLayoutProps> = ({
  children,
  isDocs,
  path,
  footer,
  customTopNavDisclosure,
  topNavProps,
  brandImage
}) => {
  const pageTree = useJaenPageTree();
  const location = useLocation();
  const topNavDisclosure = useDisclosure(); // for the top nav mobile drawer

  // This generates the menu structure from the page tree that is used over the whole app by accessing the context.
  const menuStructure = useMemo(
    () => convertPageTreeToMenu(pageTree, location.pathname),
    [pageTree, path]
  );

  const navTopOffset = useNavOffset();

  const FooterComp = footer ? footer : Footer;

  return (
    <ChakraProvider theme={theme}>
      <MenuContext.Provider value={{ menuStructure }}>
        <Flex
          minW="210px"
          h="max(100%, 100vh)"
          minH="100vh"
          direction="column"
          pb={5}
        >
          {topNavProps?.isVisible && (
            <TopNav
              drawerDisclosure={customTopNavDisclosure ?? topNavDisclosure}
              linkProps={topNavProps?.link}
              wrapperProps={topNavProps?.wrapper}
              colorMode={topNavProps?.colorMode}
              hamburgerIconProps={topNavProps?.hamburger}
              searchProps={topNavProps?.searchProps}
              mobileMenuButtonProps={topNavProps?.mobileMenuButtonProps}
              brandImage={brandImage}
            />
          )}
          <Box flex="1" mt={navTopOffset}>
            {isDocs ? (
              <DocsLayout path={path}>{children}</DocsLayout>
            ) : (
              <>{children}</>
            )}
          </Box>
        </Flex>
      </MenuContext.Provider>
      <FooterComp />
    </ChakraProvider>
  );
};

export default AppLayout;

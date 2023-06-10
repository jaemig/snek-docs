import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { Box, Grid } from '@chakra-ui/react';
import { useJaenPageTree } from '@snek-at/jaen';
import LeftNav from './navigation/LeftNav';
import MainBreadcrumb from './navigation/components/MainBreadcrumb';
import {
  buildActiveMenuItemIndexArray,
  convertPageTreeToMenu,
  createBreadCrumbParts
} from '../functions/navigation';
import { MainBreadcrumbPart } from '../types/navigation';
import { useNavOffset } from '../hooks/use-nav-offset';
import { MenuContext } from '../contexts/menu';
import { TMenuStructure } from '../types/menu';

interface DocsLayoutProps {
  children?: React.ReactNode;
  path?: string;
}

const DocsLayout: FC<DocsLayoutProps> = ({ children, path }) => {
  const pageTree = useJaenPageTree();
  //TODO: This only works on first load, but not on page change
  const [menuStructure, setMenuStructure] = useState<TMenuStructure>(
    convertPageTreeToMenu(pageTree)
  );

  console.log('ms: ', convertPageTreeToMenu(pageTree));
  // const menuStructure = useMemo(
  //   () => convertPageTreeToMenu(pageTree),
  //   [pageTree, path]
  // );

  const breadcrumbParts: MainBreadcrumbPart[] = useMemo(() => {
    return [
      {
        name: 'Documentation',
        isDisabled: true,
        href: '/docs'
      },
      ...createBreadCrumbParts(menuStructure)
    ];
  }, [pageTree, path]);

  // const navOffset = useNavOffset();

  const memoedChildren = useMemo(() => children, [children]);

  //Bug: This causes a render loop
  // useEffect(() => {
  //   setMenuStructure(convertPageTreeToMenu(pageTree
  // }, [pageTree, path]);

  return (
    <MenuContext.Provider value={{ menuStructure, setMenuStructure }}>
      <Grid
        flex={1}
        mt={5}
        maxW="7xl"
        h="100%"
        mx="auto"
        templateRows="1fr"
        templateColumns={{
          base: '1fr',
          md: '0.8fr 2fr',
          xl: 'minmax(auto, 250px) minmax(auto, 4fr)'
        }}
        gap={10}
        px={{ base: 7, xl: 0 }}
      >
        <Box
          display={{ base: 'none', md: 'block' }}
          position="sticky"
          // top={`calc(100px + ${navOffset})`}
        >
          <LeftNav menuData={menuStructure} />
        </Box>
        <Box>
          <MainBreadcrumb parts={breadcrumbParts} />

          <Box>{memoedChildren}</Box>
        </Box>
      </Grid>
    </MenuContext.Provider>
  );
};

export default DocsLayout;

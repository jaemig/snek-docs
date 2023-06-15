import React, { FC, useMemo } from 'react';
import { Box, Grid } from '@chakra-ui/react';
import LeftNav from './navigation/LeftNav';
import MainBreadcrumb from './navigation/components/MainBreadcrumb';
import { createBreadCrumbParts } from '../functions/navigation';
import { MainBreadcrumbPart } from '../types/navigation';
import { useMenuContext } from '../contexts/menu';

interface DocsLayoutProps {
  children?: React.ReactNode;
  path?: string;
}

const DocsLayout: FC<DocsLayoutProps> = ({ children, path }) => {
  const { menuStructure } = useMenuContext();

  const breadcrumbParts: MainBreadcrumbPart[] = useMemo(() => {
    return [
      {
        name: 'Documentation',
        isDisabled: true,
        href: '/docs'
      },
      ...createBreadCrumbParts(menuStructure)
    ];
  }, [menuStructure]);

  const memoedChildren = useMemo(() => children, [children]);

  return (
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
      <Box overflow="hidden">
        <MainBreadcrumb parts={breadcrumbParts} />

        <Box>{memoedChildren}</Box>
      </Box>
    </Grid>
  );
};

export default DocsLayout;

import { Box, Spacer } from '@chakra-ui/react';
import React, { FC, useMemo, useState } from 'react';
import { useMenuContext } from '../contexts/menu';
import { createBreadCrumbParts } from '../functions/navigation';
import { MainBreadcrumbPart } from '../types/navigation';
import LeftNav from './navigation/LeftNav';
import MainBreadcrumb from './navigation/components/MainBreadcrumb';
import NavbarControls from './navigation/components/NavbarControls';
import PageDirectory from './navigation/components/PageDirectory';
import MainGrid from './components/MainGrid';

interface DocsLayoutProps {
  children?: React.ReactNode;
  path?: string;
}

const DocsLayout: FC<DocsLayoutProps> = ({ children, path }) => {
  const { menuStructure } = useMenuContext();

  const [isExpanded, setIsExpanded] = useState(true);

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
    <MainGrid>
      <Box display={{ base: 'none', md: 'block' }} position="sticky">
        <LeftNav isExpanded={isExpanded}>
          <Box w={isExpanded ? 'auto' : 0}>
            <PageDirectory data={menuStructure} isExpanded={isExpanded} />
          </Box>
          <Spacer />
          <NavbarControls
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          />
        </LeftNav>
      </Box>

      <Box minW="full">
        <Box overflow="hidden">
          <MainBreadcrumb parts={breadcrumbParts} />
        </Box>
        <Box>{memoedChildren}</Box>
      </Box>
    </MainGrid>
  );
};

export default DocsLayout;

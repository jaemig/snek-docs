import { Box, Flex, Spacer } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import PageDirectory from './components/PageDirectory';
import NavbarControls from './components/NavbarControls';
import { convertPageTreeToMenu } from '../../functions/utils';
import { useNavOffset } from '../../hooks/use-nav-offset';

interface ILeftNavProps {
  menuData: ReturnType<typeof convertPageTreeToMenu>;
}

/**
 * Left navigation bar.
 */
const LeftNav: FC<ILeftNavProps> = ({ menuData }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const navTopOffset = useNavOffset();

  return (
    <Flex
      position="sticky"
      top={`calc(80px + ${navTopOffset})`}
      as="nav"
      fontSize="sm"
      flexDirection="column"
      h="calc(100vh - 100px)"
      w={isExpanded ? 'auto' : '5rem'}
      color="shared.text.default">
      <Box w={isExpanded ? 'auto' : 0}>
        <PageDirectory data={menuData} isExpanded={isExpanded} />
      </Box>
      <Spacer />
      <NavbarControls isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
    </Flex>
  );
};

export default LeftNav;

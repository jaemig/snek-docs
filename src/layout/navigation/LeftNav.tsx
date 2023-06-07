import { Box, Flex, Spacer } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import PageDirectory from './components/PageDirectory';
import NavbarControls from './components/NavbarControls';
import { useNavOffset } from '../../hooks/use-nav-offset';
import { convertPageTreeToMenu } from '../../functions/navigation';
import { useMenuContext } from '../../contexts/menu';

interface ILeftNavProps {
  menuData: ReturnType<typeof convertPageTreeToMenu>;
}

/**
 * Left navigation bar.
 */
const LeftNav: FC<ILeftNavProps> = ({ menuData }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const navTopOffset = useNavOffset();

  const { menuStructure } = useMenuContext();

  return (
    <Flex
      position="sticky"
      top={`calc(70px + ${navTopOffset})`}
      as="nav"
      fontSize="sm"
      flexDirection="column"
      h={`calc(100vh - 100px - ${navTopOffset})`}
      w={isExpanded ? 'auto' : '5rem'}
      color="shared.text.default">
      <Box w={isExpanded ? 'auto' : 0}>
        <PageDirectory data={menuStructure} isExpanded={isExpanded} />
      </Box>
      <Spacer />
      <NavbarControls isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
    </Flex>
  );
};

export default LeftNav;

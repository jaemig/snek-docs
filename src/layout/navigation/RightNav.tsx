import React, { FC, ReactNode, memo } from 'react';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import MemoizedLinks from '../../shared/components/MemoizedLink';
import TableOfContent from './components/TableOfContent';
import { useNavOffset } from '../../shared/hooks/use-nav-offset';

interface IRightNavProps {
  children?: ReactNode;
}

/**
 * Right navigation bar.
 */
const RightNav: FC<IRightNavProps> = ({ children }) => {
  const navTopOffset = useNavOffset();

  return (
    <Box
      position="sticky"
      top={`calc(70px + ${navTopOffset})`}
      as="aside"
      display={{ base: 'none', xl: 'block' }}
      color="shared.text.default"
      fontSize="sm"
    >
      {children}
    </Box>
  );
};

export default RightNav;

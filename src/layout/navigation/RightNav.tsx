import React, { FC, memo } from 'react';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import MemoizedLinks from '../../components/app/MemoizedLink';
import TableOfContent from './components/TableOfContent';
import { useNavOffset } from '../../hooks/use-nav-offset';

// Example links - these would probably be fetched from a CMS or other data source
const links = [
  {
    name: 'Question? Give us feedback',
    href: 'https://snek.at/'
  },
  {
    name: 'Edit this page on GitHub',
    href: 'https://github.com/Jan-Emig/snek-docs'
  }
];

/**
 * Right navigation bar.
 */
const RightNav: FC = ({}) => {
  // This can be memoized since it doesn't change and switching pages re-renders most of the app anyway.
  const MemoizedToc = memo(TableOfContent, () => false);
  const navTopOffset = useNavOffset();

  return (
    <Box
      position="sticky"
      top={`calc(70px + ${navTopOffset})`}
      as="aside"
      display={{ base: 'none', xl: 'block' }}
      color="shared.text.default"
      fontSize="sm">
      <Text color="rightNav.titleTop.color" fontWeight="semibold">
        On This Page
      </Text>
      <Flex as="nav" direction="column" mt={5}>
        <MemoizedToc />
      </Flex>
      <Box
        mt={7}
        pt={7}
        borderTop="1px solid"
        borderTopColor="components.separator.borderColor"
        fontSize="xs">
        <VStack rowGap={1} textAlign="left">
          <MemoizedLinks
            links={links}
            props={{
              variant: 'right-bottom-nav',
              w: '100%',
              display: 'block'
            }}
          />
        </VStack>
      </Box>
    </Box>
  );
};

export default RightNav;

import {
  Box,
  Flex,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Text as ChText,
  Button,
  HStack,
  useDisclosure,
  Grid
} from '@chakra-ui/react';
import { Field } from '@snek-at/jaen';
import React, { FC, memo } from 'react';

import { useNavOffset } from '../shared/hooks/use-nav-offset';

// Default custom components (replaces HTML tags)
import Text from '../features/main-content/text/components/Text';
import Heading from '../features/main-content/heading/components/Heading';
import List from '../features/main-content/list/components/List';
import CodeSnippet from '../features/main-content/code-snippet/components/CodeSnippet';
import Link from '../shared/components/Link';

// Insertable custom components (via Jaen)
import Filesystem from '../features/main-content/filesystem/components/Filesystem';
import ImageCard from '../features/main-content/image-card/components/ImageCard';
import Callout from '../features/main-content/callout/components/Callouts';
import IconCard from '../features/main-content/icon-card/components/IconCard';
import MemoizedLinks from '../shared/components/MemoizedLink';
import ListItem from '../features/main-content/list/components/ListItem';
import TableOfContent from '../shared/containers/navigation/components/TableOfContent';
import MainBottomNav from '../shared/containers/navigation/MainBottomNav';
import RightNav from '../shared/containers/navigation/RightNav';
import CodePlayground from '../features/main-content/code-playground/components/CodePlayground';
import PostPublishModal from '../features/post/editor/components/PostPublishModal';
import PostReviewModal from '../features/post/editor/components/PostReviewModal';
import LeftNav from '../shared/containers/navigation/LeftNav';
import MainGrid from '../shared/containers/components/MainGrid';
import UserAvatar from '../features/user/avatar/components/UserAvatar';
import { TUser } from '../features/user/types/user';

// Example links - these would probably be fetched from a CMS or other data source
const links = [
  {
    name: 'Question? Give us feedback',
    href: 'https://snek.at/'
  },
  {
    name: 'Edit this page on Jaen',
    href: '/admin/#/pages'
  }
];

// Placeholder data
const user: TUser = {
  username: 'emilybrooks',
  displayName: 'Emily Brooks',
  bio: '',
  socials: []
};

export interface IBlogPostContentProps {}

const BlogPostContent: FC<IBlogPostContentProps> = () => {
  const navTopOffset = useNavOffset();

  const publishDisclosure = useDisclosure();

  // This can be memoized since it doesn't change and switching pages re-renders most of the app anyway.
  const MemoizedToc = memo(TableOfContent, () => false);

  return (
    <MainGrid>
      <LeftNav w="full">
        <VStack w="50%" minW="100px" alignSelf="center">
          <Button
            size="sm"
            variant="filledGreen"
            onClick={publishDisclosure.onOpen}
            w="full"
          >
            Publish
          </Button>
          <Button size="sm" colorScheme="gray" w="full">
            Save Draft
          </Button>
        </VStack>
      </LeftNav>
      <Stack spacing={{ base: 0, xl: 12 }} direction="row">
        <Box maxW="900px" w="full">
          <Box>
            <UserAvatar user={user} showTooltip />
          </Box>
        </Box>
        <Box position="sticky" top={`calc(0px + ${navTopOffset})`}>
          <RightNav>
            <ChText color="rightNav.titleTop.color" fontWeight="semibold">
              On This Page
            </ChText>
            <Flex as="nav" direction="column" mt={5}>
              <MemoizedToc />
            </Flex>
            <Box
              mt={7}
              pt={7}
              borderTop="1px solid"
              borderTopColor="components.separator.borderColor"
              fontSize="xs"
            >
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
          </RightNav>
        </Box>
      </Stack>
      {/* <PostPublishModal disclosure={publishDisclosure} /> */}
      <PostReviewModal disclosure={publishDisclosure} />
    </MainGrid>
  );
};

export default BlogPostContent;

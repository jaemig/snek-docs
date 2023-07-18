import { ChangeEvent, FC, useMemo, useState } from 'react';
import { TPostPreview } from '../../../types/features/post';
import {
  Button,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  StackProps,
  VStack
} from '@chakra-ui/react';
import {
  ChevronDownIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@chakra-ui/icons';
import PostPreview from '../../photonq/PostPreview';
import usePagination from '../../../hooks/use-pagination';
import PostListControls from './PostListControls';

interface IPostListProps extends StackProps {
  posts: TPostPreview[];
  showControls?: boolean;
}

/**
 * Component for displaying a sort- and filterable list of posts.
 */
const PostList: FC<IPostListProps> = ({ posts, showControls, ...props }) => {
  const pagination = usePagination({
    itemsPerPage: 10,
    totalItems: posts.length
  });

  const toggleLike = (id: TPostPreview['id']) => {
    console.log('toggle like for post ', id);
  };

  /**
   * Search for posts with the given query (filtering)
   */
  const searchPosts = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    console.log('searching for posts with query ', query);
  };

  const memoizedPostPreviews = useMemo(() => {
    const offset = (pagination.currentPage - 1) * pagination.itemsPerPage;
    return posts
      .slice(offset, offset + pagination.itemsPerPage)
      .map(postPreview => (
        <PostPreview
          key={postPreview.id}
          toggleLike={toggleLike}
          {...postPreview}
          wrapperProps={{ minW: '33%' }}
        />
      ));
  }, [posts, pagination]);

  return (
    <VStack w="full" gap={5} {...props}>
      {showControls && <PostListControls search={searchPosts} />}
      <SimpleGrid spacing={5} columns={{ base: 1, sm: 2 }}>
        {memoizedPostPreviews}
      </SimpleGrid>
      <HStack
        alignContent="space-around"
        display={pagination.totalPages === 1 ? 'none' : 'initial'}
      >
        <Button
          variant="ghost-hover-outline"
          size="sm"
          borderRadius="lg"
          leftIcon={<ChevronLeftIcon />}
          isDisabled={pagination.currentPage === 1}
          onClick={pagination.previousPage}
        >
          Previous
        </Button>
        <Button
          variant="ghost-hover-outline"
          size="sm"
          borderRadius="lg"
          rightIcon={<ChevronRightIcon />}
          isDisabled={pagination.currentPage === pagination.totalPages}
          onClick={pagination.nextPage}
        >
          Next
        </Button>
      </HStack>
    </VStack>
  );
};

export default PostList;

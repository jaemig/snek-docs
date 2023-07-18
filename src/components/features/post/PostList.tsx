import { ChangeEvent, FC, ReactNode, useMemo } from 'react';
import { IPostPreviewProps, TPostPreview } from '../../../types/features/post';
import {
  Button,
  HStack,
  SimpleGrid,
  StackProps,
  VStack
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import PostCardPreview from './preview/PostCardPreview';
import usePagination from '../../../hooks/use-pagination';
import PostListControls from './PostListControls';
import PostListItemPreview from './preview/PostListItemPreview';

interface IPostListProps extends StackProps {
  posts: TPostPreview[];
  showControls?: boolean;
  previewType?: 'card' | 'list';
}

/**
 * Component for displaying a sort- and filterable list of posts.
 */
const PostList: FC<IPostListProps> = ({
  posts,
  showControls,
  previewType = 'list',
  ...props
}) => {
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
    let PreviewComp: typeof PostCardPreview | typeof PostListItemPreview;
    type ExtractProps<T> = T extends FC<IPostPreviewProps<infer P>> ? P : never;
    let previewCompProps:
      | ExtractProps<typeof PostCardPreview>
      | ExtractProps<typeof PostListItemPreview> = {};
    //TODO: Add props for both variants
    if (previewType === 'card') {
      PreviewComp = PostCardPreview;
    } else {
      PreviewComp = PostListItemPreview;
    }
    // const PreviewComp =
    //   previewType === 'card' ? PostCardPreview : PostListItemPreview;
    return posts
      .slice(offset, offset + pagination.itemsPerPage)
      .map(postPreview => (
        <PreviewComp
          key={postPreview.id}
          toggleLike={toggleLike}
          {...postPreview}
          {...previewCompProps}
          wrapperProps={{ minW: '33%' }}
        />
      ));
  }, [posts, pagination]);

  let postPreviews: ReactNode;
  if (previewType === 'card') {
    // Shows the posts in a grid of cards
    postPreviews = (
      <SimpleGrid spacing={5} columns={{ base: 1, sm: 2 }}>
        {memoizedPostPreviews}
      </SimpleGrid>
    );
  } else {
    // Shows the posts in a list
    postPreviews = <VStack w="full">{memoizedPostPreviews}</VStack>;
  }

  return (
    <VStack w="full" gap={5} {...props}>
      {showControls && <PostListControls search={searchPosts} />}
      {postPreviews}
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

import {
  ChangeEvent,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useMemo
} from 'react';
import {
  IPostPreviewProps,
  TPostListData,
  TPostPreview
} from '../../../types/features/post';
import {
  Button,
  CardProps,
  HStack,
  LinkBoxProps,
  SimpleGrid,
  Spacer,
  StackProps,
  VStack
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import PostCardPreview from './preview/PostCardPreview';
import usePagination from '../../../hooks/use-pagination';
import PostListControls from './PostListControls';
import PostListItemPreview from './preview/PostListItemPreview';
import PostCardPreviewSkeleton from './preview/PostCardPreviewSkeleton';
import PostListItemPreviewSkeleton from './preview/PostListItemPreviewSkeleton';
import PostListNoResults from './preview/PostListNoResults';

interface IPostListProps extends StackProps {
  setPosts?: Dispatch<SetStateAction<TPostListData>>;
  postData: TPostListData;
  itemsPerPage?: number;
  showControls?: boolean;
  hidePostAuthor?: boolean;
  previewType?: 'card' | 'list';
  skeletonProps?: CardProps & LinkBoxProps;
}

/**
 * Component for displaying a sort- and filterable list of posts.
 */
const PostList: FC<IPostListProps> = ({
  setPosts,
  postData,
  itemsPerPage = 10,
  showControls,
  hidePostAuthor,
  previewType = 'list',
  skeletonProps,
  ...props
}) => {
  const pagination = usePagination({
    itemsPerPage: itemsPerPage,
    totalItems:
      postData.state != 'success' ? itemsPerPage / 2 : postData.posts.length
  });

  const toggleLike = (id: TPostPreview['id']) => {
    console.log('toggle like for post ', id);
  };

  /**
   * Search for posts with the given query (filtering)
   */
  // const searchPosts = (e: ChangeEvent<HTMLInputElement>) => {
  //   const query = e.target.value;
  //   console.log('searching for posts with query ', query);
  // };

  const memoizedPostPreviews = useMemo(() => {
    const offset = (pagination.currentPage - 1) * pagination.itemsPerPage;
    let PreviewComp: typeof PostCardPreview | typeof PostListItemPreview;
    let PreviewSkeletonComp:
      | typeof PostCardPreviewSkeleton
      | typeof PostListItemPreviewSkeleton;
    type ExtractProps<T> = T extends FC<IPostPreviewProps<infer P>> ? P : never;
    let previewCompProps:
      | ExtractProps<typeof PostCardPreview>
      | ExtractProps<typeof PostListItemPreview> = {};

    if (previewType === 'card') {
      PreviewComp = PostCardPreview;
      PreviewSkeletonComp = PostCardPreviewSkeleton;
    } else {
      PreviewComp = PostListItemPreview;
      PreviewSkeletonComp = PostListItemPreviewSkeleton;
    }
    if (postData.state === 'loading') {
      return Array.from({ length: pagination.itemsPerPage }).map((_, i) => (
        <PreviewSkeletonComp
          key={i}
          {...skeletonProps}
          hideAuthor={hidePostAuthor}
        />
      ));
    }
    return postData.posts
      .slice(offset, offset + pagination.itemsPerPage)
      .map(postPreview => (
        <PreviewComp
          key={postPreview.id}
          toggleLike={toggleLike}
          {...postPreview}
          {...previewCompProps}
          hideAuthor={hidePostAuthor}
          wrapperProps={{ minW: '33%' }}
        />
      ));
  }, [postData, pagination]);

  let postPreviews: ReactNode;
  if (memoizedPostPreviews.length > 0) {
    if (previewType === 'card') {
      // Shows the posts in a grid of cards
      postPreviews = (
        <SimpleGrid w="full" spacing={5} columns={{ base: 1, sm: 2 }}>
          {memoizedPostPreviews}
        </SimpleGrid>
      );
    } else {
      // Shows the posts in a list
      postPreviews = (
        <VStack w="full" spacing={5}>
          {memoizedPostPreviews}
        </VStack>
      );
    }
  }

  return (
    <VStack w="full" gap={5} {...props}>
      {showControls && setPosts && <PostListControls setPosts={setPosts} />}
      {postData.state !== 'inactive' &&
        (postPreviews ? postPreviews : <PostListNoResults mt={10} />)}
      {pagination.totalPages > 1 && (
        <HStack
          alignContent="space-around"
          // display={pagination.totalPages > 1 ? 'initial' : 'none'}
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
      )}
    </VStack>
  );
};

export default PostList;

import { Card, CardProps, HStack, Skeleton, Spacer } from '@chakra-ui/react';
import { FC } from 'react';

interface IPostCardPreviewSkeletonProps extends CardProps {
  hideAuthor?: boolean;
}

/**
 * Component for displaying a post preview skeleton.
 */
const PostCardPreviewSkeleton: FC<IPostCardPreviewSkeletonProps> = ({
  hideAuthor,
  ...props
}) => {
  return (
    <Card variant="outline" p={5} borderRadius="xl" {...props}>
      <HStack w="full">
        {!hideAuthor && <Skeleton w="25%" h="0.875rem" />}
        <Spacer />
        <Skeleton w="15%" h="0.875rem" />
      </HStack>
      <Skeleton w="80%" h="1rem" mt={2} />
      <Skeleton w="100%" h="5rem" mt={3} />
      <Skeleton w="20%" h="0.875rem" mt={4} />
    </Card>
  );
};

export default PostCardPreviewSkeleton;

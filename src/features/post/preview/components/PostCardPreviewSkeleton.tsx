import { Card, CardProps, HStack, Skeleton, Spacer } from '@chakra-ui/react';
import { FC } from 'react';
import { postCardPreviewStyling } from './PostCardPreview';

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
    <Card {...postCardPreviewStyling.wrapper} {...props}>
      <HStack {...postCardPreviewStyling.topHStack}>
        {!hideAuthor && <Skeleton w="25%" h="0.875rem" />}
        <Spacer />
        <Skeleton w="15%" h="0.875rem" />
      </HStack>
      <Skeleton w="80%" h="1rem" mt={2} />
      <Skeleton w="100%" h="5rem" {...postCardPreviewStyling.summary} />
      <Skeleton w="20%" h="0.875rem" {...postCardPreviewStyling.bottomHStack} />
    </Card>
  );
};

export default PostCardPreviewSkeleton;

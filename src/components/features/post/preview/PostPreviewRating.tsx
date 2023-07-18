import { FC } from 'react';
import { TPostPreview } from '../../../../types/features/post';
import { Button, HStack, Text } from '@chakra-ui/react';
import { formatNumber } from '../../../../functions/utils';
import TbStar from '../../../icons/tabler/TbStar';

interface IPostPreviewRatingProps {
  id: TPostPreview['id'];
  likes: number;
  hasLiked?: boolean;
  toggleLike: (id: TPostPreview['id']) => void;
  isPostManagable?: boolean;
}

/**
 * Component for displaying a post preview rating.
 */
const PostPreviewRating: FC<IPostPreviewRatingProps> = ({
  id,
  likes,
  hasLiked,
  toggleLike,
  isPostManagable
}) => {
  if (!isPostManagable) {
    return (
      <Button
        display="flex"
        variant="unstyled"
        size="sm"
        color={`components.postCardPreview.rating${
          hasLiked ? '.active' : ''
        }.color`}
        _hover={{
          color: `components.postCardPreview.rating._hover.color`
        }}
        onClick={() => toggleLike(id)}
      >
        <TbStar
          boxSize={3}
          mr={1}
          fill={hasLiked ? 'currentColor' : 'none'}
          stroke={hasLiked ? 'none' : 'currentColor'}
          transition="fill 0.2s ease-in-out, stroke 0.2s ease-in-out"
        />
        <Text fontSize={12}>{formatNumber(likes)}</Text>
      </Button>
    );
  }
  return (
    <HStack
      spacing={1}
      color="components.postCardPreview.rating.disabled.color"
      _hover={{
        color: 'components.postCardPreview.rating._hover.disabled.color'
      }}
      transition="color 0.2s ease-in-out"
    >
      <TbStar boxSize={3} fill="none" stroke="currentColor" />
      <Text fontSize={12}>{formatNumber(likes)}</Text>
    </HStack>
  );
};

export default PostPreviewRating;

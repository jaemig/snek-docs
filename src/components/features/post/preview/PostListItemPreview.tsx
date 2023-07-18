import { FC } from 'react';
import { IPostPreviewProps } from '../../../../types/features/post';
import {
  Box,
  HStack,
  Heading,
  Spacer,
  StackProps,
  Text,
  VStack
} from '@chakra-ui/react';
import Link from '../../../core/Link';
import PostPreviewManageMenu from './PostPreviewManageMenu';
import PostPreviewRating from './PostPreviewRating';

/**
 * Component for displaying a preview of a post in form of a list item.
 */
const PostListItemPreview: FC<IPostPreviewProps<StackProps>> = ({
  id,
  publicationDate,
  title,
  summary,
  hasLiked,
  toggleLike,
  likes,
  url,
  canManage,
  wrapperProps
}) => {
  return (
    <HStack key={id} w="full" h="max-content">
      <VStack spacing={2} alignItems="flex-start">
        <Link
          href={url}
          _hover={{
            color: 'theme.500'
          }}
          transition="color 0.2s ease-in-out"
        >
          <Heading as="h5" size="sm">
            {title}
          </Heading>
        </Link>
        <Text maxW="75%">{summary}</Text>
      </VStack>
      <Spacer />
      <VStack>
        <Box>
          {canManage ? (
            <PostPreviewManageMenu />
          ) : (
            <PostPreviewRating
              id={id}
              likes={likes}
              toggleLike={toggleLike}
              hasLiked={hasLiked}
              isPostManagable={canManage}
            />
          )}
        </Box>
      </VStack>
    </HStack>
  );
};

export default PostListItemPreview;

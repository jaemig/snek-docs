import { FC } from 'react';
import { IPostPreviewProps } from '../../../../types/features/post';
import {
  Box,
  Center,
  HStack,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
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
  author,
  hideAuthor,
  title,
  previewImage,
  summary,
  hasLiked,
  toggleLike,
  likes,
  url,
  canManage,
  wrapperProps
}) => {
  return (
    <LinkBox
      key={id}
      w="full"
      h="max-content"
      bgColor="components.postPreview.listItem.initial.bgColor"
      p={5}
      py={7}
      borderRadius="lg"
      border="1px solid"
      borderColor="components.postPreview.listItem.initial.borderColor"
      _hover={{
        borderColor: 'components.postPreview.listItem._hover.borderColor',
        boxShadow: 'md'
      }}
      transition="border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
      {...wrapperProps}
    >
      <VStack spacing={3} alignItems="flex-start">
        <HStack spacing={4} w="full">
          <Image
            boxSize="75px"
            objectFit="cover"
            src={previewImage ?? 'https://picsum.photos/500'}
            borderRadius="md"
          />
          <VStack alignItems="flex-start">
            <LinkOverlay
              href={url}
              _hover={{
                h5: {
                  color: 'components.postPreview.listItem._hover.title.color'
                }
              }}
            >
              <Heading
                as="h5"
                size="sm"
                color="components.postPreview.listItem.initial.title.color"
                transition="color 0.2s ease-in-out"
              >
                {title}
              </Heading>
            </LinkOverlay>
            <Text
              color="components.postPreview.listItem.initial.date.color"
              fontSize="sm"
            >
              {publicationDate}
            </Text>
          </VStack>
          <Spacer />
          {canManage && <PostPreviewManageMenu alignSelf="flex-start" />}
        </HStack>
        <Text
          maxW="75%"
          color="components.postPreview.listItem.initial.summary.color"
        >
          {summary}
        </Text>
        <HStack spacing={5}>
          {!hideAuthor && (
            <Link
              href={`/profile/${author}`}
              color="components.postPreview.listItem.initial.author.color"
              fontSize="sm"
              variant="hover-theme"
            >
              @{author}
            </Link>
          )}
          <PostPreviewRating
            id={id}
            likes={likes}
            toggleLike={toggleLike}
            hasLiked={hasLiked}
            isPostManagable={canManage}
            useHighContrast
          />
        </HStack>
      </VStack>
      <Spacer />
    </LinkBox>
  );
};

export default PostListItemPreview;

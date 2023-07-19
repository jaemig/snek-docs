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
      as={HStack}
      key={id}
      w="full"
      h="max-content"
      bgColor="gray.50"
      p={5}
      py={7}
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.100"
      _hover={{
        borderColor: 'theme.500',
        boxShadow: 'md'
      }}
      transition="border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
    >
      <VStack spacing={3} alignItems="flex-start">
        <HStack spacing={4}>
          <Image
            boxSize="75px"
            objectFit="cover"
            src={previewImage ?? 'https://picsum.photos/75'}
            borderRadius="md"
          />
          <VStack alignItems="flex-start">
            <LinkOverlay
              href={url}
              _hover={{
                h5: {
                  color: 'theme.500'
                }
              }}
            >
              <Heading
                as="h5"
                size="sm"
                color="shared.text.default"
                transition="color 0.2s ease-in-out"
              >
                {title}
              </Heading>
            </LinkOverlay>
            <Text color="gray.500" fontSize="sm">
              {publicationDate}
            </Text>
          </VStack>
        </HStack>
        <Text maxW="75%" color="gray.600">
          {summary}
        </Text>
        <HStack spacing={5}>
          <Link
            href={`/profile/${author}`}
            color="gray.400"
            fontSize="sm"
            variant="hover-theme"
          >
            @{author}
          </Link>
          {canManage ? (
            <PostPreviewManageMenu />
          ) : (
            <PostPreviewRating
              id={id}
              likes={likes}
              toggleLike={toggleLike}
              hasLiked={hasLiked}
              isPostManagable={canManage}
              useHighContrast
            />
          )}
        </HStack>
      </VStack>
      <Spacer />
    </LinkBox>
  );
};

export default PostListItemPreview;

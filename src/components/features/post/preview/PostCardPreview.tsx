import {
  Button,
  Card,
  HStack,
  Heading,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import TbStar from '../../../icons/tabler/TbStar';
import { formatNumber } from '../../../../functions/utils';
import { IPostPreviewProps } from '../../../../types/features/post';
import PostPreviewRating from './PostPreviewRating';
import PostPreviwManageMenu from './PostPreviewManageMenu';

/**
 * Component for displaying a post preview.
 */
const PostCardPreview: FC<IPostPreviewProps<LinkBoxProps>> = ({
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
  let ratingComp: ReactNode = (
    <PostPreviewRating
      id={id}
      likes={likes}
      toggleLike={toggleLike}
      hasLiked={hasLiked}
      isPostManagable={canManage}
    />
  );
  return (
    // Two possible ways to handle y overflow:
    // 1) Use overflow="hidden" and textOverflow="ellipsis" on the Card component
    // 2) Cut off the text on the server side (easier way)
    <LinkBox
      as={Card}
      variant="outline"
      p={5}
      borderRadius="xl"
      _hover={{
        //! transforming the card causes the menu to be cut off by the sibling card
        // transform: 'scale(1.01)',
        boxShadow: 'md',
        borderColor: 'theme.500',
        h5: {
          color: 'theme.500'
        },
        '.sd-pp-summary': {
          opacity: 1
        }
      }}
      color="shared.text.default"
      transition="all 0.2s cubic-bezier(.17,.67,.83,.67)"
      {...wrapperProps}
    >
      <Stack
        direction={{ base: 'column', md: 'row' }}
        alignItems="flex-start"
        flexWrap="wrap"
      >
        <Heading
          as="h5"
          size="sm"
          transition="color 0.2s ease-in-out"
          flex={1}
          w={{ base: 'full', md: 'auto' }}
          order={{ base: 2, md: 0 }}
        >
          <LinkOverlay href={url}>{title}</LinkOverlay>
        </Heading>
        {canManage ? <PostPreviwManageMenu /> : ratingComp}
      </Stack>
      <Text
        mt={2}
        flexGrow={1}
        opacity={0.75}
        className="sd-pp-summary"
        transition="opacity 0.2s ease-in-out"
      >
        {summary}
      </Text>
      <HStack mt={4}>
        <Text
          fontSize={12}
          color="components.postCardPreview.date.color"
          opacity={0.8}
        >
          {publicationDate}
        </Text>
        {canManage && ratingComp}
      </HStack>
    </LinkBox>
  );
};

export default PostCardPreview;

import {
  Card,
  HStack,
  Heading,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Spacer,
  Text
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { IPostPreviewProps } from '../../../../types/features/post';
import PostPreviewRating from './PostPreviewRating';
import PostPreviewManageMenu from './PostPreviewManageMenu';
import Link from '../../../core/Link';

const postCardPreviewStyling = {
  wrapper: {
    variant: 'outline',
    p: 5,
    borderRadius: 'xl'
  },
  topHStack: {
    w: 'full'
  },
  summary: {
    mt: 2
  },
  bottomHStack: {
    mt: 4
  }
};

/**
 * Component for displaying a post preview.
 */
const PostCardPreview: FC<IPostPreviewProps<LinkBoxProps>> = ({
  id,
  publicationDate,
  author,
  hideAuthor,
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
      {...postCardPreviewStyling.wrapper}
      as={Card}
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
      <HStack {...postCardPreviewStyling.topHStack}>
        <Link
          variant="hover-theme"
          fontSize="sm"
          color="components.postPreview.author.color"
          href={`/profile/${author}`}
        >
          @{author}
        </Link>
        <Spacer />
        {canManage ? <PostPreviewManageMenu /> : ratingComp}
      </HStack>

      <Heading
        as="h5"
        size="sm"
        transition="color 0.2s ease-in-out"
        flex={1}
        w={{ base: 'full', md: 'auto' }}
      >
        <LinkOverlay href={url}>{title}</LinkOverlay>
      </Heading>
      <Text
        {...postCardPreviewStyling.summary}
        flexGrow={1}
        opacity={0.75}
        className="sd-pp-summary"
        transition="opacity 0.2s ease-in-out"
      >
        {summary}
      </Text>
      <HStack
        {...postCardPreviewStyling.bottomHStack}
        // Prevents the date from being placed on top of the link overlay
        pointerEvents="none"
      >
        <Text
          fontSize={12}
          color="components.postPreview.date.color"
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

export { postCardPreviewStyling };

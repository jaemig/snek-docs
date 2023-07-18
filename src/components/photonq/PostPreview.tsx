import {
  Button,
  Card,
  CardProps,
  HStack,
  Heading,
  LinkBox,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import TbStar from '../icons/tabler/TbStar';
import { formatNumber } from '../../functions/utils';
import { TPostPreview } from '../../types/features/post';

/**
 * Component for displaying a post preview.
 */

interface IPostPreviewProps extends TPostPreview {
  toggleLike: (id: TPostPreview['id']) => void;
  canManage?: boolean;
  wrapperProps?: CardProps;
}

const PostPreview: FC<IPostPreviewProps> = ({
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
  let ratingComp: ReactNode = null;
  if (canManage) {
    ratingComp = (
      <HStack
        spacing={1}
        color="components.postPreview.rating.disabled.color"
        _hover={{
          color: 'components.postPreview.rating._hover.disabled.color'
        }}
        transition="color 0.2s ease-in-out"
      >
        <TbStar boxSize={3} fill="none" stroke="currentColor" />
        <Text fontSize={12}>{formatNumber(likes)}</Text>
      </HStack>
    );
  } else {
    ratingComp = (
      <Button
        display="flex"
        variant="unstyled"
        size="sm"
        color={`components.postPreview.rating${
          hasLiked ? '.active' : ''
        }.color`}
        _hover={{
          color: `components.postPreview.rating._hover.color`
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
        {canManage ? (
          <Menu>
            <MenuButton as={Button} size="sm" variant="outline-hover-filled">
              Manage
            </MenuButton>
            <MenuList zIndex={999}>
              {
                //TODO: Add some handy actions here
              }
              <MenuItem>Action 1</MenuItem>
              <MenuItem>Action 2</MenuItem>
              <MenuItem>Action 3</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          ratingComp
        )}
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

export default PostPreview;

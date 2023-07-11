import {
  Button,
  Card,
  CardProps,
  HStack,
  Heading,
  Menu,
  MenuButton,
  Text
} from '@chakra-ui/react';
import { FC } from 'react';
import Link from '../core/Link';
import TbStar from '../icons/tabler/TbStar';
import { SearchIcon } from '@chakra-ui/icons';
import { formatNumber } from '../../functions/utils';

/**
 * Component for displaying a post preview.
 */

interface IPostPreviewProps {
  publicationDate: string;
  title: string;
  summary: string;
  likes: number;
  hasLiked?: boolean;
  url: string;
  canManage?: boolean;
  wrapperProps?: CardProps;
}

const PostPreview: FC<IPostPreviewProps> = ({
  publicationDate,
  title,
  summary,
  hasLiked,
  likes,
  url,
  canManage,
  wrapperProps
}) => {
  const showFilledRating = !canManage && hasLiked;
  const ratingComp = (
    <HStack
      spacing={1}
      color={`components.postPreview.rating.${
        showFilledRating ? 'active' : ''
      }.color`}
      _hover={{
        color: `components.postPreview.rating._hover.${
          showFilledRating ? 'active' : ''
        }.color`
      }}
      cursor="pointer"
      transition="color 0.2s ease-in-out"
    >
      <TbStar
        boxSize={3}
        fill={showFilledRating ? 'currentColor' : 'none'}
        stroke={showFilledRating ? 'none' : 'currentColor'}
      />
      <Text fontSize={12}>{formatNumber(likes)}</Text>
    </HStack>
  );
  return (
    // Two possible ways to handle y overflow:
    // 1) Use overflow="hidden" and textOverflow="ellipsis" on the Card component
    // 2) Cut off the text on the server side (easier way)
    <Card
      variant="outline"
      p={5}
      borderRadius="xl"
      _hover={{
        transform: 'scale(1.01)',
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
      <HStack alignItems="flex-start">
        <Heading as="h5" size="sm" transition="color 0.2s ease-in-out" flex={1}>
          {title}
        </Heading>
        {canManage ? (
          <Menu>
            <MenuButton as={Button} size="sm" variant="outline-hover-filled">
              Manage
            </MenuButton>
          </Menu>
        ) : (
          ratingComp
        )}
      </HStack>
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
    </Card>
  );
};

export default PostPreview;

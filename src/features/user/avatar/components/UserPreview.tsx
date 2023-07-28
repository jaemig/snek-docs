import { FC } from 'react';
import { TUser } from '../../types/user';
import { Avatar, Box, Grid, GridItem, HStack, Text } from '@chakra-ui/react';
import UserAvatar from './UserAvatar';

interface IUserPreviewProps {
  user: TUser;
  showAvatar?: boolean;
}

/**
 * Component for displaying a preview of a user.
 */
const UserPreview: FC<IUserPreviewProps> = ({ user, showAvatar = true }) => {
  return (
    <HStack
      //   templateRows="repeat(2, 1fr)"
      gridTemplateColumns="1fr auto"
      p={2}
      color="shared.text.default"
      gap={2}
    >
      <UserAvatar user={user} borderRadius="md" />
      <Box>
        <Text fontSize="md" color="theme.500">
          {user.displayName}
        </Text>
        <Text size="sm" color="gray.500">
          @{user.username}
        </Text>
      </Box>
    </HStack>
  );
};

export default UserPreview;

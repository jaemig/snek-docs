import { FC, Fragment, useState } from 'react';
import { TUser } from '../../types/user';
import {
  Box,
  HStack,
  Text,
  TextProps,
  Tooltip,
  TooltipProps
} from '@chakra-ui/react';
import UserAvatar from './UserAvatar';

interface IUserPreviewProps extends TextProps {
  user: TUser;
  showAvatar?: boolean;
  avatarOnly?: boolean;
  tooltipProps?: TooltipProps;
}

/**
 * Component for displaying a preview of a user.
 */
const UserPreview: FC<IUserPreviewProps> = ({
  user,
  showAvatar,
  avatarOnly,
  tooltipProps,
  ...props
}) => {
  // const [viewState, setViewState] = useState<'minimized' | 'extended'>(
  //   'minimized'
  // );
  const preview = (
    <HStack
      gridTemplateColumns="1fr auto"
      p={2}
      color="shared.text.default"
      gap={2}
    >
      {<UserAvatar user={user} borderRadius="md" />}

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

  if (avatarOnly) {
    return <></>;
  }

  // const isViewStateExtended = viewState === 'extended';
  // return (
  //   <HStack
  //     position="relative"
  //     gridTemplateColumns="1fr auto"
  //     p={2}
  //     color="shared.text.default"
  //     gap={2}
  //     onMouseEnter={() => setViewState('extended')}
  //     onMouseLeave={() => setViewState('minimized')}
  //   >
  //     <UserAvatar
  //       user={user}
  //       borderRadius="md"
  //       size="md"
  //       {...(!isViewStateExtended && { vsibility: 'hidden', opacity: 0 })}
  //     />

  //     <Box>
  //       <Text
  //         position="absolute"
  //         fontSize="md"
  //         color="theme.500"
  //         {...(!isViewStateExtended && { visibility: 'hidden', opacity: 0 })}
  //       >
  //         {user.displayName}
  //       </Text>
  //       <Text size="sm" color="gray.500">
  //         @{user.username}
  //       </Text>
  //     </Box>
  //   </HStack>
  // );

  return (
    <Tooltip
      label={preview}
      aria-label={user.displayName}
      bgColor="shared.body.bgColor"
      boxShadow="lg"
      {...tooltipProps}
    >
      <Text size="sm" color="gray.500" {...props}>
        @{user.username}
      </Text>
    </Tooltip>
  );

  return preview;
};

export default UserPreview;

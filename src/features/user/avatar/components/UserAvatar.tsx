import { FC } from 'react';
import { TUser } from '../../types/user';
import { Avatar, AvatarProps, Tooltip } from '@chakra-ui/react';
import UserPreview from './UserPreview';

export interface IUserAvatarProps extends AvatarProps {
  user: TUser;
  showTooltip?: boolean;
}

const UserAvatar: FC<IUserAvatarProps> = ({ user, showTooltip, ...props }) => {
  const avatar = (
    <Avatar
      src={user.avatarUrl ?? 'https://api.dicebear.com/6.x/thumbs/svg'}
      {...props}
    />
  );

  if (showTooltip) {
    return (
      <Tooltip
        label={<UserPreview user={user} />}
        aria-label={user.displayName}
        bgColor="transparent"
        boxShadow="lg"
      >
        {avatar}
      </Tooltip>
    );
  }

  return avatar;
};

export default UserAvatar;

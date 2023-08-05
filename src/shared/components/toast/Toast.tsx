import { CheckCircleIcon } from '@chakra-ui/icons';
import {
  AlertStatus,
  Box,
  HStack,
  Heading,
  Icon,
  StackProps,
  Text
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { TToastStatus } from './types/toast';

const statusIcons: { [key in TToastStatus]: typeof Icon } = {
  success: CheckCircleIcon,
  error: CheckCircleIcon,
  warning: CheckCircleIcon,
  info: CheckCircleIcon
};

export interface IToastProps extends StackProps {
  title?: string;
  description?: string;
  status?: TToastStatus;
  icon?: ReactNode;
  children?: ReactNode;
}

/**
 * Component for displaying a toast.
 */
const Toast: FC<IToastProps> = ({
  children,
  title,
  description,
  status = 'success',
  icon,
  ...props
}) => {
  const FallbackIcon = statusIcons[status];

  return (
    <HStack
      position="relative"
      bgColor="gray.750"
      borderRadius="lg"
      px={9}
      py={6}
      spacing={6}
      _after={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        w: 'full',
        h: 'full',
        borderRadius: 'lg',
        opacity: 0.2,
        bg: `components.toast.status.${status}.bgColor`
      }}
      {...props}
    >
      {icon ?? (
        <FallbackIcon
          fontSize="2xl"
          color={`components.toast.status.${status}.color`}
        />
      )}
      <Box>
        {title && (
          <Heading
            as="h6"
            size="sm"
            mb={1}
            color={`components.toast.status.${status}.color`}
          >
            {title}
          </Heading>
        )}
        {description && <Text>{description}</Text>}
      </Box>
    </HStack>
  );
};

export default Toast;

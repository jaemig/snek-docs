import {
  Box,
  ChakraProvider,
  HStack,
  Heading,
  Icon,
  StackProps,
  Text,
  useToast
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { TToastStatus } from './types/toast';
import TbAlertCircleFilled from '../icons/tabler/TbAlertCircleFilled';
import TbCheckCircleFilled from '../icons/tabler/TbCheckCircleFilled';
import TbXCircleFilled from '../icons/tabler/TbXCircleFilled';
import TbInfoCircleFilled from '../icons/tabler/TbInfoCircleFilled';
import theme from '../../../styles/theme/theme';

const statusIcons: { [key in TToastStatus]: typeof Icon } = {
  success: TbCheckCircleFilled,
  error: TbXCircleFilled,
  warning: TbAlertCircleFilled,
  info: TbInfoCircleFilled
};

export interface IToastProps extends StackProps {
  title?: string;
  description?: string;
  status?: TToastStatus;
  icon?: ReactNode;
}

// {
//   title,
//   description,
//   status = 'success',
//   icon,
//   ...props
// }: IToastProps

//! Colors not working perfectly fine after transforming to a function instead of a component
/**
 * Function for creating a custom toast.
 * @param props The toast props.
 * @returns The toast.
 */
const createCustomToast = () => {
  const toast = useToast();

  return {
    displayToast: ({
      title,
      description,
      status = 'success',
      icon,
      ...props
    }: IToastProps) => {
      const FallbackIcon = statusIcons[status];
      toast({
        title,
        description,
        status,
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        render: () => (
          <HStack
            position="relative"
            bgColor="components.toast.container.bgColor"
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
              bg: `components.toast.status.${status}.bgColor`,
              zIndex: 0
            }}
            fontWeight="semibold"
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
              {description && (
                <Text color="components.toast.description.color">
                  {description}
                </Text>
              )}
            </Box>
          </HStack>
        )
      });
    }
  };

  // return (
  //   <HStack
  //     position="relative"
  //     bgColor="components.toast.container.bgColor"
  //     borderRadius="lg"
  //     px={9}
  //     py={6}
  //     spacing={6}
  //     _after={{
  //       content: '""',
  //       position: 'absolute',
  //       top: 0,
  //       left: 0,
  //       w: 'full',
  //       h: 'full',
  //       borderRadius: 'lg',
  //       opacity: 0.2,
  //       bg: `components.toast.status.${status}.bgColor`,
  //       zIndex: 0
  //     }}
  //     fontWeight="semibold"
  //     {...props}
  //   >
  //     {icon ?? (
  //       <FallbackIcon
  //         fontSize="2xl"
  //         color={`components.toast.status.${status}.color`}
  //       />
  //     )}
  //     <Box>
  //       {title && (
  //         <Heading
  //           as="h6"
  //           size="sm"
  //           mb={1}
  //           color={`components.toast.status.${status}.color`}
  //         >
  //           {title}
  //         </Heading>
  //       )}
  //       {description && (
  //         <Text color="components.toast.description.color">{description}</Text>
  //       )}
  //     </Box>
  //   </HStack>
  // );
};

export default createCustomToast;

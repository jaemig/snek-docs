import { FC } from 'react';
import { TStepperItem } from '../../../types/core/stepper';
import { Box, Center, HStack, StackProps } from '@chakra-ui/react';

interface IStepperItemProps extends TStepperItem {
  props?: StackProps;
}

/**
 * Component for displaying a single stepper item.
 */
const StepperItem: FC<IStepperItemProps> = ({
  title,
  children,
  icon,
  props
}) => {
  return (
    <HStack
      w="full"
      h="100%"
      py={3}
      // pl={10}
      position="relative"
      _before={{
        position: 'absolute',
        left: '15px',
        top: 'auto',
        content: '""',
        w: '2px',
        h: '100%',
        bgColor: 'gray.200',
        zIndex: -1
      }}
      {...props}
    >
      <Box
        as={Center}
        boxSize="32px"
        bgColor="gray.200"
        borderRadius="full"
        fontSize="16px"
        border="3px solid"
        borderColor="white"
        color="gray.500"
      >
        {icon}
      </Box>
      <Box w="full">{title}</Box>
      <Box>{children}</Box>
    </HStack>
  );
};

export default StepperItem;

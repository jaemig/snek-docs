import { FC } from 'react';
import { TStepperItem } from '../../../types/core/stepper';
import { Box, HStack, StackProps } from '@chakra-ui/react';

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
      pl={10}
      position="relative"
      _before={{
        position: 'absolute',
        left: 3,
        top: 0,
        content: '""',
        w: '1px',
        h: '100%',
        bgColor: 'red.500'
      }}
      {...props}
    >
      <Box>{title}</Box>
      <Box>{children}</Box>
    </HStack>
  );
};

export default StepperItem;

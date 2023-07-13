import { Box, Divider, HStack, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { TStepperSection } from '../../../types/core/stepper';
import StepperItem from './StepperItem';

interface IStepperProps {
  sections: TStepperSection[];
}

/**
 * Component for displaying a stepper.
 */
const Stepper: FC<IStepperProps> = ({ sections }) => {
  return (
    <VStack w="full" spacing={0}>
      {sections.map((section, i) => {
        return (
          <VStack key={i} spacing={0} w="full" h="max-content">
            <HStack w="full" spacing={4}>
              <Box>{section.title}</Box>
              <Divider flex={1} h="full" />
            </HStack>
            {section.items.map((item, j) => (
              <StepperItem
                key={j}
                {...item}
                // This places some padding to the next section (except for the last section)
                props={
                  j === section.items.length - 1 && i < sections.length - 1
                    ? { pb: 10 }
                    : {}
                }
              />
            ))}
          </VStack>
        );
      })}
    </VStack>
  );
};

export default Stepper;

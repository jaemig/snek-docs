import { FC } from 'react';
import LeftNav from '../../../../shared/containers/navigation/LeftNav';
import { VStack, Button } from '@chakra-ui/react';

/**
 * Left navigation for editing a post.
 */
const LeftNavPostEditor: FC = ({}) => {
  return (
    <LeftNav w="full" isExpanded={true}>
      <VStack w="50%" minW="100px" alignSelf="center">
        <Button size="sm" variant="filledGreen" w="full">
          Publish
        </Button>
        <Button size="sm" colorScheme="gray" w="full">
          Save Draft
        </Button>
      </VStack>
    </LeftNav>
  );
};

export default LeftNavPostEditor;

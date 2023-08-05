import { FC } from 'react';
import LeftNav from '../../../../shared/containers/navigation/LeftNav';
import {
  VStack,
  Button,
  HStack,
  IconButton,
  Divider,
  Tooltip,
  Heading,
  Textarea
} from '@chakra-ui/react';
import TbBookUpload from '../../../../shared/components/icons/tabler/TbBookUpload';
import TbDeviceFloppy from '../../../../shared/components/icons/tabler/TbDeviceFloppy';

interface ILeftNavPostEditorProps {
  handlePublish: () => void;
}

/**
 * Left navigation for editing a post.
 */
const LeftNavPostEditor: FC<ILeftNavPostEditorProps> = ({ handlePublish }) => {
  return (
    <LeftNav w="full" isExpanded={true}>
      <VStack w="full" minW="100px" alignSelf="center">
        <HStack>
          <Button
            size="sm"
            variant="outline-hover-filled"
            colorScheme="flat.se.green"
            rightIcon={<TbDeviceFloppy />}
          >
            Save
          </Button>
          {/* <Button
            size="sm"
            variant="outline-hover-filled"
            rightIcon={<TbBookUpload />}
          >
            Publish
          </Button> */}
          {/* <Button
            size="sm"
            variant="outline-hover-filled"
            w="full"
            rightIcon={<TbBookUpload />}
            px={4}
          >
            Publish
          </Button> */}
          <Tooltip
            label="Publish this post"
            bgColor="shared.body.bgColor"
            color="flat.se.green.600"
          >
            <IconButton
              icon={<TbBookUpload />}
              size="sm"
              aria-label="Publish this post"
              variant="outline-hover-filled"
              color="flat.se.green.700"
              borderColor="flat.se.green.700"
              _hover={{
                bgColor: 'flat.se.green.600',
                borderColor: 'flat.se.green.600',
                color: 'gray.200'
              }}
              onClick={handlePublish}
            />
          </Tooltip>
        </HStack>
        <Heading
          as="h6"
          fontSize="sm"
          color="gray.500"
          mt={10}
          mb={1}
          fontWeight="medium"
        >
          Post Summary
        </Heading>
        <Textarea
          placeholder="Short summary about this post"
          size="sm"
          borderRadius="lg"
        />
      </VStack>
    </LeftNav>
  );
};

export default LeftNavPostEditor;

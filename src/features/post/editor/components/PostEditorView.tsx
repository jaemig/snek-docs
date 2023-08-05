import {
  Stack,
  Input,
  Box,
  Button,
  IconButton,
  Tooltip,
  HStack,
  useToast
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import MdxEditor from '../../../../shared/components/MdxEditor';
import { variantFontSizes } from '../../../main-content/heading/components/Heading';
import LeftNavPostEditor from './LeftNavPostEditor';
import TbBookUpload from '../../../../shared/components/icons/tabler/TbBookUpload';
import TbDeviceFloppy from '../../../../shared/components/icons/tabler/TbDeviceFloppy';
import { MainBreadcrumbPart } from '../../../../shared/types/navigation';
import { wait } from '../../../../shared/utils/utils';
import Toast from '../../../../shared/components/toast/Toast';

/**
 * Component for editing a post.
 */
const PostEditorView: FC = () => {
  const publishToast = useToast();
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handlePublish = async () => {
    //TODO: Connect to Jaen

    await wait(1000); // Simulate publishing

    publishToast({
      title: 'Post published.',
      description: 'Your post has been published.',
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
      icon: <TbBookUpload />
      // render: () => <Toast>Hi!</Toast>
    });
  };

  return (
    <>
      <LeftNavPostEditor handlePublish={handlePublish} />
      <Stack spacing={{ base: 0, xl: 12 }} direction="row" position="relative">
        <Box w="full">
          <Toast
            title="Post published"
            description="Your post has been published"
            w="fit-content"
          >
            Hi!
          </Toast>
          <Box
            position="relative"
            _after={{
              content: '""',
              position: 'absolute',
              top: '50%',
              left: 0,
              width: '2px',
              height: isInputFocused ? '60%' : 0,
              background: 'theme.500',
              transform: 'translateY(-50%)',
              transition: 'height 0.2s ease-in-out'
            }}
            _hover={{
              _after: {
                height: isInputFocused ? '60%' : '35%'
              }
            }}
            pl={2}
            mb={5}
          >
            <Input
              position="relative"
              variant="unstyled"
              placeholder="Post Title"
              fontSize={variantFontSizes.h1}
              fontWeight="bold"
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
          </Box>
          <MdxEditor />
          <HStack
            position="fixed"
            zIndex={10}
            bottom={10}
            left="50%"
            transform="translateX(-50%)"
            bgColor="gray.800"
            border="1px solid"
            borderColor="gray.600"
            px={10}
            py={2}
            borderRadius="full"
            spacing={3}
          >
            {/* <Button
              size="md"
              variant="ghost"
              borderRadius="full"
              color="gray.400"
              _hover={{
                bgColor: 'gray.700',
                color: '#ffa801'
              }}
            >
              Save Draft
            </Button>
            <Tooltip
              label="Publish this post"
              bgColor="gray.700"
              color="white"
              placement="top"
            >
              <IconButton
                icon={<TbBookUpload fontSize="xl" />}
                size="md"
                aria-label="Publish this post"
                variant="ghost"
                borderRadius="full"
                color="gray.400"
                _hover={{
                  bgColor: 'gray.700',
                  color: 'flat.se.green.600'
                }}
              />
            </Tooltip> */}
            <Tooltip
              label="Save this post"
              bgColor="gray.700"
              color="white"
              placement="top"
            >
              <IconButton
                icon={<TbDeviceFloppy fontSize="xl" />}
                size="md"
                aria-label="Save this post"
                variant="ghost"
                borderRadius="full"
                color="gray.400"
                _hover={{
                  bgColor: 'gray.700',
                  color: '#ffa801'
                }}
              />
            </Tooltip>
            <Tooltip
              label="Publish this post"
              bgColor="gray.700"
              color="white"
              placement="top"
            >
              <IconButton
                icon={<TbBookUpload fontSize="xl" />}
                size="md"
                aria-label="Publish this post"
                variant="ghost"
                borderRadius="full"
                color="gray.400"
                _hover={{
                  bgColor: 'gray.700',
                  color: 'flat.se.green.600'
                }}
              />
            </Tooltip>
          </HStack>
        </Box>
      </Stack>
    </>
  );
};

export default PostEditorView;

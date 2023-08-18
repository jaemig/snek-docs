import {
  Stack,
  Input,
  Box,
  useToast,
  useDisclosure,
  Divider,
  Textarea,
  useBreakpointValue
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import MdxEditor from '../../../../shared/components/MdxEditor';
import { variantFontSizes } from '../../../main-content/heading/components/Heading';
import LeftNavPostEditor from './LeftNavPostEditor';
import TbBookUpload from '../../../../shared/components/icons/tabler/TbBookUpload';
import TbDeviceFloppy from '../../../../shared/components/icons/tabler/TbDeviceFloppy';
import { wait } from '../../../../shared/utils/utils';
import Toast from '../../../../shared/components/toast/Toast';
import ActionToolbar from '../../../../shared/components/action-toolbar/ActionToolbar';
import Alert from '../../../../shared/components/alert/Alert';
import MainGrid from '../../../../shared/containers/components/MainGrid';
import PostEditorTopNav from './PostEditorTopNav';
import { TPost } from '../../types/post';
import { TActionToolbarItem } from '../../../../shared/components/action-toolbar/types/actionToolbar';
import TbPhoto from '../../../../shared/components/icons/tabler/TbPhoto';

const alertText = {
  publish: {
    label: 'Publish',
    header: 'Publish this post?',
    body: 'Are you sure you want to publish this post? This post will be visible to everyone.',
    confirmationLabel: 'Publish'
  },
  unpublish: {
    label: 'Unpublish',
    header: 'Unpublish this post?',
    body: 'Are you sure you want to unpublish this post? This post will no longer be visible to everyone.',
    confirmationLabel: 'Unpublish'
  }
};

/**
 * Component for editing a post.
 */
const PostEditorView: FC = () => {
  // const { displayToast } = createCustomToast();
  const visibilityAlertDisclosure = useDisclosure({
    onClose: () => console.log('closed')
  });
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const [post, setPost] = useState<Partial<TPost>>({ title: 'My Post' });
  const [alertContent, setAlertContent] = useState(
    post.publicationDate === undefined ? alertText.publish : alertText.unpublish
  );

  const toast = useToast();
  const actionToolbarItems =
    useBreakpointValue<TActionToolbarItem[]>({
      base: [
        {
          icon: <TbPhoto fontSize="xl" />,
          onClick: () => console.log('Upload new image'),
          tooltip: 'Upload new image',
          ariaLabel: 'Upload new image'
        }
      ],
      md: []
    }) ?? [];

  const handlePublish = async () => {
    //TODO: Connect to Jaen
    console.log('publishing...');
    await wait(1000); // Simulate publishing
    visibilityAlertDisclosure.onClose();
    setAlertContent(alertText.unpublish);
    return;
    // displayToast({
    //   title: 'Post published.',
    //   description: 'Your post has been published.',
    //   status: 'info'
    // });
    // toast({
    //   title: ''
    // });
  };

  const handleUnpublish = async () => {
    //TODO: Connect to Jaen
    console.log('unpublishing...');
    await wait(1000); // Simulate publishing
    visibilityAlertDisclosure.onClose();
    setAlertContent(alertText.publish);
    return;
  };

  return (
    <>
      <PostEditorTopNav
        post={post}
        handlePublish={visibilityAlertDisclosure.onOpen}
      />
      <MainGrid
        templateColumns={{
          base: '1fr',
          md: '0.8fr 2fr',
          xl: 'minmax(auto, 250px) minmax(auto, 4fr) minmax(auto, 250px)'
        }}
      >
        <LeftNavPostEditor post={post} />
        <Stack
          spacing={{ base: 0, xl: 12 }}
          direction="row"
          position="relative"
        >
          <Box maxW="900px" w="full">
            {/* <Box
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
            <Box
              position="relative"
              _after={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '2px',
                height: isTextareaFocused ? '60%' : 0,
                background: 'theme.500',
                transition: 'height 0.2s ease-in-out'
              }}
              _hover={{
                _after: {
                  height: isTextareaFocused ? '90%' : '35%'
                }
              }}
              mb={5}
            >
              <Textarea
                variant="unstyled"
                placeholder="Short summary of your post"
                size="sm"
                resize="vertical"
                borderRadius="lg"
                pt={0}
                pl={2}
                onFocus={() => setIsTextareaFocused(true)}
                onBlur={() => setIsTextareaFocused(false)}
              />
            </Box>
            <Divider my={5} /> */}
            <MdxEditor hideHeadingHash />
            <ActionToolbar
              actions={[
                ...actionToolbarItems,
                {
                  icon: <TbDeviceFloppy fontSize="xl" />,
                  ariaLabel: 'Save this post',
                  tooltip: 'Save this post',
                  onClick: () => console.log('Save'),
                  hoverColor: 'components.postEditor.save.hover.color'
                },
                {
                  icon: <TbBookUpload fontSize="xl" />,
                  ariaLabel: 'Publish this post',
                  tooltip: 'Publish this post',
                  onClick: handlePublish,
                  hoverColor: 'components.postEditor.publish.hover.color'
                }
              ]}
            />
          </Box>
          <Box />
        </Stack>
      </MainGrid>
      <Alert
        disclosure={visibilityAlertDisclosure}
        confirmationAction={handlePublish}
        confirmationLabel={alertContent.confirmationLabel}
        body={alertContent.body}
        header={alertContent.header}
      />
    </>
  );
};

export default PostEditorView;

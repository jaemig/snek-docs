import {
  Stack,
  Box,
  useDisclosure,
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
import { TUser } from '../../../user/types/user';
import useScrollPosition from '../../../../shared/hooks/use-scroll-position';
import TbBookDownload from '../../../../shared/components/icons/tabler/TbBookDownload';
import useToast from '../../../../shared/hooks/use-toast';

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

//* This would be the data that comes from Jaen.
const userData: TUser = {
  displayName: 'Emily Brooks',
  username: 'emilybrooks',
  location: 'San Francisco, CA',
  // company: 'Snek',
  avatarUrl:
    'https://onedrive.live.com/embed?resid=AE2DDC816CEF3E1E%21220972&authkey=%21AIUh8CadUcYw3cg&width=999999&height=1024',
  bio: "Adventurous spirit with a knack for words and a passion for knowledge. Exploring the world of academia, one document at a time. Forever curious, forever learning. Let's dive into the realm of information together uncover the wonders of education.",
  socials: [
    {
      type: 'company',
      label: 'Snek',
      url: 'https://snek.at'
    },
    {
      type: 'email',
      label: 'emily.brooks@snek.at',
      url: 'mailto:emily.brooks@snek.at'
    },
    {
      type: 'linkedin',
      label: 'Emily-Brooks',
      url: 'https://www.linkedin.com/in/emily-brooks-1a2b3c4d/'
    },
    {
      type: 'location',
      label: 'San Francisco, CA'
    }
  ]
};

/**
 * Component for editing a post.
 */
const PostEditorView: FC = () => {
  // const { displayToast } = createCustomToast();
  const visibilityAlertDisclosure = useDisclosure({
    onClose: () => console.log('closed')
  });
  const [post, setPost] = useState<Partial<TPost>>({ title: 'My Post' });
  const isPublic = post.publicationDate !== undefined;
  const [alertContent, setAlertContent] = useState(
    isPublic ? alertText.unpublish : alertText.publish
  );
  const customToast = useToast();

  const scrollPosition = useScrollPosition();
  const isMobile = useBreakpointValue({ base: true, md: false });
  // const toast = useToast();
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

  const publishPost = async () => {
    //TODO: Connect to Jaen
    console.log('publishing...');
    await wait(1000); // Simulate publishing
    visibilityAlertDisclosure.onClose();
    setAlertContent(alertText.unpublish);
    // setPost({ ...post, publicationDate: '2023-09-11' }); // TODO: Remove after connecting to Jaen
    customToast({
      title: 'Post published.',
      description: 'Your post has been published.',
      status: 'info'
    });
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

  const unpublishPost = async () => {
    //TODO: Connect to Jaen
    console.log('unpublishing...');
    await wait(1000); // Simulate publishing
    visibilityAlertDisclosure.onClose();
    setAlertContent(alertText.publish);
    setPost({ ...post, publicationDate: undefined }); //TODO: Remove after connecting to Jaen
    return;
  };

  const togglePostVisibility = () => {
    if (isPublic) unpublishPost();
    else publishPost();
  };

  return (
    <>
      <PostEditorTopNav
        post={post}
        handlePublish={visibilityAlertDisclosure.onOpen}
        user={userData}
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
            <MdxEditor hideHeadingHash />
            <ActionToolbar
              active={isMobile || scrollPosition > 90}
              actions={[
                ...actionToolbarItems,
                {
                  icon: <TbDeviceFloppy />,
                  ariaLabel: 'Save this post',
                  tooltip: 'Save this post',
                  onClick: () => console.log('Save'),
                  hoverColor: 'components.postEditor.save.hover.color'
                },
                isPublic
                  ? {
                      icon: <TbBookDownload />,
                      ariaLabel: 'Unublish this post',
                      tooltip: 'Unpublish this post',
                      onClick: visibilityAlertDisclosure.onOpen,
                      hoverColor: 'components.postEditor.publish.hover.color'
                    }
                  : {
                      icon: <TbBookUpload />,
                      ariaLabel: 'Publish this post',
                      tooltip: 'Publish this post',
                      onClick: visibilityAlertDisclosure.onOpen,
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
        confirmationAction={togglePostVisibility}
        confirmationLabel={alertContent.confirmationLabel}
        body={alertContent.body}
        header={alertContent.header}
      />
    </>
  );
};

export default PostEditorView;

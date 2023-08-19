import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Spacer,
  Tag,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { FC } from 'react';
import TopNav from '../../../../shared/containers/navigation/TopNav';
import { TPost } from '../../types/post';
import TbStar from '../../../../shared/components/icons/tabler/TbStar';
import TbBookUpload from '../../../../shared/components/icons/tabler/TbBookUpload';
import TbBookDownload from '../../../../shared/components/icons/tabler/TbBookDownload';
import TbPhoto from '../../../../shared/components/icons/tabler/TbPhoto';

interface IPostEditorTopNavProps {
  post: Partial<TPost>;
  handlePublish: () => void;
}

/**
 * Top navigation for the post editor.
 */
const PostEditorTopNav: FC<IPostEditorTopNavProps> = ({
  post,
  handlePublish
}) => {
  const topNavDisclosure = useDisclosure();
  const hasPublished = post.publicationDate !== undefined;
  return (
    <TopNav
      drawerDisclosure={topNavDisclosure}
      wrapperProps={{ h: 'max-content', py: 5 }}
    >
      <Box
        w="full"
        borderTop="1px solid"
        borderTopColor="topNav.borderColor"
        my={5}
      />
      <Center w="full" maxW="7xl">
        {/* <HStack>
          <Image
            src="https://picsum.photos/200"
            boxSize="30px"
            borderRadius="full"
          />
          <Text fontWeight="medium">{post.title}</Text>
          <Tag size="sm" colorScheme={hasPublished ? 'green' : 'yellow'}>
            {hasPublished ? 'public' : 'private'}
          </Tag>
        </HStack> */}
        {/* <Spacer /> */}
        <HStack spacing={5}>
          <Button size="sm" leftIcon={<TbStar />}>
            {post.likes || 0}
          </Button>
          <Button size="sm" leftIcon={<TbPhoto />}>
            Image
          </Button>
          {post.publicationDate === undefined ? (
            <Button
              size="sm"
              leftIcon={<TbBookUpload />}
              onClick={handlePublish}
            >
              Publish
            </Button>
          ) : (
            <Button
              size="sm"
              leftIcon={<TbBookDownload />}
              onClick={handlePublish}
            >
              Unpublish
            </Button>
          )}
        </HStack>
      </Center>
    </TopNav>
  );
};

export default PostEditorTopNav;
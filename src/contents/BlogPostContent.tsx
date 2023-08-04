import { FC, useState } from 'react';

// Insertable custom components (via Jaen)
import MainGrid from '../shared/containers/components/MainGrid';
import PostEditorView from '../features/post/editor/components/PostEditorView';
import PostReaderView from '../features/post/reader/components/PostReaderView';
import TopNav from '../shared/containers/navigation/TopNav';
import {
  Button,
  HStack,
  IconButton,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react';
import TbBookUpload from '../shared/components/icons/tabler/TbBookUpload';

export interface IBlogPostContentProps {}

/**
 * Content for the blog post page (reading and editing).
 */
const BlogPostContent: FC<IBlogPostContentProps> = () => {
  const [viewMode, setViewMode] = useState<'read' | 'edit'>('edit');

  const topNavDisclosure = useDisclosure();

  const isEditViewMode = viewMode === 'edit';
  return (
    <>
      <TopNav
        drawerDisclosure={topNavDisclosure}
        wrapperProps={{ h: 'max-content', spacing: 5, pt: 3, pb: 2 }}
      >
        {isEditViewMode && (
          <HStack>
            <Button
              size="sm"
              colorScheme="gray"
              w="full"
              variant="outline-hover-filled"
              borderColor="gray.600"
              color="gray.300"
              _hover={{
                bgColor: 'gray.700'
              }}
            >
              Save Draft
            </Button>
            <Tooltip label="Publish this post" bgColor="gray.700" color="white">
              <IconButton
                icon={<TbBookUpload color="flat.se.green.600" />}
                size="sm"
                aria-label="Publish this post"
                variant="outline"
              />
            </Tooltip>
          </HStack>
        )}
      </TopNav>
      <MainGrid>
        {isEditViewMode ? <PostEditorView /> : <PostReaderView />}
      </MainGrid>
    </>
  );
};

export default BlogPostContent;

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
      <MainGrid>
        {isEditViewMode ? <PostEditorView /> : <PostReaderView />}
      </MainGrid>
    </>
  );
};

export default BlogPostContent;

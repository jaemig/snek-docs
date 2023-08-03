import { Box, Stack, useDisclosure } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { useNavOffset } from '../shared/hooks/use-nav-offset';

// Insertable custom components (via Jaen)
import MainGrid from '../shared/containers/components/MainGrid';
import { TUser } from '../features/user/types/user';
import MainBreadcrumb from '../shared/containers/navigation/components/MainBreadcrumb';
import { MainBreadcrumbPart } from '../shared/types/navigation';
import MdxEditor from '../shared/components/MdxEditor';
import LeftNavPostEditor from '../features/post/editor/components/LeftNavPostEditor';
import RightNavPostReader from '../features/post/reader/components/RightNavPostReader';

// Placeholder data
const user: TUser = {
  username: 'emilybrooks',
  displayName: 'Emily Brooks',
  bio: '',
  socials: []
};

export interface IBlogPostContentProps {}

const BlogPostContent: FC<IBlogPostContentProps> = () => {
  const [viewMode, setViewMode] = useState<'read' | 'edit'>('edit');

  const breadcrumbParts: MainBreadcrumbPart[] = [
    {
      name: '@emilybrooks',
      href: '/profile',
      isUser: true,
      showUserImage: true
    },
    {
      name: 'Posts',
      href: '/profile#posts'
    },
    {
      name: 'Unlocking the Power of Quantum Computing',
      href: '#'
    }
  ];

  const isReading = viewMode === 'read';
  return (
    <MainGrid>
      <LeftNavPostEditor />
      <Stack spacing={{ base: 0, xl: 12 }} direction="row">
        <Box maxW={isReading ? '900px' : 'initial'} w="full">
          <MainBreadcrumb parts={breadcrumbParts} />
          <MdxEditor />
        </Box>
        {isReading && <RightNavPostReader />}
      </Stack>
    </MainGrid>
  );
};

export default BlogPostContent;

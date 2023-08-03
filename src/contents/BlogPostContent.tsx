import { Box, HStack, Input, Stack, useDisclosure } from '@chakra-ui/react';
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
import Heading, {
  variantFontSizes
} from '../features/main-content/heading/components/Heading';

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

  const [isInputFocused, setIsInputFocused] = useState(false);

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
        </Box>
        {isReading && <RightNavPostReader />}
      </Stack>
    </MainGrid>
  );
};

export default BlogPostContent;

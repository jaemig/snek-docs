import {
  Box,
  Container,
  Flex,
  HStack,
  SimpleGrid,
  Stack,
  VStack
} from '@chakra-ui/react';
import { FC, useMemo, useState } from 'react';
import { mainContentWrapperProps } from '../vars/layout';
import RightNav from '../layout/navigation/RightNav';
import MainGrid from '../layout/components/MainGrid';
import LeftNavProfile from '../components/social/profile/LeftNavProfile';
import PostPreview from '../components/photonq/SinglePost';
/**
 * Component for displaying a certain user profile.
 */
const UserProfileContent: FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const postPreviews = [
    {
      publicationDate: '2023-16-15',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/',
      canManage: true
    },
    {
      publicationDate: '2023-16-15',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/',
      canManage: true
    },
    {
      publicationDate: '2023-16-15',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/',
      canManage: true
    },
    {
      publicationDate: '2023-16-15',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      hasLiked: true,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/',
      canManage: false
    },
    {
      publicationDate: '2023-16-15',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 500,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/',
      canManage: true
    }
  ];

  const memoizedPostPreviews = useMemo(() => {
    return postPreviews.map(postPreview => (
      <PostPreview {...postPreview} wrapperProps={{ minW: '33%' }} />
    ));
  }, [postPreviews]);

  return (
    <MainGrid>
      <Box>
        <LeftNavProfile isExpanded={isExpanded} />
      </Box>
      <Stack verticalAlign="top" spacing={{ base: 0, xl: 12 }} direction="row">
        <Box maxW="900px" w="full">
          <VStack gap={3}>
            <SimpleGrid spacing={5} columns={2}>
              {memoizedPostPreviews}
            </SimpleGrid>
          </VStack>
        </Box>
        {
          //TODO: This needs to be improved so it shows a proper toc
        }
        <RightNav />
      </Stack>
    </MainGrid>
  );
};

export default UserProfileContent;

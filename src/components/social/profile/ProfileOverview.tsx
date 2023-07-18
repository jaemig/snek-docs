import { VStack, SimpleGrid, Divider } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { TPostPreview } from '../../../types/features/post';
import PostPreview from '../../features/post/preview/PostCardPreview';
import ActivityList from './ActivityList';

/**
 * Component for displaying a user's profile overview.
 */
const ProfileOverview: FC = () => {
  //TODO: implement toggleLike with API call
  const toggleLike = (id: TPostPreview['id']) => {
    console.log('toggle like for post ', id);
  };

  const postPreviews: TPostPreview[] = [
    {
      id: '1',
      publicationDate: '2023-16-15',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
      id: '2',
      publicationDate: '2023-16-15',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/',
      canManage: true
    },
    {
      id: '3',
      publicationDate: '2023-16-15',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/',
      canManage: true
    },
    {
      id: '4',
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
      id: '5',
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
      <PostPreview
        key={postPreview.id}
        toggleLike={toggleLike}
        {...postPreview}
        wrapperProps={{ minW: '33%' }}
      />
    ));
  }, [postPreviews]);

  return (
    <VStack gap={12}>
      <SimpleGrid spacing={5} columns={{ base: 1, sm: 2 }}>
        {memoizedPostPreviews}
      </SimpleGrid>
      <Divider />
      <ActivityList mb={10} />
    </VStack>
  );
};

export default ProfileOverview;

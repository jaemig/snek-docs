import { FC, useMemo } from 'react';
import { TPostPreview } from '../../../types/features/post';
import {
  Button,
  Center,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  VStack
} from '@chakra-ui/react';
import {
  ChevronDownIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@chakra-ui/icons';
import PostPreview from '../../photonq/PostPreview';

interface IPostListProps {}

/**
 * Component for displaying a sort- and filterable list of posts.
 */
const PostList: FC = () => {
  //TODO: This would come from an API
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

  const toggleLike = (id: TPostPreview['id']) => {
    console.log('toggle like for post ', id);
  };

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
    <VStack w="full" gap={5}>
      <HStack spacing={3} w="full">
        <Input placeholder="Find a post..." size="sm" borderRadius="lg" />
        <Menu>
          <MenuButton
            as={Button}
            size="sm"
            borderRadius="lg"
            variant="outline"
            fontWeight="semibold"
            rightIcon={<ChevronDownIcon />}
          >
            Sort
          </MenuButton>
          <MenuList>
            <MenuItem>Recent</MenuItem>
            <MenuItem>Date</MenuItem>
            <MenuItem position="relative">
              Most Liked
              <CheckIcon position="absolute" right={3} boxSize="10px" />
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <SimpleGrid spacing={5} columns={2}>
        {memoizedPostPreviews}
      </SimpleGrid>
      <HStack alignContent="space-around">
        <Button
          variant="ghost-hover-outline"
          size="sm"
          borderRadius="lg"
          leftIcon={<ChevronLeftIcon />}
        >
          Previous
        </Button>
        <Button
          variant="ghost-hover-outline"
          size="sm"
          borderRadius="lg"
          rightIcon={<ChevronRightIcon />}
        >
          Next
        </Button>
      </HStack>
    </VStack>
  );
};

export default PostList;

import { FC, FormEvent, useMemo, useState } from 'react';
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
import usePagination from '../../../hooks/use-pagination';

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
    },
    //....
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
    },
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

  const pagination = usePagination({
    itemsPerPage: 10,
    totalItems: postPreviews.length
  });

  const [activeSortOption, setActiveSortOption] =
    useState<(typeof sortOptions)[number]['value']>('recent');

  const sortOptions = [
    {
      label: 'Recent',
      value: 'recent',
      onClick: () => {
        setActiveSortOption('recent');
      }
    },
    {
      label: 'Date',
      value: 'date',
      onClick: () => {
        setActiveSortOption('date');
      }
    },
    {
      label: 'Most Liked',
      value: 'most-liked',
      onClick: () => {
        setActiveSortOption('most-liked');
      }
    }
  ] as const;

  const sortMenuItems = useMemo(() => {
    return sortOptions.map((option, i) => {
      const isActive = option.value === activeSortOption;
      return (
        <MenuItem
          key={i}
          onClick={option.onClick}
          position={isActive ? 'relative' : undefined}
        >
          {option.label}
          {isActive && (
            <CheckIcon
              position="absolute"
              right={3}
              boxSize="10px"
              color="brand.500"
            />
          )}
        </MenuItem>
      );
    });
  }, [sortOptions, activeSortOption]);

  const toggleLike = (id: TPostPreview['id']) => {
    console.log('toggle like for post ', id);
  };

  const memoizedPostPreviews = useMemo(() => {
    const offset = (pagination.currentPage - 1) * pagination.itemsPerPage;
    return postPreviews
      .slice(offset, offset + pagination.itemsPerPage)
      .map(postPreview => (
        <PostPreview
          key={postPreview.id}
          toggleLike={toggleLike}
          {...postPreview}
          wrapperProps={{ minW: '33%' }}
        />
      ));
  }, [postPreviews, pagination]);

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
          <MenuList>{sortMenuItems}</MenuList>
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
          isDisabled={pagination.currentPage === 1}
          onClick={pagination.previousPage}
        >
          Previous
        </Button>
        <Button
          variant="ghost-hover-outline"
          size="sm"
          borderRadius="lg"
          rightIcon={<ChevronRightIcon />}
          isDisabled={pagination.currentPage === pagination.totalPages}
          onClick={pagination.nextPage}
        >
          Next
        </Button>
      </HStack>
    </VStack>
  );
};

export default PostList;

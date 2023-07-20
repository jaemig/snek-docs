import { CheckIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
  HStack,
  Input,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  StackProps
} from '@chakra-ui/react';
import {
  ChangeEventHandler,
  Dispatch,
  FC,
  SetStateAction,
  useMemo,
  useState
} from 'react';
import { TDebounceData } from '../../../types/comm';
import { searchPosts } from '../../../functions/features/post';
import { TPostListData } from '../../../types/features/post';

interface IPostListControlsProps extends StackProps {
  // search: ChangeEventHandler<HTMLInputElement>;
  setPosts: Dispatch<SetStateAction<TPostListData>>;
}

const PostListControls: FC<IPostListControlsProps> = ({
  // search,
  setPosts,
  ...props
}) => {
  const [activeSortOption, setActiveSortOption] =
    useState<(typeof sortOptions)[number]['value']>('recent');

  // This is used to cancel the search if the user types too fast
  // (can't be as a hook because the function requires the latest data during the same render cycle)
  let searchDebounceData: TDebounceData = { state: 'inactive' };

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

  return (
    <HStack spacing={3} w="full" {...props}>
      <Input
        placeholder="Find a post..."
        size="sm"
        borderRadius="lg"
        onChange={e => searchPosts(e, searchDebounceData, setPosts)}
        focusBorderColor="components.input._focus.borderColor"
      />
      <Menu>
        <MenuButton
          as={Button}
          size="sm"
          borderRadius="lg"
          variant="outline"
          fontWeight="semibold"
          rightIcon={
            <ChevronDownIcon display={{ base: 'none', sm: 'initial' }} />
          }
        >
          Sort
        </MenuButton>
        <MenuList zIndex={99}>{sortMenuItems}</MenuList>
      </Menu>
    </HStack>
  );
};

export default PostListControls;

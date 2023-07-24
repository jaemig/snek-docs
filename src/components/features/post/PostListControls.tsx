import { CheckIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
  HStack,
  Input,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  StackProps,
  VStack,
  IconButton,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Collapse
} from '@chakra-ui/react';
import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react';
import { TDebounceData } from '../../../types/comm';
import { searchPosts } from '../../../functions/features/post';
import { TPostListData } from '../../../types/features/post';
import TbFilterDown from '../../icons/tabler/TbFilterDown';
import TbFilterUp from '../../icons/tabler/TbFilterUp';

interface IPostListControlsProps extends StackProps {
  // search: ChangeEventHandler<HTMLInputElement>;
  setPosts: Dispatch<SetStateAction<TPostListData>>;
  enableAdvancedSearch?: boolean;
}

const PostListControls: FC<IPostListControlsProps> = ({
  // search,
  setPosts,
  enableAdvancedSearch = true,
  ...props
}) => {
  const [activeSortOption, setActiveSortOption] =
    useState<(typeof sortOptions)[number]['value']>('recent');

  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);

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
    <VStack w="full">
      <HStack spacing={3} w="75%" {...props}>
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
        {enableAdvancedSearch && (
          <IconButton
            size="sm"
            variant="outline"
            icon={isAdvancedSearchOpen ? <TbFilterDown /> : <TbFilterUp />}
            aria-label={'Toggle advanced search filter visibility'}
            onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
          />
        )}
      </HStack>
      <Collapse
        in={isAdvancedSearchOpen}
        animateOpacity
        style={{ width: '75%' }}
      >
        <HStack gap={5} w="full">
          <InputGroup size="sm">
            <InputLeftAddon borderLeftRadius="lg">Date from</InputLeftAddon>
            <Input type="date" />
            <InputRightAddon>Date to</InputRightAddon>
            <Input type="date" sx={{ borderRightRadius: 'lg' }} />
          </InputGroup>
          <Select placeholder="Language" size="sm" borderRadius="lg">
            <option value="english">English</option>
            <option value="german">German</option>
          </Select>
        </HStack>
      </Collapse>
    </VStack>
  );
};

export default PostListControls;

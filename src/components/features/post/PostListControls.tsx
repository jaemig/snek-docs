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
import { ChangeEvent, FC, useMemo, useRef, useState } from 'react';
import { TDebounceData } from '../../../types/comm';
import { posts } from '../../../functions/features/post';
import { TPostListData } from '../../../types/features/post';
import TbFilterDown from '../../icons/tabler/TbFilterDown';
import TbFilterUp from '../../icons/tabler/TbFilterUp';
import { wait } from '../../../functions/utils';

interface IPostListControlsProps extends StackProps {
  setPosts: (data: TPostListData) => void;
  enableAdvancedSearch?: boolean;
}

const PostListControls: FC<IPostListControlsProps> = ({
  setPosts,
  enableAdvancedSearch = true,
  ...props
}) => {
  const [activeSortOption, setActiveSortOption] =
    useState<(typeof sortOptions)[number]['value']>('recent');

  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const stateRef = useRef<TDebounceData>({ state: 'inactive', timeout: undefined }); // Keep track of the current state of the search

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim();

    clearTimeout(stateRef.current.timeout);
    stateRef.current.timeout = setTimeout(async () => {
      if (!query.length) {
        stateRef.current.state = 'inactive';
        setPosts({ state: 'inactive', posts: [] });
        return;
      }
      
      stateRef.current.state = 'loading';
      setPosts({
        state: 'loading',
        posts: []
      });
      await wait(3000);
      //@ts-expect-error - The state might be changed by another call
      if (stateRef.current.state === 'inactive') return;
      stateRef.current.state = 'success';
      setPosts({
        state: 'success',
        posts: posts
      })
    }, 300)

  }

  return (
    <VStack w="full">
      <HStack spacing={3} w="75%" {...props}>
        <Input
          placeholder="Find a post..."
          size="sm"
          borderRadius="lg"
          onChange={handleInputChange}
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
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
import { ChangeEventHandler, FC, useMemo, useState } from 'react';

interface IPostListControlsProps extends StackProps {
  search: ChangeEventHandler<HTMLInputElement>;
}

const PostListControls: FC<IPostListControlsProps> = ({ search, ...props }) => {
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

  return (
    <HStack spacing={3} w="full" {...props}>
      <Input
        placeholder="Find a post..."
        size="sm"
        borderRadius="lg"
        onChange={search}
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

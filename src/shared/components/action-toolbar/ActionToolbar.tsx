import { FC, useMemo } from 'react';
import { TActionToolbarItem } from './styles/actionToolbar';
import { HStack, Tooltip, IconButton } from '@chakra-ui/react';
import TbBookUpload from '../icons/tabler/TbBookUpload';
import TbDeviceFloppy from '../icons/tabler/TbDeviceFloppy';

interface IActionTOolbarProps {
  actions: TActionToolbarItem[];
}

const ActionToolbar: FC<IActionTOolbarProps> = ({ actions }) => {
  const items = actions.map((action, index) => (
    <Tooltip
      key={index}
      label={action.tooltip}
      bgColor="gray.700"
      color="white"
      placement="top"
    >
      <IconButton
        icon={action.icon}
        size="md"
        aria-label={action.ariaLabel}
        variant="ghost"
        borderRadius="full"
        color="gray.400"
        {...action.buttonProps}
        _hover={{
          bgColor: 'gray.700',
          color: action.hoverColor ?? 'theme.500',
          ...action.buttonProps?._hover
        }}
        transition="background-color 0.2s ease-in-out, color 0.2s ease-in-out"
      />
    </Tooltip>
  ));

  return (
    <HStack
      position="fixed"
      zIndex={10}
      bottom={10}
      left="50%"
      transform="translateX(-50%)"
      bgColor="gray.800"
      border="1px solid"
      borderColor="gray.600"
      px={10}
      py={2}
      borderRadius="full"
      spacing={3}
    >
      {items}
    </HStack>
  );
};

export default ActionToolbar;

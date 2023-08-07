import { FC } from 'react';
import { TActionToolbarItem } from './types/actionToolbar';
import { HStack, Tooltip, IconButton } from '@chakra-ui/react';

interface IActionTOolbarProps {
  actions: TActionToolbarItem[];
}

const ActionToolbar: FC<IActionTOolbarProps> = ({ actions }) => {
  const items = actions.map((action, index) => (
    <Tooltip
      key={index}
      label={action.tooltip}
      bgColor="components.actionToolbar.tooltip.bgColor"
      color="shared.text.default"
      placement="top"
      marginBottom={1}
    >
      <IconButton
        icon={action.icon}
        size="md"
        aria-label={action.ariaLabel}
        variant="ghost"
        borderRadius="full"
        color="components.actionToolbar.button.color"
        {...action.buttonProps}
        _hover={{
          bgColor: 'components.actionToolbar.button._hover.bgColor',
          color:
            action.hoverColor ?? 'components.actionToolbar.button._hover.color',
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
      bgColor="components.actionToolbar.container.bgColor"
      border="1px solid"
      borderColor="components.actionToolbar.container.borderColor"
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

import {
  FocusLock,
  Input,
  InputGroup,
  InputRightElement,
  Kbd,
  Text,
  useMenuButton,
  useMenuContext,
  useMenuList
} from '@chakra-ui/react';
import {
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useMemo
} from 'react';

import { getPlatform, isTouchDevice } from '../../functions/utils';

interface SearchInputProps {
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

/**
 * The search input component for the search menu.
 */
const SearchInput = forwardRef<HTMLDivElement, SearchInputProps>(
  ({ setSearchQuery }, ref) => {
    const menu = useMenuContext();
    const menuButton = useMenuButton(
      {
        onKeyDown: e => {
          if (e.key === 'Escape') {
            menu.onClose();

            // Clear input
            e.target.value = '';
          } else if (e.key === 'ArrowDown') {
            if (menu.isOpen) {
              menu.setFocusedIndex(0);
            }

            // Prevent default behavior
            e.preventDefault();
          }
        }
      },
      ref
    );

    const kbd = useMemo(() => {
      const platform = getPlatform();

      if (menu.isOpen) {
        return 'Esc';
      }

      return platform === 'mac' ? '⌘K' : 'Ctrl+K';
    }, [menu.isOpen]);

    const isFocusLocked = useMemo(() => {
      return menu.isOpen && menu.focusedIndex === -1;
    }, [menu.isOpen, menu.focusedIndex]);

    useEffect(() => {
      if (!menu.isOpen) {
        menu.setFocusedIndex(-1);
      }
    }, [menu.isOpen]);

    return (
      <FocusLock isDisabled={!isFocusLocked}>
        <InputGroup size="sm">
          <Input
            type="text"
            htmlSize={20}
            placeholder="Search documentation"
            borderRadius="md"
            backgroundColor="blackAlpha.50"
            pr="45px"
            _focus={{
              backgroundColor: 'topNav.input.focus.bgColor'
            }}
            focusBorderColor="theme.500"
            {...menuButton}
            onClick={e => {
              const value = e.currentTarget.value;

              // Cancel if the value is empty
              if (!value) {
                return;
              }

              // Otherwise use the default behavior
              menuButton.onClick(e);
            }}
            onInput={e => {
              const query = e.currentTarget.value.trim();
              if (!menu.isOpen && query.length > 0) {
                menu.onOpen();
              }
              setSearchQuery(e.currentTarget.value);
            }}
          />
          {!isTouchDevice() && (
            <InputRightElement
              children={
                <Kbd
                  borderBottomWidth={1}
                  background="transparent"
                  borderRadius={4}
                  py={0.5}>
                  {kbd}
                </Kbd>
              }
              pr="10px"
              color="rgb(107, 114, 128)"
            />
          )}
        </InputGroup>
      </FocusLock>
    );
  }
);

export default SearchInput;

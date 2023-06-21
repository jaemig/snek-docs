import {
  FocusLock,
  Input,
  InputGroup,
  InputRightElement,
  Kbd,
  useMenuButton,
  useMenuContext
} from '@chakra-ui/react';
import {
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useMemo,
  KeyboardEvent as ReactKeyboardEvent,
  useState
} from 'react';

import { getPlatform, isTouchDevice } from '../../functions/utils';

interface SearchInputProps {
  setSearchQuery: Dispatch<SetStateAction<string>>;
  openFirstLink: () => void;
}

/**
 * The search input component for the search menu.
 */
const SearchInput = forwardRef<HTMLDivElement, SearchInputProps>(
  ({ setSearchQuery, openFirstLink }, ref) => {
    const menu = useMenuContext();
    const menuButton = useMenuButton(
      {
        id: 'search-input',
        onKeyDown: (e: ReactKeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Escape') {
            menu.onClose();

            // Clear input
            e.currentTarget.value = '';
          } else if (e.key === 'ArrowDown') {
            if (menu.isOpen) {
              menu.setFocusedIndex(1);
            }

            // Prevent default behavior
            e.preventDefault();
          }
        }
      },
      ref
    );

    console.log("menuButton['aria-controls']", menuButton['aria-controls']);

    const [kbd, setKbd] = useState<string | null>(null);

    useEffect(() => {
      const platform = getPlatform();

      if (menu.isOpen) {
        setKbd('Esc');
      } else {
        setKbd(platform === 'mac' ? '⌘ K' : 'Ctrl+K');
      }
    }, [kbd]);

    const isFocusLocked = useMemo(() => {
      return menu.isOpen && menu.focusedIndex === -1;
    }, [menu.isOpen, menu.focusedIndex]);

    useEffect(() => {
      // Focus the input when the user presses the shortcut
      const handleGlobalKeydown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k')
          menu.buttonRef.current?.focus();

        if (e.key === 'Enter' && menu.isOpen) {
          openFirstLink();
        }
      };

      window.addEventListener('keydown', handleGlobalKeydown);

      return () => {
        window.removeEventListener('keydown', handleGlobalKeydown);
      };
    }, []);

    useEffect(() => {
      if (!menu.isOpen) {
        menu.setFocusedIndex(-1);
      }
    }, [menu.isOpen]);

    return (
      <InputGroup size="sm" {...menuButton}>
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
          onKeyDownCapture={e => {
            if (e.key === 'Escape') {
              // Close the menu and blur the input when the user presses the escape key
              menu.onClose();
              e.currentTarget.blur();
            } else if (
              e.key === 'Enter' &&
              menu.isOpen &&
              menu.focusedIndex === -1
            ) {
              // Open the link from the first result item
              // and close the menu automatically
              // when the user presses the enter key
              openFirstLink();
              menu.onClose();
            }
          }}
        />
        {!isTouchDevice() && (
          <InputRightElement
            children={
              <Kbd
                borderBottomWidth={1}
                background="transparent"
                borderRadius={4}
                py={0.5}
              >
                {kbd}
              </Kbd>
            }
            pr="10px"
            color="rgb(107, 114, 128)"
          />
        )}
      </InputGroup>
    );
  }
);

export default SearchInput;

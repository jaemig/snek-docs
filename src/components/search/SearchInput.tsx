import {InputGroup, Input, InputRightElement, Kbd, useMenuButton, useMenuContext} from '@chakra-ui/react'
import React, {Dispatch, FC, SetStateAction, forwardRef, useMemo} from 'react'
import {getPlatform, isTouchDevice} from '../../helpers/utils'

interface SearchInputProps {
    setSearchQuery: Dispatch<SetStateAction<string>>;
}

/**
 * The search input component for the search menu.
 */
const SearchInput = forwardRef<HTMLDivElement, SearchInputProps> (({ setSearchQuery }, ref) => {
    const menu = useMenuContext();
    const menuButton = useMenuButton({}, ref);
  
    const platform = useMemo(() => {
      switch (getPlatform()) {
        case 'mac':
          return '⌘';
        case 'windows':
          return 'Ctrl';
        default:
          return '';
      }
    }, [])
  
    return (
      <InputGroup size="sm">
          <Input
            type="text"
            htmlSize={20}
            placeholder='Search documentation'
            borderRadius='md'
            backgroundColor='blackAlpha.50'
            pr='45px'
            _focus={{
                backgroundColor: 'topNav.input.focus.bgColor',
            }}
            focusBorderColor='theme.500'
            {...menuButton}
            onClick={(e) => {
              const value = e.currentTarget.value;
      
              // Cancel if the value is empty
              if (!value) {
                return;
              }
      
              // Otherwise use the default behavior
              menuButton.onClick(e);
            }}
            onInput={(e) => {
              if (!menu.isOpen) {
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
                {platform} K
              </Kbd>
            }
            pr="10px"
            color="rgb(107, 114, 128)"
          />
        )}
      </InputGroup>
    );
  });

export default SearchInput

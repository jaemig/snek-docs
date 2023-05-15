import { InputGroup, Input, InputRightElement, Kbd } from "@chakra-ui/react";
import React, { FC, useMemo } from "react";
import { getPlatform, isTouchDevice } from "../../../helpers/utils";

/**
 * The search input component for the top and mobile nav.
 */
const SearchInput: FC = () => {

    // Current platform of the user
    const platform = useMemo(() => {
        switch (getPlatform()) {
            case 'mac':
                return '⌘';
            case 'windows':
                return 'Ctrl';
            default:
                return '';
        }
    }, []);

    return (
        <InputGroup
            size='sm'
        >
            <Input
                htmlSize={20}
                placeholder='Search documentation'
                borderRadius='md'
                backgroundColor='blackAlpha.50'
                pr='45px'
                _focus={{
                    backgroundColor: 'topNav.input.focus.bgColor',
                }}
                focusBorderColor='theme.500'
            />
            {
                !isTouchDevice() && (
                    <InputRightElement
                        children={
                            <Kbd
                                borderBottomWidth={1}
                                background='transparent'
                                borderRadius={4}
                                py={0.5}
                            >{platform} K</Kbd>
                        }
                        pr='10px' 
                        color='rgb(107, 114, 128)'
                    />
                    )
                }
            </InputGroup>
    )
}

export default SearchInput;
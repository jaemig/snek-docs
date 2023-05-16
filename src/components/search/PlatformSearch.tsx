import { InputGroup, Input, InputRightElement, Kbd } from "@chakra-ui/react";
import React, { FC } from "react";


const PlatformSearch: FC = () => {
    return (
        <>
        <InputGroup
            size='sm'
            display={{ base: 'none', md: 'initial' }}
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
            <InputRightElement
                children={
                    <Kbd
                        borderBottomWidth={1}
                        background='transparent'
                        borderRadius={4}
                        py={0.5}
                    >⌘ K</Kbd>
                }
                pr='10px' 
                color='rgb(107, 114, 128)'
            />
        </InputGroup>
        </>
    )
}

export default PlatformSearch;
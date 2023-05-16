import { InputGroup, Input, InputRightElement, Kbd, Box } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import SearchMenu from "./SearchMenu";
import SearchInput from "../../layout/navigation/components/SearchInput";


const PlatformSearch: FC = () => {

    const [isOpen, setIsOpen] = useState(true);

    return (
        <Box
            position='relative'
        >
            <SearchInput />
            <SearchMenu isOpen={isOpen} setIsOpen={setIsOpen} query={'layout'} />
        </Box>
    )
}

export default PlatformSearch;
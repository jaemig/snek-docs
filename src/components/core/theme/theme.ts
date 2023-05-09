import { extendTheme, type ThemeConfig } from "@chakra-ui/react";


const theme: ThemeConfig = extendTheme({
    initialColorMode: 'light',
    useSystemColorMode: false, //TODO: Implement system color mode
})

export default theme;
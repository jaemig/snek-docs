import { extendTheme, StyleFunctionProps, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import themeComponents from "./components";
import themeColors from "./colors";
import themeSemanticTokens from "./semanticTokens";


const theme: ThemeConfig = extendTheme({
    initialColorMode: 'system',
    useSystemColorMode: true, //? This doesnt sync with the system color mode
    /**
     * SEMANTIC TOKENS
     */
    semanticTokens: themeSemanticTokens,
    /**
     * CUSTOM COLORS
     */
    colors: themeColors,
    /**
     * COMPONENT CUSTOMIZATIONS
     */
    components: themeComponents,
})

export default theme;
import React, { FC } from "react";
import TopNav from "./navigation/TopNav";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import theme from "../theme/theme";

interface AppLayoutProps {
    children?: React.ReactNode;
}

/**
 * The global layout component.
 * This should not be directly used in pages, but used in gatsby.
 */
const AppLayout: FC<AppLayoutProps> = ({ children }) => {
    return (
        <ChakraProvider theme={theme}>
            <Flex
                w='100vw'
                minW='100vw'
                h='100vh'
                minH='100vh'
                direction='column'
                pb={5}
            >
            <TopNav />
            <Box
                flex={1}
            >
                { children }
            </Box>
            </Flex>
        </ChakraProvider>
    );
}

export default AppLayout;
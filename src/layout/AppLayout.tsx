import React, { FC } from "react";
import TopNav from "./navigation/TopNav";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import theme from "../theme/theme";
import Footer from "./Footer";

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
                w='100%'
                minW='max(210px, 100vw)'
                h='max(100%, 100vh)'
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
            <Footer />
        </ChakraProvider>
    );
}

export default AppLayout;
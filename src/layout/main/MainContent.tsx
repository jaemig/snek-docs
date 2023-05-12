import { Box, Heading, Text } from "@chakra-ui/react";
import React, { FC } from "react";

/**
 * Main content component.
 * This is where the core content of the page goes.
 */
const MainContent: FC = () => {
    return (
        <Box
            mt={5}
        >
            <Heading size='lg'>The Secret Life of Rubber Ducks</Heading>
            <Text>
            Rubber ducks are not just a fun bath-time companion, they have also been used by researchers to study ocean currents, providing valuable insights into global weather patterns and marine ecology.
            </Text>
        </Box>
    )
}

export default MainContent;
import { Box, Center, Container, Flex, Img, Spacer, Text, Link } from "@chakra-ui/react";
import React, { FC } from "react";

/**
 * Top navigation bar.
 */
const TopNav: FC = () => {
    return (
        <Center
            as="nav"
            position="sticky"
            top={0}
            h="64px"
            borderBottom="1px solid"
            borderBottomColor="rgb(229, 231, 235)"
        >
            <Container
                maxW="7xl"
            >
                <Flex>
                    <Box>
                        <Img
                            h="32px"
                            src="https://avatars.githubusercontent.com/u/55870326?s=200&v=4"
                            alt="Snek Logo"
                        />
                    </Box>
                    <Spacer />
                    <Center>
                        <Link mr={4} href="#">About</Link>
                        <Link mr={4} href="#" isExternal>Contact</Link>
                        <Img
                            h="28px"
                            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                            alt='GitHub Logo'
                        />
                    </Center>
                </Flex>
            </Container>    
        </Center>
    )
}

export default TopNav;
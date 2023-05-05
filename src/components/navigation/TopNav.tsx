import { Box, Center, Container, Flex, Img, Spacer, Text, Link, LinkProps, HStack, Input, InputGroup, InputRightElement, Kbd } from "@chakra-ui/react";
import React, { FC } from "react";

const navLinkProps = {
    color: 'gray.800',
    opacity: 0.8,
    _hover: {
        textDecoration: 'none',
        opacity: 1
    },
    fontSize: 'sm',
}

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
                        <HStack spacing={4}>
                            <Link href="#" {...navLinkProps}>About</Link>
                            <Link href="#" isExternal {...navLinkProps}>Contact</Link>
                            <InputGroup size="sm">
                                <Input
                                    htmlSize={20}
                                    placeholder="Search documentation"
                                    borderRadius="md"
                                    backgroundColor="blackAlpha.50"
                                    pr="45px"
                                    _focus={{
                                        backgroundColor: 'white',
                                    }}
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
                                    pr="10px" 
                                    color="rgb(107, 114, 128)"
                                />
                            </InputGroup>
                            <Link 
                                display="inline-block"
                                href="https://github.com/Jan-Emig/snek-docs"
                                // This doesnt work for some reason (min-width solves it temporarily)
                                boxSize="28px"
                                minW='28px'
                            >
                                <Img
                                    boxSize="28px"
                                    src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                                    alt='GitHub Logo'
                                />
                            </Link>
                        </HStack>
                    </Center>
                </Flex>
            </Container>    
        </Center>
    )
}

export default TopNav;
import { Center, Flex, Img, Spacer, Link, HStack, Input, InputGroup, InputRightElement, Kbd, useColorModeValue } from '@chakra-ui/react';
import { StaticImage } from 'gatsby-plugin-image';
import React, { FC } from 'react';
import GitHub from '../../components/icons/GitHub';

const navLinkProps = {
    opacity: 0.8,
    _hover: {
        textDecoration: 'none',
        opacity: 1
    },
    fontSize: 'sm',
}

const mobileProps = {
    display: { base: 'none', lg: 'initial' },
}

/**
 * Top navigation bar.
 */
const TopNav: FC = () => {
    return (
        <Center
            as='nav'
            position='sticky'
            top={0}
            h='64px'
            px={{ base: 5, xl: 0 }}
            borderBottom='1px solid'
            borderBottomColor='topNav.borderColor'
            backgroundColor='topNav.bgColor'
            backdropFilter='blur(5px)'
            zIndex={999}
        >
            <Flex w='7xl'>
                <Link
                    href='#'
                    _hover={{
                        transform: 'scale(1.1)'
                    }}
                    transition='transform 0.2s ease-in-out'
                >
                    <Img
                        h='32px'
                        src='https://avatars.githubusercontent.com/u/55870326?s=200&v=4'
                        alt='Snek Logo'
                    />
                </Link>
                <Spacer />
                <Center>
                    <HStack spacing={4}>
                        <Link
                            href='#'
                            {...navLinkProps}
                            {...mobileProps}
                        >About</Link>
                        <Link
                            href='#'
                            isExternal
                            {...navLinkProps}
                            {...mobileProps}
                        >Contact</Link>
                        <InputGroup
                            size='sm'
                            {...mobileProps}
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
                        <Link 
                            display='inline-block'
                            href='https://github.com/Jan-Emig/snek-docs'
                            // This doesnt work for some reason (min-width solves it temporarily)
                            boxSize='32px'
                            minW='32px'
                            _hover={{
                                transform: 'scale(1.2)'
                            }}
                            transition='transform 0.2s ease-in-out'
                        >
                            <GitHub boxSize='32px' fill='topNav.GitHubFill' />
                        </Link>
                    </HStack>
                </Center>
            </Flex>
        </Center>
    )
}

export default TopNav;
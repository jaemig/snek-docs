import { Center, Flex, Spacer, Link, HStack, Input, InputGroup, InputRightElement, Kbd, VStack, Box, Image, useDisclosure } from '@chakra-ui/react';
import React, { FC } from 'react';
import GitHub from '../../components/icons/GitHub';
import SnekIcon from '../../assets/icons/brand.svg';
import MemoizedLinks from '../../components/MemoizedLink';
import { LinkData } from './navigation.types';
import MobileNavDrawer from './MobileNavDrawer';

const links: LinkData[] = [
    {
        name: 'Documentation',
        href: '#',
        isActive: true,
    },
    {
        name: 'About',
        href: '#'
    },
    {
        name: 'Contact',
        href: '#'
    }
]

const mobileProps = {
    display: { base: 'none', md: 'initial' },
}

const navLinkProps = {
    ...mobileProps,
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

    // Mobile menu drawer
    const { isOpen, onOpen, onClose } = useDisclosure();

    const openDrawer = () => {
        onOpen();
    }

    return (
        <>
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
                        <Image
                            h='32px'
                            src={SnekIcon}
                            alt='Snek Logo'
                        />
                    </Link>
                    <Spacer />
                    <Center>
                        <HStack spacing={4}>
                            <MemoizedLinks 
                                links={links}
                                props={navLinkProps} 
                                activeProps={{
                                    opacity: 1,
                                    fontWeight: 'semibold'
                                }}
                            />
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
                            <VStack 
                                spacing={1.5}
                                display={{ base: 'initial', md: 'none' }}
                                onClick={openDrawer}
                            >
                                <Box
                                    w='24px'
                                    h='2px'
                                    backgroundColor='white'
                                    borderRadius='full'
                                />
                                <Box
                                    w='24px'
                                    h='2px'
                                    backgroundColor='white'
                                    borderRadius='full'
                                />
                                <Box
                                    w='24px'
                                    h='2px'
                                    backgroundColor='white'
                                    borderRadius='full'
                                />
                            </VStack>
                        </HStack>
                    </Center>
                </Flex>
            </Center>
            <MobileNavDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </>
    )
}

export default TopNav;
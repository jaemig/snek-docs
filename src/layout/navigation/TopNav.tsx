import { Center, Flex, Spacer, Link, HStack, Input, InputGroup, InputRightElement, Kbd, VStack, Box, Image, useDisclosure, Button } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import GitHub from '../../components/icons/GitHub';
import SnekIcon from '../../assets/icons/brand.svg';
import MemoizedLinks from '../../components/MemoizedLink';
import { LinkData } from './navigation.types';
import MobileNavDrawer from './MobileNavDrawer';
import SearchMenu from '../../components/search/SearchMenu';

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

const navLinkProps = {
    display: { base: 'none', md: 'initial' },
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
    const [hamburgerClass, setHamburgerClass] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure(); // Mobile menu drawer

    const openDrawer = () => {
        setHamburgerClass('open');
        onOpen();
    }

    const closeDrawer = () => {
        setHamburgerClass('');
        onClose();
    }

    const toggleMobileMenu = () => {
        if (hamburgerClass === 'open') closeDrawer();
        else openDrawer();
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
                zIndex={99999999999}
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
                            <SearchMenu />
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
                                <Button 
                                    variant='ghost'
                                    size='sm'
                                    display={{ base: 'initial', md: 'none' }}
                                >
                                    <VStack 
                                        spacing={1.5}
                                        onClick={toggleMobileMenu}
                                        className={hamburgerClass}
                                        __css={{
                                            '&.open': {
                                                '& > div:nth-child(1)': {
                                                    transform: 'rotate(-45deg) translate(-5px, 5px)'
                                                },
                                                '& > div:nth-child(2)': {
                                                    opacity: 0
                                                },
                                                '& > div:nth-child(3)': {
                                                    transform: 'rotate(45deg) translate(-5px, -5px)'
                                                },
                                            },
                                            '& > div': {
                                                transition: 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out'
                                            }
                                        }}
                                    >
                                        <Box
                                            w='24px'
                                            h='2px'
                                            backgroundColor='topNav.mobile.hamburger.bgColor'
                                            borderRadius='full'
                                        />
                                        <Box
                                            mt='5px'
                                            w='24px'
                                            h='2px'
                                            backgroundColor='topNav.mobile.hamburger.bgColor'
                                            borderRadius='full'
                                        />
                                        <Box
                                            mt='5px'
                                            w='24px'
                                            h='2px'
                                            backgroundColor='topNav.mobile.hamburger.bgColor'
                                            borderRadius='full'
                                        />
                                    </VStack>
                                </Button>
                        </HStack>
                    </Center>
                </Flex>
            </Center>
            <MobileNavDrawer 
                isOpen={isOpen} 
                onOpen={onOpen}
                onClose={closeDrawer} 
            />
        </>
    )
}

export default TopNav;
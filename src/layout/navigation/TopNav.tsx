import {
  Center,
  Flex,
  Spacer,
  HStack,
  VStack,
  Box,
  Image,
  useDisclosure,
  Button
} from '@chakra-ui/react';
import React, { FC, useEffect, useMemo, useState } from 'react';
import GitHub from '../../components/icons/GitHub';
import SnekIcon from '../../assets/icons/brand.svg';
import MemoizedLinks from '../../components/core/MemoizedLink';
import MobileNavDrawer from './MobileNavDrawer';
import SearchMenu from '../../components/search/SearchMenu';
import { TTopNavLinkData } from '../../types/navigation';
import Link from '../../components/core/Link';
import { useNavOffset } from '../../hooks/use-nav-offset';
import { useLocation } from '@reach/router';
import useWindowSize from '../../hooks/use-current-window-size';

const links: TTopNavLinkData[] = [
  {
    name: 'Documentation',
    href: '/docs',
    matchMethod: 'includes'
  },
  {
    name: 'About',
    matchMethod: 'exact',
    href: '/about/'
  },
  {
    name: 'Contact',
    matchMethod: 'exact',
    href: '/contact/'
  }
];

const navLinkProps = {
  display: { base: 'none', md: 'initial' },
  opacity: 0.8,
  _hover: {
    textDecoration: 'none',
    opacity: 1
  },
  fontSize: 'sm'
};

/**
 * Top navigation bar.
 */
const TopNav: FC = () => {
  const [hamburgerClass, setHamburgerClass] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure(); // Mobile menu drawer

  const navTopOffset = useNavOffset();
  const location = useLocation();
  const windowSize = useWindowSize();

  const activatedLinks = useMemo(() => {
    let activeLinkFound = false;
    return links.map(link => {
      if (activeLinkFound) return link;
      const isActive = link.matchMethod
        ? link.matchMethod === 'exact'
          ? location.pathname === link.href
          : location.pathname.includes(link.href)
        : false;

      if (isActive) activeLinkFound = true;
      return {
        ...link,
        isActive
      };
    });
  }, [location.pathname]);

  useEffect(() => {
    if (windowSize.width >= 768 && isOpen) closeDrawer();
  }, [windowSize.width]);

  const openDrawer = () => {
    setHamburgerClass('open');
    onOpen();
  };

  const closeDrawer = () => {
    setHamburgerClass('');
    onClose();
  };

  const toggleMobileMenu = () => {
    if (hamburgerClass === 'open') closeDrawer();
    else openDrawer();
  };

  return (
    <>
      <Center
        as="nav"
        position="sticky"
        top={navTopOffset}
        h="64px"
        px={{ base: 5, xl: 0 }}
        borderBottom="1px solid"
        borderBottomColor="topNav.borderColor"
        backgroundColor="shared.translucent.bgColor"
        backdropFilter="blur(10px)"
        zIndex={2}
      >
        <Flex w="7xl">
          <Link
            href="/"
            _hover={{
              transform: 'scale(1.1)'
            }}
            transition="transform 0.2s ease-in-out"
          >
            <Image h="32px" src={SnekIcon} alt="Snek Logo" />
          </Link>
          <Spacer />
          <Center>
            <HStack spacing={4}>
              <MemoizedLinks
                links={activatedLinks}
                props={navLinkProps}
                activeProps={{
                  opacity: 1,
                  fontWeight: 'semibold'
                }}
              />
              <Box display={{ base: 'none', md: 'initial' }}>
                <SearchMenu
                  // width base 0 is a hack to prevent the menu from causing a horizontal scrollbar
                  menuListProps={{
                    width: { base: 0, md: '500px' },
                    zIndex: 3
                  }}
                />
              </Box>
              <Link
                display="inline-block"
                href="https://github.com/Jan-Emig/snek-docs"
                // This doesnt work for some reason (min-width solves it temporarily)
                boxSize="32px"
                minW="32px"
                _hover={{
                  transform: 'scale(1.2)'
                }}
                transition="transform 0.2s ease-in-out"
              >
                <GitHub boxSize="32px" fill="topNav.GitHubFill" />
              </Link>
              <Button
                variant="ghost"
                size="sm"
                display={{ base: 'initial', md: 'none' }}
              >
                <VStack
                  spacing={1.5}
                  onClick={toggleMobileMenu}
                  className={hamburgerClass}
                  __css={{
                    '&.open': {
                      '& > div:nth-child(1)': {
                        transform: 'rotate(45deg)'
                      },
                      '& > div:nth-child(2)': {
                        opacity: 0
                      },
                      '& > div:nth-child(3)': {
                        transform: 'rotate(-45deg)'
                      }
                    },
                    '& > div': {
                      transition:
                        'transform 0.2s ease-in-out, opacity 0.2s ease-in-out'
                    }
                  }}
                >
                  <Box
                    transformOrigin="left"
                    w="24px"
                    h="2px"
                    backgroundColor="topNav.mobile.hamburger.bgColor"
                    borderRadius="full"
                  />
                  <Box
                    w="24px"
                    h="2px"
                    backgroundColor="topNav.mobile.hamburger.bgColor"
                    borderRadius="full"
                  />
                  <Box
                    transformOrigin="left"
                    w="24px"
                    h="2px"
                    backgroundColor="topNav.mobile.hamburger.bgColor"
                    borderRadius="full"
                  />
                </VStack>
              </Button>
            </HStack>
          </Center>
        </Flex>
      </Center>
      <MobileNavDrawer isOpen={isOpen} onOpen={onOpen} onClose={closeDrawer} />
    </>
  );
};

export default TopNav;

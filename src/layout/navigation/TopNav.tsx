import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Spacer,
  useDisclosure
} from '@chakra-ui/react';
import { useLocation } from '@reach/router';
import { FC, useEffect, useMemo, useState } from 'react';
import SnekIcon from '../../assets/icons/brand.svg';
import Link from '../../components/core/Link';
import MemoizedLinks from '../../components/core/MemoizedLink';
import GitHub from '../../components/icons/GitHub';
import SearchMenu from '../../components/search/SearchMenu';
import useWindowSize from '../../hooks/use-current-window-size';
import { useNavOffset } from '../../hooks/use-nav-offset';
import { TTopNavLinkData } from '../../types/navigation';
import MobileNavDrawer from './MobileNavDrawer';

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
                <Box
                  position="relative"
                  boxSize="11px"
                  onClick={toggleMobileMenu}
                  className={hamburgerClass}
                  __css={{
                    '&.open': {
                      '& > div:nth-of-type(1)': {
                        top: '8px',
                        transform: 'rotate(45deg)'
                      },
                      '& > div:nth-of-type(2)': {
                        opacity: 0
                      },
                      '& > div:nth-of-type(3)': {
                        top: '8px',
                        transform: 'rotate(-45deg)'
                      }
                    },
                    '& > div': {
                      transition:
                        'transform 0.2s ease-in-out, opacity 0.2s ease-in-out, top 0.2s ease-in-out, background-color 0.2s ease-in-out'
                    }
                  }}
                >
                  <Box
                    position="absolute"
                    top={0}
                    w="11px"
                    h="2px"
                    backgroundColor="topNav.mobile.hamburger.bgColor"
                    borderRadius="full"
                  />
                  <Box
                    position="absolute"
                    top="5px"
                    w="11px"
                    h="2px"
                    backgroundColor="topNav.mobile.hamburger.bgColor"
                    borderRadius="full"
                  />
                  <Box
                    position="absolute"
                    top="10px"
                    w="11px"
                    h="2px"
                    backgroundColor="topNav.mobile.hamburger.bgColor"
                    borderRadius="full"
                  />
                </Box>
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

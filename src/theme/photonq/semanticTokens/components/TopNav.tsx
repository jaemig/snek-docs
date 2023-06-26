import {
  Flex,
  Center,
  Spacer,
  HStack,
  LinkProps,
  Image,
  FlexProps
} from '@chakra-ui/react';
import { FC, useEffect, useMemo, useState } from 'react';
import Link from '../../../../components/core/Link';

import GrayedUniWienLogo from '../../../../photonq/assets/icons/uni-wien-logo-gray.svg';
import ColorizedUniWienLogo from '../../../../photonq/assets/icons/uni-wien-logo-colorized.svg';
import { useNavOffset } from '../../../../hooks/use-nav-offset';
import useScrollPosition from '../../../../hooks/use-scroll-position';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';

const TopNav: FC = () => {
  const navOffset = useNavOffset();
  const scrollPos = useScrollPosition();

  const [colorMode, setColorMode] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const heroHeight = document.querySelector<HTMLDivElement>('#hero');
    if (heroHeight) {
      const heroHeightPx = heroHeight.getBoundingClientRect().height;
      console.log('heroScroll: ', scrollPos, heroHeightPx);
      if (scrollPos < heroHeightPx) {
        setColorMode('dark');
      } else {
        setColorMode('light');
      }
    }
  }, [scrollPos]);

  let linkProps: LinkProps = {};

  let styleProps: FlexProps = {};

  if (colorMode === 'dark') {
    styleProps = {
      bgColor: 'rgba(13, 14, 17, 0.7)',
      color: 'pq.layout.topNav.color'
    };
    linkProps = {
      opacity: 0.7,
      _hover: {
        opacity: 1
      }
    };
  } else {
    styleProps = {
      bgColor: 'rgba(255, 255, 255, 0.7)',
      color: 'black'
    };
    linkProps = {
      _hover: {
        color: 'pq.500'
      }
    };
  }

  return (
    <Flex
      as="nav"
      position="sticky"
      w="full"
      h="64px"
      top={navOffset}
      {...styleProps}
      backdropFilter="blur(10px)"
      fontWeight={500}
      zIndex={1000}
      transition="background-color 0.2s ease-in-out"
    >
      <Center>
        <Link href="/">
          <Image
            h="50px"
            src={
              colorMode === 'dark' ? GrayedUniWienLogo : ColorizedUniWienLogo
            }
          ></Image>
        </Link>
      </Center>
      <Spacer />
      <Center as={HStack} spacing={10}>
        <Link {...linkProps}>Home</Link>
        <Link {...linkProps}>Documentation</Link>
        <Link {...linkProps}>Sign In</Link>
        <Link {...linkProps}>Sign Up</Link>
      </Center>
      <Spacer />
    </Flex>
  );
};

export default TopNav;

import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Image,
  LinkProps,
  Spacer,
  Text,
  VStack
} from '@chakra-ui/react';
import { FC } from 'react';
import { useNavOffset } from '../../hooks/use-nav-offset';
import Link from '../../components/core/Link';

import UniWienLogo from '../assets/icons/uni-wien-logo.svg';
import HeroImg from '../assets/images/hero_img.webp';
import { Field } from '@snek-at/jaen';

const Hero: FC = () => {
  const navOffset = useNavOffset();

  const linkProps: LinkProps = {
    opacity: 0.7,
    _hover: {
      opacity: 1
    }
  };

  return (
    <VStack
      h={`calc(100vh - ${navOffset})`}
      bgColor="pq.shared.body"
      spacing={0}
    >
      <Flex
        as="nav"
        position="sticky"
        w="full"
        h="64px"
        top={navOffset}
        borderBottom="1px solid red"
        color="pq.layout.topNav.color"
        fontWeight={500}
      >
        <Center>
          <Link href="/">
            <Image h="50px" src={UniWienLogo}></Image>
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
      <Box w="full" flexGrow={1} color="white">
        <Center h="full">
          <Box textAlign="center">
            <Field.Text
              name="heroTitle"
              fontSize="6xl"
              defaultValue="Start quantum computing with us"
            />
            <Field.Text
              name="heroSubtitle"
              fontSize="xl"
              mt={5}
              defaultValue="Learn quantum computing and run your circuits on your photonic quantum hardawre"
            />
            <Button
              mt={10}
              variant="outline"
              colorScheme="blue"
              px={5}
              borderRadius="xl"
              bgColor="rgba(2, 116, 192, 0.07)"
              position="relative"
            >
              Register Now
            </Button>
            <Center>
              <Image mt={20} src={HeroImg} w="510px" />
            </Center>
          </Box>
        </Center>
      </Box>
    </VStack>
  );
};

export default Hero;

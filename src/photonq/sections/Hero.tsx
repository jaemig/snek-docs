import { Box, Button, Center, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useNavOffset } from '../../shared/hooks/use-nav-offset';

import { Field } from '@snek-at/jaen';

const Hero: FC = () => {
  const navOffset = useNavOffset();

  return (
    <VStack
      h={{ base: 'max-content', md: `calc(100vh - ${navOffset} - 250px)` }}
      minH="max-content"
      bgColor="pq.shared.body.bgColor"
      spacing={0}
      id="hero"
      overflowX="hidden"
      p={{ base: 5, lg: 0 }}
    >
      <Box w="full" flexGrow={1} color="white" pt="64px">
        <Center h="full">
          <Box textAlign="center" position="relative">
            <Box
              position="absolute"
              top="calc(50% - 175px)"
              left={0}
              zIndex={-1}
              bgColor="pq.500"
              boxSize="290px"
              filter="blur(140px)"
              opacity={1}
            />
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
              variant="pq-outline"
              colorScheme="blue"
              px={5}
              borderRadius="xl"
              bgColor="rgba(2, 116, 192, 0.07)"
            >
              <Field.Text name="HeroButtonText" defaultValue="Register Now" />
            </Button>
            <Center>
              <Box mt={20} w="50vw" maxW="512px" minW="250px">
                <Field.Image name="heroImage" />
              </Box>
            </Center>
            <Box
              position="absolute"
              top="calc(50% - 175px)"
              right="-145px"
              zIndex={-1}
              bgColor="#A71C48"
              boxSize="290px"
              filter="blur(140px)"
              opacity={1}
            />
          </Box>
        </Center>
      </Box>
    </VStack>
  );
};

export default Hero;

import { FC } from 'react';
import Hero from './sections/hero';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme/theme';

export const LandingPageContent: FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Hero />
    </ChakraProvider>
  );
};

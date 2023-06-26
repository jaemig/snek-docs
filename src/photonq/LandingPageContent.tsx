import { FC } from 'react';
import Hero from './sections/Hero';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import theme from '../theme/theme';
import Features from './sections/Features';
import { Global } from '@emotion/react';
import PhotonQ from './sections/PhotonQ';
import AboutUs from './sections/AboutUs';
import Footer from './sections/Footer';
import TopNav from '../theme/photonq/semanticTokens/components/TopNav';

export const LandingPageContent: FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Global
        styles={{
          body: {
            backgroundColor: '#0D0E11'
          }
        }}
      />
      <TopNav />
      <Hero />
      <Features />
      <PhotonQ />
      <AboutUs />
      <Footer />
    </ChakraProvider>
  );
};

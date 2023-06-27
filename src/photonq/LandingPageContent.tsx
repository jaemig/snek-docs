import { FC, useMemo } from 'react';
import Hero from './sections/Hero';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme/theme';
import Features from './sections/Features';
import { Global } from '@emotion/react';
import PhotonQ from './sections/PhotonQ';
import AboutUs from './sections/AboutUs';
import Footer from './sections/Footer';
import TopNav from '../components/photonq/TopNav';
import { MenuContext } from '../contexts/menu';
import { useJaenPageTree } from '@snek-at/jaen';
import { useLocation } from '@reach/router';
import { convertPageTreeToMenu } from '../functions/navigation';

interface ILandingPageContentProps {
  path?: string;
}

export const LandingPageContent: FC<ILandingPageContentProps> = ({ path }) => {
  const pageTree = useJaenPageTree();
  const location = useLocation();

  const menuStructure = useMemo(
    () => convertPageTreeToMenu(pageTree, location.pathname),
    [pageTree, path]
  );

  return (
    <ChakraProvider theme={theme}>
      <MenuContext.Provider value={{ menuStructure }}>
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
      </MenuContext.Provider>
    </ChakraProvider>
  );
};

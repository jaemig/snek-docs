import { Grid } from '@chakra-ui/react';
import { FC } from 'react';
import { mainContentWrapperProps } from '../../vars/layout';

interface IMainGridProps {
  children?: React.ReactNode;
}

const MainGrid: FC<IMainGridProps> = ({ children }) => {
  return (
    <Grid
      flex={1}
      mt={5}
      maxW={mainContentWrapperProps.default.maxW}
      h="100%"
      mx="auto"
      templateRows="1fr"
      templateColumns={{
        base: '1fr',
        md: '0.8fr 2fr',
        xl: 'minmax(auto, 250px) minmax(auto, 4fr)'
      }}
      gap={10}
      px={{ base: 7, xl: 0 }}
    >
      {children}
    </Grid>
  );
};

export default MainGrid;

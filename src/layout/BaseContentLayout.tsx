import { Container } from '@chakra-ui/react';
import { FC } from 'react';

interface IBaseContentLayoutProps {
  children?: React.ReactNode;
}

/**
 * The base layout for all content pages that require no special layout setup.
 */
const BaseContentLayout: FC<IBaseContentLayoutProps> = ({ children }) => {
  return <Container maxW="7xl">{children}</Container>;
};

export default BaseContentLayout;

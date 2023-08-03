import { FC } from 'react';
import LeftNav from '../../../../shared/containers/navigation/LeftNav';

interface ILeftNavPostReaderProps {}

/**
 * Left navigation for reading a post.
 */
const LeftNavPostReader: FC<ILeftNavPostReaderProps> = ({}) => {
  return <LeftNav w="full"></LeftNav>;
};

export default LeftNavPostReader;

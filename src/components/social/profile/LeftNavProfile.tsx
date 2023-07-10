import {
  Avatar,
  Box,
  Center,
  Heading,
  Image,
  Text,
  VStack
} from '@chakra-ui/react';
import { FC } from 'react';
import LeftNav, { ILeftNavProps } from '../../../layout/navigation/LeftNav';

interface ILeftNavProfileProps extends ILeftNavProps {}

/**
 * Sub-component of the profile page that displays the key information about the user.
 */
const LeftNavProfile: FC<ILeftNavProfileProps> = ({
  hideControls,
  isExpanded,
  setIsExpanded
}) => {
  return (
    <LeftNav
      hideControls={hideControls}
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
    >
      <VStack
        alignItems="start"
        __css={{
          '& img': {
            h: 'auto',
            aspectRatio: '1 / 1'
          }
        }}
      >
        <Avatar
          width="full"
          h="max-content"
          name="Emily Brooks"
          src="https://unsplash.com/photos/O3ymvT7Wf9U/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjg4ODIyMTE1fA&force=true&w=320"
          aspectRatio={1}
        />
        <VStack spacing={1} alignItems="Start">
          <Heading as="h6" fontSize="24px" mt={2}>
            Emily Brooks
          </Heading>
          <Text fontSize="14px" color="gray.500">
            @emilybrooks
          </Text>
        </VStack>
      </VStack>
    </LeftNav>
  );
};

export default LeftNavProfile;

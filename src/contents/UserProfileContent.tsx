import { Box, Container, HStack, Stack, VStack } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { mainContentWrapperProps } from '../vars/layout';
import RightNav from '../layout/navigation/RightNav';
import MainGrid from '../layout/components/MainGrid';
import LeftNavProfile from '../components/social/profile/LeftNavProfile';
/**
 * Component for displaying a certain user profile.
 */
const UserProfileContent: FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <MainGrid>
      <Box>
        <LeftNavProfile isExpanded={isExpanded} />
      </Box>
      <Stack verticalAlign="top" spacing={{ base: 0, xl: 12 }} direction="row">
        <Box maxW="900px" w="full">
          <VStack gap={3}></VStack>
        </Box>
        {
          //TODO: This needs to be improved so it shows a proper toc
        }
        <RightNav />
      </Stack>
    </MainGrid>
  );
};

export default UserProfileContent;

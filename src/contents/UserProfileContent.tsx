import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react';
import { FC, ReactNode, useMemo, useState } from 'react';
import RightNav from '../layout/navigation/RightNav';
import MainGrid from '../layout/components/MainGrid';
import LeftNavProfile from '../components/social/profile/LeftNavProfile';
import PostPreview from '../components/photonq/PostPreview';
import { TPostPreview } from '../types/features/post';
import { CheckIcon, ChevronDownIcon } from '@chakra-ui/icons';
import ActivityList from '../components/social/profile/ActivityList';
import Link from '../components/core/Link';
import PostList from '../components/features/post/PostList';
import ProfileOverview from '../components/social/profile/ProfileOverview';
/**
 * Component for displaying a certain user profile.
 */
const UserProfileContent: FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<'top-posts' | 'posts'>('posts');

  let mainContent: ReactNode;

  if (activeTab === 'top-posts') {
    mainContent = (
      <ProfileOverview />
      // <SimpleGrid spacing={5} columns={2}>
      //   {memoizedPostPreviews}
      // </SimpleGrid>
    );
  } else {
    mainContent = <PostList />;
  }

  return (
    <MainGrid>
      <Box>
        <LeftNavProfile isExpanded={isExpanded} />
      </Box>
      <Stack verticalAlign="top" spacing={{ base: 0, xl: 12 }} direction="row">
        <Box maxW="900px" w="full">
          {mainContent}
        </Box>
        {
          //TODO: This needs to be improved so it shows a proper toc
        }
        <RightNav>
          <Text
            fontWeight="semibold"
            w="max-content"
            color="shared.text.bright"
          >
            On This Page
          </Text>
          <VStack mt={4} spacing={2} alignItems="start">
            <Link variant="hover-theme" href="#">
              Profile
            </Link>
            <Link variant="hover-theme" href="#">
              Posts
            </Link>
            <Divider mt={7} />
            <Link
              variant="hover-theme"
              href="https://snek.at"
              fontSize="xs"
              pt={7}
            >
              Question? Give us feedback
            </Link>
          </VStack>
        </RightNav>
      </Stack>
    </MainGrid>
  );
};

export default UserProfileContent;

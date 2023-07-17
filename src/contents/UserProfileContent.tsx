import {
  Box,
  Button,
  Divider,
  HStack,
  Spacer,
  Stack,
  Text,
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import RightNav from '../layout/navigation/RightNav';
import MainGrid from '../layout/components/MainGrid';
import LeftNavProfile from '../components/social/profile/LeftNavProfile';
import Link from '../components/core/Link';
import PostList from '../components/features/post/PostList';
import ProfileOverview from '../components/social/profile/ProfileOverview';
import { useLocation } from '@reach/router';
import TopNav from '../layout/navigation/TopNav';
import TbUser from '../components/icons/tabler/TbUser';
import TbBooks from '../components/icons/tabler/TbBooks';

/**
 * Component for displaying a certain user profile.
 */
const UserProfileContent: FC = () => {
  const { hash } = useLocation();
  const topNavDisclosure = useDisclosure();
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] =
    useState<(typeof tabNavItems)[number]['value']>('posts');

  const tabNavItems = [
    {
      label: 'Top Posts',
      value: 'overview'
    },
    {
      label: 'Posts',
      value: 'posts'
    }
  ] as const;

  const tabNavElmnts = useMemo(
    () =>
      tabNavItems.map(item => {
        return (
          <Link
            key={item.value}
            href={'#' + item.value}
            variant="hover-theme"
            onClick={() => setActiveTab(item.value)}
            {...(item.value === activeTab && {
              color: 'pages.userProfile.rightNav.tabs.active.color',
              fontWeight: 'semibold'
            })}
          >
            {item.label}
          </Link>
        );
      }),
    [tabNavItems]
  );

  let mainContent: ReactNode;

  if (activeTab === 'overview') {
    mainContent = <ProfileOverview />;
  } else {
    mainContent = <PostList />;
  }

  useEffect(() => {
    setActiveTab(hash === '#posts' ? 'posts' : 'overview');
  }, []);

  return (
    <>
      <TopNav
        drawerDisclosure={topNavDisclosure}
        wrapperProps={{ h: 'max-content', spacing: 5, pb: 1 }}
      >
        <HStack>
          <Button
            variant="ghost"
            size="sm"
            borderRadius="lg"
            leftIcon={<TbUser opacity={0.8} />}
          >
            Overview
          </Button>
          <Button
            variant="ghost"
            size="sm"
            borderRadius="lg"
            leftIcon={<TbBooks opacity={0.8} />}
          >
            Posts
          </Button>
        </HStack>
      </TopNav>
      <MainGrid>
        <Box>
          <LeftNavProfile isExpanded={isExpanded} />
        </Box>
        <Stack
          verticalAlign="top"
          spacing={{ base: 0, xl: 12 }}
          direction="row"
        >
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
              {tabNavElmnts}
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
    </>
  );
};

export default UserProfileContent;

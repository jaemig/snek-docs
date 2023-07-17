import { Box, Divider, Stack, Text, VStack } from '@chakra-ui/react';
import { FC, ReactNode, useMemo, useState } from 'react';
import RightNav from '../layout/navigation/RightNav';
import MainGrid from '../layout/components/MainGrid';
import LeftNavProfile from '../components/social/profile/LeftNavProfile';
import Link from '../components/core/Link';
import PostList from '../components/features/post/PostList';
import ProfileOverview from '../components/social/profile/ProfileOverview';
import { useLocation } from '@reach/router';

/**
 * Component for displaying a certain user profile.
 */
const UserProfileContent: FC = () => {
  const { hash } = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<
    (typeof tabNavItems)[number]['value']
  >(hash === '#posts' ? 'posts' : 'overview');

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
  );
};

export default UserProfileContent;

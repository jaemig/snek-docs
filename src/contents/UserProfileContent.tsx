import { Box, Button, HStack, Stack, useDisclosure } from '@chakra-ui/react';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import MainGrid from '../layout/components/MainGrid';
import LeftNavProfile from '../components/social/profile/LeftNavProfile';
import PostList from '../components/features/post/PostList';
import ProfileOverview from '../components/social/profile/ProfileOverview';
import { useLocation } from '@reach/router';
import TopNav from '../layout/navigation/TopNav';
import TbUser from '../components/icons/tabler/TbUser';
import TbBook from '../components/icons/tabler/TbBook';
import { TPostListData } from '../types/features/post';

/**
 * Component for displaying a certain user profile.
 */
const UserProfileContent: FC = () => {
  const { hash } = useLocation();
  const topNavDisclosure = useDisclosure();
  const [isExpanded, setIsExpanded] = useState(true);
  const [posts, setPosts] = useState<TPostListData>({
    state: 'inactive',
    posts: []
  });
  const [activeTab, setActiveTab] =
    useState<(typeof tabNavItems)[number]['value']>('posts');

  const tabNavItems = [
    {
      label: 'Overview',
      value: 'overview',
      icon: <TbUser />
    },
    {
      label: 'Posts',
      value: 'posts',
      icon: <TbBook />
    }
  ] as const;

  const tabNavButtons = useMemo(
    () =>
      tabNavItems.map(item => {
        const isActive = item.value === activeTab;
        return (
          <Button
            key={item.value}
            variant="ghost-hover-opacity"
            size="sm"
            borderRadius="none"
            borderBottom="2px solid"
            borderColor="transparent"
            leftIcon={item.icon}
            {...(isActive && {
              opacity: 1,
              color: 'topNav.tabs.active.color',
              borderBottom: '2px solid',
              borderBottomColor: 'pages.userProfile.topNav.tabs.borderColor'
            })}
            onClick={
              !isActive
                ? () => {
                    //TODO: Add a way to change the URL hash without reloading the page
                    setActiveTab(item.value);
                  }
                : undefined
            }
          >
            {item.label}
          </Button>
        );
      }),
    [tabNavItems, activeTab]
  );

  let mainContent: ReactNode;

  if (activeTab === 'overview') {
    mainContent = <ProfileOverview />;
  } else {
    mainContent = (
      <PostList
        setPosts={setPosts}
        postData={posts}
        previewType="list"
        hidePostAuthor
        showControls
      />
    );
  }

  useEffect(() => {
    setActiveTab(hash === '#posts' ? 'posts' : 'overview');
  }, []);

  return (
    <>
      <TopNav
        drawerDisclosure={topNavDisclosure}
        wrapperProps={{ h: 'max-content', spacing: 5, pb: 0, pt: 3 }}
      >
        <HStack>{tabNavButtons}</HStack>
      </TopNav>
      <MainGrid mt={10}>
        <Box>
          <LeftNavProfile isExpanded={isExpanded} />
        </Box>
        <Stack
          verticalAlign="top"
          spacing={{ base: 0, xl: 12 }}
          direction="row"
        >
          <Box w="full">{mainContent}</Box>
        </Stack>
      </MainGrid>
    </>
  );
};

export default UserProfileContent;

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
      value: 'overview',
      icon: <TbUser />
    },
    {
      label: 'Posts',
      value: 'posts',
      icon: <TbBooks />
    }
  ] as const;

  const tabNavButtons = useMemo(
    () =>
      tabNavItems.map(item => {
        const isActive = item.value === activeTab;
        return (
          <Button
            variant="ghost-hover-opacity"
            size="sm"
            borderRadius="lg"
            leftIcon={item.icon}
            {...(isActive && {
              opacity: 1,
              color: 'topNav.tabs.active.color'
            })}
            onClick={!isActive ? () => setActiveTab(item.value) : undefined}
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
    mainContent = <PostList />;
  }

  useEffect(() => {
    setActiveTab(hash === '#posts' ? 'posts' : 'overview');
  }, []);

  return (
    <>
      <TopNav
        drawerDisclosure={topNavDisclosure}
        wrapperProps={{ h: 'max-content', spacing: 5, pb: 1, pt: 3 }}
      >
        <HStack>{tabNavButtons}</HStack>
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
          <Box w="full">{mainContent}</Box>
          {
            //TODO: This needs to be improved so it shows a proper toc
          }
          {/* <RightNav>
            <Text
              fontWeight="semibold"
              w="max-content"
              color="shared.text.bright"
            >
              On This Page
            </Text>
            <VStack mt={4} spacing={2} alignItems="start">
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
          </RightNav> */}
        </Stack>
      </MainGrid>
    </>
  );
};

export default UserProfileContent;

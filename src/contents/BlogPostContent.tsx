import {
  Box,
  Flex,
  Stack,
  VStack,
  Text as ChText,
  Button,
  useDisclosure
} from '@chakra-ui/react';
import { FC, memo } from 'react';

import { useNavOffset } from '../shared/hooks/use-nav-offset';

// Default custom components (replaces HTML tags)

// Insertable custom components (via Jaen)
import MemoizedLinks from '../shared/components/MemoizedLink';
import TableOfContent from '../shared/containers/navigation/components/TableOfContent';
import RightNav from '../shared/containers/navigation/RightNav';
import LeftNav from '../shared/containers/navigation/LeftNav';
import MainGrid from '../shared/containers/components/MainGrid';
import { TUser } from '../features/user/types/user';
import MainBreadcrumb from '../shared/containers/navigation/components/MainBreadcrumb';
import { MainBreadcrumbPart } from '../shared/types/navigation';

// Example links - these would probably be fetched from a CMS or other data source
const links = [
  {
    name: 'Question? Give us feedback',
    href: 'https://snek.at/'
  },
  {
    name: 'Edit this page on Jaen',
    href: '/admin/#/pages'
  }
];

// Placeholder data
const user: TUser = {
  username: 'emilybrooks',
  displayName: 'Emily Brooks',
  bio: '',
  socials: []
};

export interface IBlogPostContentProps {}

const BlogPostContent: FC<IBlogPostContentProps> = () => {
  const navTopOffset = useNavOffset();

  const publishDisclosure = useDisclosure();

  // This can be memoized since it doesn't change and switching pages re-renders most of the app anyway.
  const MemoizedToc = memo(TableOfContent, () => false);

  const breadcrumbParts: MainBreadcrumbPart[] = [
    {
      name: '@emilybrooks',
      href: '/profile',
      isUser: true,
      showUserImage: true
    },
    {
      name: 'Posts',
      href: '/profile#posts'
    },
    {
      name: 'Unlocking the Power of Quantum Computing',
      href: '#'
    }
  ];

  return (
    <MainGrid>
      <LeftNav w="full">
        <VStack w="50%" minW="100px" alignSelf="center">
          <Button
            size="sm"
            variant="filledGreen"
            onClick={publishDisclosure.onOpen}
            w="full"
          >
            Publish
          </Button>
          <Button size="sm" colorScheme="gray" w="full">
            Save Draft
          </Button>
        </VStack>
      </LeftNav>
      <Stack spacing={{ base: 0, xl: 12 }} direction="row">
        <Box maxW="900px" w="full">
          <MainBreadcrumb parts={breadcrumbParts} />
          {/* <Box>
            <UserAvatar user={user} showTooltip />
          </Box> */}
        </Box>
        <Box position="sticky" top={`calc(0px + ${navTopOffset})`}>
          <RightNav>
            <ChText color="rightNav.titleTop.color" fontWeight="semibold">
              On This Page
            </ChText>
            <Flex as="nav" direction="column" mt={5}>
              <MemoizedToc />
            </Flex>
            <Box
              mt={7}
              pt={7}
              borderTop="1px solid"
              borderTopColor="components.separator.borderColor"
              fontSize="xs"
            >
              <VStack rowGap={1} textAlign="left">
                <MemoizedLinks
                  links={links}
                  props={{
                    variant: 'right-bottom-nav',
                    w: '100%',
                    display: 'block'
                  }}
                />
              </VStack>
            </Box>
          </RightNav>
        </Box>
      </Stack>
    </MainGrid>
  );
};

export default BlogPostContent;

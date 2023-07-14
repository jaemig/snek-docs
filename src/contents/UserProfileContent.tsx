import {
  Box,
  Button,
  Divider,
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
import { FC, useMemo, useState } from 'react';
import RightNav from '../layout/navigation/RightNav';
import MainGrid from '../layout/components/MainGrid';
import LeftNavProfile from '../components/social/profile/LeftNavProfile';
import PostPreview from '../components/photonq/PostPreview';
import { TPostPreview } from '../types/features/post';
import { CheckIcon, ChevronDownIcon } from '@chakra-ui/icons';
import ActivityList from '../components/social/profile/ActivityList';
import Link from '../components/core/Link';
/**
 * Component for displaying a certain user profile.
 */
const UserProfileContent: FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  //TODO: implement toggleLike with API call
  const toggleLike = (id: TPostPreview['id']) => {
    console.log('toggle like for post ', id);
  };

  const postPreviews: TPostPreview[] = [
    {
      id: '1',
      publicationDate: '2023-16-15',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
      id: '2',
      publicationDate: '2023-16-15',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/',
      canManage: true
    },
    {
      id: '3',
      publicationDate: '2023-16-15',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/',
      canManage: true
    },
    {
      id: '4',
      publicationDate: '2023-16-15',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      hasLiked: true,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/',
      canManage: false
    },
    {
      id: '5',
      publicationDate: '2023-16-15',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 500,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/',
      canManage: true
    }
  ];

  const memoizedPostPreviews = useMemo(() => {
    return postPreviews.map(postPreview => (
      <PostPreview
        key={postPreview.id}
        toggleLike={toggleLike}
        {...postPreview}
        wrapperProps={{ minW: '33%' }}
      />
    ));
  }, [postPreviews]);

  return (
    <MainGrid>
      <Box>
        <LeftNavProfile isExpanded={isExpanded} />
      </Box>
      <Stack verticalAlign="top" spacing={{ base: 0, xl: 12 }} direction="row">
        <Box maxW="900px" w="full">
          <VStack gap={12}>
            <VStack w="full" gap={5}>
              <HStack spacing={3} w="full">
                <Input
                  placeholder="Find a post..."
                  size="sm"
                  borderRadius="lg"
                />
                <Menu>
                  <MenuButton
                    as={Button}
                    size="sm"
                    borderRadius="lg"
                    variant="outline"
                    fontWeight="semibold"
                    rightIcon={<ChevronDownIcon />}
                  >
                    Sort
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Recent</MenuItem>
                    <MenuItem>Date</MenuItem>
                    <MenuItem position="relative">
                      Most Liked{' '}
                      <CheckIcon position="absolute" right={3} boxSize="10px" />
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
              <SimpleGrid spacing={5} columns={2}>
                {memoizedPostPreviews}
              </SimpleGrid>
            </VStack>
            <Divider />
            <ActivityList />
          </VStack>
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
            On This Profile
          </Text>
          <VStack mt={4} spacing={3} alignItems="start">
            <Link variant="hover-theme" href="#">
              Profile
            </Link>
            <Link variant="hover-theme" href="#">
              Posts
            </Link>
            <Divider mt={7} mb={2} />
            <Link variant="hover-theme" href="https://snek.at" fontSize="xs">
              Question? Give us feedback
            </Link>
          </VStack>
        </RightNav>
      </Stack>
    </MainGrid>
  );
};

export default UserProfileContent;

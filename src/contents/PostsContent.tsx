import { Box, Heading, VStack, keyframes } from '@chakra-ui/react';
import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import MainGrid from '../layout/components/MainGrid';
import LeftNav from '../layout/navigation/LeftNav';
import { createBreadCrumbParts } from '../functions/navigation';
import PageDirectory from '../layout/navigation/components/PageDirectory';
import { MainBreadcrumbPart } from '../types/navigation';
import { useMenuContext } from '../contexts/menu';
import PostList from '../components/features/post/PostList';
import { TPostListData, TPostPreview } from '../types/features/post';
import PostListControls from '../components/features/post/PostListControls';
import PostCardPreviewSkeleton from '../components/features/post/preview/PostCardPreviewSkeleton';
import PostListItemPreviewSkeleton from '../components/features/post/preview/PostListItemPreviewSkeleton';

const gradientAnimation = keyframes`
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
`;

/**
 * Content for the posts page.
 * This is the main page for discovering and searching posts.
 */
const PostsContent: FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { menuStructure } = useMenuContext();
  const [featuredPosts, setFeaturedPosts] = useState<TPostListData>({
    state: 'loading',
    posts: []
  });
  const [latestPosts, setLatestPosts] = useState<TPostListData>({
    state: 'loading',
    posts: []
  });

  //TODO: This would come from an API
  const posts: TPostPreview[] = [
    {
      id: '1',
      publicationDate: '2023-16-15',
      author: 'Emily Brooks',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
      id: '2',
      publicationDate: '2023-16-15',
      author: 'Emily Brooks',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
      id: '3',
      publicationDate: '2023-16-15',
      author: 'Emily Brooks',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
      id: '4',
      publicationDate: '2023-16-15',
      author: 'Emily Brooks',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      hasLiked: true,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
      id: '5',
      publicationDate: '2023-16-15',
      author: 'Emily Brooks',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 500,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    //....
    {
      id: '1',
      publicationDate: '2023-16-15',
      author: 'Emily Brooks',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/',
      canManage: true
    },
    {
      id: '2',
      publicationDate: '2023-16-15',
      author: 'Emily Brooks',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
      id: '3',
      publicationDate: '2023-16-15',
      author: 'Emily Brooks',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
      id: '4',
      publicationDate: '2023-16-15',
      author: 'Emily Brooks',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      hasLiked: true,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
      id: '5',
      publicationDate: '2023-16-15',
      author: 'Emily Brooks',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 500,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
      id: '1',
      publicationDate: '2023-16-15',
      author: 'Emily Brooks',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
      id: '2',
      publicationDate: '2023-16-15',
      author: 'Emily Brooks',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
      id: '3',
      publicationDate: '2023-16-15',
      author: 'Emily Brooks',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
      id: '4',
      publicationDate: '2023-16-15',
      author: 'Emily Brooks',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      hasLiked: true,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    },
    {
      id: '5',
      publicationDate: '2023-16-15',
      author: 'Emily Brooks',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 500,
      url: 'https://snek-docs-git-photonq-jem-at.vercel.app/docs/how-to-photonq/'
    }
  ];

  const searchPosts = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    console.log(query);
  };

  useEffect(() => {
    // Simulate loading posts from an API
    setTimeout(() => {
      setFeaturedPosts({ posts: posts.slice(0, 4), state: 'success' });
      setLatestPosts({ posts: posts.slice(4), state: 'success' });
    }, 3000);
  }, []);

  return (
    <MainGrid>
      <Box display={{ base: 'none', md: 'block' }} position="sticky">
        <LeftNav isExpanded={isExpanded} setIsExpanded={setIsExpanded}>
          <Box w={isExpanded ? 'auto' : 0}>
            <PageDirectory data={menuStructure} isExpanded={isExpanded} />
          </Box>
        </LeftNav>
      </Box>
      <VStack>
        <PostListControls
          search={searchPosts}
          w={{ base: 'full', md: '75%' }}
        />
        {/* px={4} pb={4} */}
        <Box
          borderRadius="xl"
          mt={10}
          p={1}
          background="pages.posts.featured.bg"
          background-size="600% 600%"
          animation={`5s ease 0s infinite normal none running ${gradientAnimation}`}
          w="full"
        >
          <Box bgColor="shared.body.bgColor" borderRadius="xl">
            <Box
              position="absolute"
              transform="translateY(-50%)"
              bgColor="shared.body.bgColor"
              w="fit-content"
              px={3}
              ml={5}
              borderRadius="full"
            >
              <Heading
                as="h1"
                size="lg"
                color="pages.posts.featured.title.color"
              >
                Featured Posts
              </Heading>
            </Box>
            <PostList
              postData={featuredPosts}
              py={10}
              px={3}
              previewType="card"
              itemsPerPage={4}
              w="full"
              skeletonProps={{
                minW: '100%'
              }}
            />
          </Box>
        </Box>
        <Box py={10} px={3} w="full">
          <Heading as="h2" size="md">
            Latest Posts
          </Heading>
          <PostList
            postData={latestPosts}
            pt={5}
            previewType="list"
            itemsPerPage={10}
            skeletonProps={{
              w: 'full'
            }}
          />
        </Box>
      </VStack>
    </MainGrid>
  );
};

export default PostsContent;
1;

import { connectPage } from '@snek-at/jaen';
import { graphql } from 'gatsby';
import PostsContent from '../contents/PostsContent';

//* This is a temporary page for the user profile. It will be replaced by the actual dynamic user profile page.
const PostsPage = connectPage(
  () => {
    return <PostsContent />;
  },
  {
    label: 'Imprint',
    children: ['ImprintPage']
  }
);

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
    allJaenPage {
      nodes {
        ...JaenPageData
        children {
          ...JaenPageData
        }
      }
    }
  }
`;

export default PostsPage;

export { Head } from '@snek-at/jaen';

import { connectPage } from '@snek-at/jaen';
import { graphql } from 'gatsby';
import BlogPostContent from '../contents/BlogPostContent';

const BlogPostPage = connectPage(
  () => {
    return <BlogPostContent />;
  },
  {
    label: 'Posts',
    children: ['BlogPostPage']
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

export default BlogPostPage;

export { Head } from '@snek-at/jaen';

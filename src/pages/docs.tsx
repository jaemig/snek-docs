import { connectPage } from '@snek-at/jaen';
import { graphql } from 'gatsby';
import { DocContent } from '../contents/DocContent';

const DocsPage = connectPage(
  () => {
    return <DocContent />;
  },
  {
    label: 'Docs',
    children: ['DocPage']
  }
);

export const query = graphql`
  query ($jaenPageId: String!) {
    jaenPage(id: { eq: $jaenPageId }) {
      ...JaenPageData
      children {
        ...JaenPageData
      }
    }
  }
`;

export default DocsPage;

export { Head } from '@snek-at/jaen';

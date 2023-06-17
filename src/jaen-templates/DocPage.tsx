import { connectTemplate } from '@snek-at/jaen';
import { graphql } from 'gatsby';
import { DocContent } from '../contents/DocContent';

const DocsPage = connectTemplate(
  () => {
    return <DocContent />;
  },
  {
    label: 'Docs',
    children: ['DocPage']
  }
);

export default DocsPage;

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

export { Head } from '@snek-at/jaen';

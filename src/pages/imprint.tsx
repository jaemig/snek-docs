import { connectPage } from '@snek-at/jaen';
import { graphql } from 'gatsby';
import ImprintContent from '../contents/ImprintContent';

const ImprintPage = connectPage(
  () => {
    return <ImprintContent />;
  },
  {
    label: 'Imprint',
    children: []
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

export default ImprintPage;

export { Head } from '@snek-at/jaen';

import { connectPage } from '@snek-at/jaen';
import { graphql } from 'gatsby';
import { LandingPageContent } from '../photonq/LandingPageContent';

const PhotonQPage = connectPage(
  () => {
    return <LandingPageContent />;
  },
  {
    label: 'PhotonQ',
    children: ['PhotonQPage']
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

export default PhotonQPage;

export { Head } from '@snek-at/jaen';

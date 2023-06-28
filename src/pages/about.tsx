import { connectPage } from '@snek-at/jaen';
import { graphql } from 'gatsby';
import AboutContent from '../contents/AboutContent';

const AboutPage = connectPage(
  () => {
    return <AboutContent />;
  },
  {
    label: 'About',
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

export default AboutPage;

export { Head } from '@snek-at/jaen';

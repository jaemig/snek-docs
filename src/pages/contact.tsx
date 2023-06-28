import { connectPage } from '@snek-at/jaen';
import { graphql } from 'gatsby';
import ContactContent from '../contents/ContactContent';

const ContactPage = connectPage(
  () => {
    return <ContactContent />;
  },
  {
    label: 'Contact',
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

export default ContactPage;

export { Head } from '@snek-at/jaen';

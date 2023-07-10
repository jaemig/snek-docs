import { connectPage } from '@snek-at/jaen';
import { graphql } from 'gatsby';
import UserProfileContent from '../contents/UserProfileContent';

//* This is a temporary page for the user profile. It will be replaced by the actual dynamic user profile page.
const UserProfilePage = connectPage(
  () => {
    return <UserProfileContent />;
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

export default UserProfilePage;

export { Head } from '@snek-at/jaen';

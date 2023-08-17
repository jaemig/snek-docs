import type { GatsbyBrowser } from 'gatsby';
import AppLayout from './src/shared/containers/AppLayout';

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props
}) => {
  const path = props.location.pathname;
  const hiddenTopNavPaths = ['/profile', '/blog-post'];

  if (path.startsWith('/admin') || path === '/photonq/') {
    return element;
  }

  return (
    <AppLayout
      isDocs={path.startsWith('/docs')}
      path={path}
      topNavProps={{
        isVisible: !hiddenTopNavPaths.some(hiddenPath =>
          path.startsWith(hiddenPath)
        )
      }}
    >
      {element}
    </AppLayout>
  );
};

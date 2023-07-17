import type { GatsbySSR } from 'gatsby';

import AppLayout from './src/layout/AppLayout';

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({
  element,
  props
}) => {
  const path = props.location.pathname;

  if (path.startsWith('/admin') || path === '/photonq/') {
    return element;
  }

  return (
    <AppLayout
      isDocs={path.startsWith('/docs')}
      path={path}
      topNavProps={{ isVisible: path.startsWith('/profile') }}
    >
      {element}
    </AppLayout>
  );
};

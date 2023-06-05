import type { GatsbySSR } from 'gatsby';

import AppLayout from './src/layout/AppLayout';

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({
  element,
  props
}) => {
  if (props.path.startsWith('/admin')) {
    return element;
  }

  return (
    <AppLayout isDocs={props.path.startsWith('/docs')} path={props.path}>
      {element}
    </AppLayout>
  );
};

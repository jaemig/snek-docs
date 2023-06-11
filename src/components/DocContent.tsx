import { Box, Stack } from '@chakra-ui/react';
import { Field } from '@snek-at/jaen';
import React from 'react';

import Link from './core/Link';
import CodeSnippet from './main-content/code-snippet/CodeSnippet';
import Filesystem from './main-content/filesystem/Filesystem';
import Heading from './main-content/heading/Heading';
import List from './main-content/list/List';
import ListItem from './main-content/list/ListItem';
import Text from './main-content/text/Text';
import { useNavOffset } from '../hooks/use-nav-offset';
import RightNav from '../layout/navigation/RightNav';
import MainBottomNav from '../layout/navigation/MainBottomNav';
import ImageCard from './main-content/image-card/ImageCard';
import Callout from './main-content/callout/Callouts';
import IconCard from './main-content/icon-card/IconCard';

export interface DocContentProps {}

export const DocContent: React.FC<DocContentProps> = () => {
  const navTopOffset = useNavOffset();

  return (
    <Stack spacing={12} direction="row">
      <Box maxW="700px" w="full">
        <Field.Mdx
          name="documentation"
          components={{
            // TEXT
            p: props => <Text {...props} />,
            h1: props => <Heading variant="h1" {...props} />,
            h2: props => <Heading variant="h2" {...props} />,
            h3: props => <Heading variant="h3" {...props} />,
            h4: props => <Heading variant="h4" {...props} />,
            h5: props => <Heading variant="h5" {...props} />,
            h6: props => <Heading variant="h6" {...props} />,
            // LIST
            ul: (props: any) => <List {...props}></List>,
            ol: (props: any) => <List variant="ordered" {...props}></List>,
            li: (props: any) => <ListItem {...props}></ListItem>,
            a: (props: any) => <Link href={props.href} {...props} />,
            // MISC
            code: (props: any) => {
              const lang = props.className?.replace('language-', '');
              const code = props.children;
              return <CodeSnippet language={lang} code={code} {...props} />;
            },
            // CUSTOM COMPONENTS
            CodeSnippet,
            Filesystem,
            ImageCard,
            Callout,
            IconCard
          }}
        />
        <MainBottomNav />
      </Box>

      <Box position="sticky" top={`calc(0px + ${navTopOffset})`}>
        <RightNav />
      </Box>
    </Stack>
  );
};

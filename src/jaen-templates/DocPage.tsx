import React, { useMemo } from 'react';
import { HeadFC, graphql } from 'gatsby';
import { Box, ChakraProvider, Flex, Grid, chakra } from '@chakra-ui/react';
import TopNav from '../layout/navigation/TopNav';
import LeftNav from '../layout/navigation/LeftNav';
import RightNav from '../layout/navigation/RightNav';
import AppLayout from '../layout/AppLayout';
import { connectTemplate, Field, useJaenPageTree } from '@snek-at/jaen';
import Heading from '../components/main-content/heading/Heading';
import CodeSnippet from '../components/main-content/code-snippet/CodeSnippet';
import Text from '../components/main-content/text/Text';
import Filesystem from '../components/main-content/filesystem/Filesystem';
import Link from '../components/Link';
import List from '../components/main-content/list/List';
import ListItem from '../components/main-content/list/ListItem';
import { convertPageTreeToMenu, createBreadCrumbParts } from '../helpers/utils';
import { MainBreadcrumbPart } from '../types/navigation';
import MainBreadcrumb from '../layout/navigation/components/MainBreadcrumb';

const DocsPage = connectTemplate(
  () => {
    const pageTree = useJaenPageTree();

    const menuStructure = useMemo(
      () => convertPageTreeToMenu(pageTree),
      [pageTree]
    );

    const breadcrumbParts: MainBreadcrumbPart[] = useMemo(() => {
      return [
        {
          name: 'Documentation',
          isDisabled: true,
          href: '/docs'
        },
        ...createBreadCrumbParts(menuStructure.menu)
      ];
    }, [pageTree]);

    return (
      <AppLayout>
        <Grid
          flex={1}
          mt={5}
          maxW="7xl"
          h="100%"
          mx="auto"
          templateRows="1fr"
          templateColumns={{
            base: '1fr',
            md: '0.8fr 2fr',
            xl: 'minmax(auto, 250px) minmax(auto, 4fr) minmax(auto, 250px)'
          }}
          gap={10}
          px={{ base: 7, xl: 0 }}>
          <Box
            display={{ base: 'none', md: 'block' }}
            position="sticky"
            top="110px">
            <LeftNav menuData={menuStructure} />
          </Box>
          <Box maxW="700px">
            <MainBreadcrumb parts={breadcrumbParts} />
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
                Filesystem
              }}
            />
          </Box>
          <Box position="sticky" top="80px">
            <RightNav />
          </Box>
        </Grid>
      </AppLayout>
    );
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

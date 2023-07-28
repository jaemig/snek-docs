import {
  Box,
  Flex,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Text as ChText,
  Button,
  HStack,
  useDisclosure
} from '@chakra-ui/react';
import { Field } from '@snek-at/jaen';
import React, { memo } from 'react';

import { useNavOffset } from '../shared/hooks/use-nav-offset';

// Default custom components (replaces HTML tags)
import Text from '../features/main-content/text/components/Text';
import Heading from '../features/main-content/heading/components/Heading';
import List from '../features/main-content/list/components/List';
import CodeSnippet from '../features/main-content/code-snippet/components/CodeSnippet';
import Link from '../shared/components/Link';

// Insertable custom components (via Jaen)
import Filesystem from '../features/main-content/filesystem/components/Filesystem';
import ImageCard from '../features/main-content/image-card/components/ImageCard';
import Callout from '../features/main-content/callout/components/Callouts';
import IconCard from '../features/main-content/icon-card/components/IconCard';
import MemoizedLinks from '../shared/components/MemoizedLink';
import ListItem from '../features/main-content/list/components/ListItem';
import TableOfContent from '../shared/containers/navigation/components/TableOfContent';
import MainBottomNav from '../shared/containers/navigation/MainBottomNav';
import RightNav from '../shared/containers/navigation/RightNav';
import CodePlayground from '../features/main-content/code-playground/components/CodePlayground';

// Example links - these would probably be fetched from a CMS or other data source
const links = [
  {
    name: 'Question? Give us feedback',
    href: 'https://snek.at/'
  },
  {
    name: 'Edit this page on Jaen',
    href: '/admin/#/pages'
  }
];

export interface DocContentProps {}

export const DocContent: React.FC<DocContentProps> = () => {
  const navTopOffset = useNavOffset();

  const publishDisclosure = useDisclosure();

  // This can be memoized since it doesn't change and switching pages re-renders most of the app anyway.
  const MemoizedToc = memo(TableOfContent, () => false);

  return (
    <>
      <Stack spacing={{ base: 0, xl: 12 }} direction="row">
        <Box maxW="900px" w="full">
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
              // TABLE
              table: (props: any) => (
                <Table variant="striped" w="fit-content" {...props} />
              ),
              thead: (props: any) => <Thead {...props} />,
              tbody: (props: any) => <Tbody {...props} />,
              tr: (props: any) => <Tr {...props} />,
              th: (props: any) => <Th {...props} />,
              td: (props: any) => <Td {...props} />,
              // MISC
              //@ts-expect-error
              code: ({
                className,
                playground,
                ...props
              }: {
                playground?: boolean;
                className?: string;
                children: string;
              }) => {
                const lang = className?.replace('language-', '') || 'text';

                if (playground) {
                  return (
                    <CodePlayground
                      codeEditorProps={{
                        language: lang,
                        ...props
                      }}
                      executeCode={async code => {
                        await new Promise(resolve => setTimeout(resolve, 3000));

                        // Fetch some random data from the internet
                        const res = await fetch(
                          'https://jsonplaceholder.typicode.com/todos/1'
                        );
                        const data = await res.json();

                        return (
                          <Box>
                            <h1>How cool is that?</h1>
                            <pre>{JSON.stringify(data, null, 2)}</pre>
                          </Box>
                        );
                      }}
                      {...props}
                    />
                  );
                }

                return <CodeSnippet language={lang} {...props} />;
              },
              // CUSTOM COMPONENTS
              Filesystem,
              ImageCard,
              Callout,
              IconCard
            }}
          />
          <MainBottomNav />
        </Box>

        <Box position="sticky" top={`calc(0px + ${navTopOffset})`}>
          <RightNav>
            <ChText color="rightNav.titleTop.color" fontWeight="semibold">
              On This Page
            </ChText>
            <Flex as="nav" direction="column" mt={5}>
              <MemoizedToc />
            </Flex>
            <Box
              mt={7}
              pt={7}
              borderTop="1px solid"
              borderTopColor="components.separator.borderColor"
              fontSize="xs"
            >
              <VStack rowGap={1} textAlign="left">
                <MemoizedLinks
                  links={links}
                  props={{
                    variant: 'right-bottom-nav',
                    w: '100%',
                    display: 'block'
                  }}
                />
              </VStack>
            </Box>
          </RightNav>
        </Box>
      </Stack>
    </>
  );
};

import {
  Box,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { Field, useIndexField } from '@snek-at/jaen';
import React from 'react';

import { useNavOffset } from '../hooks/use-nav-offset';
import RightNav from '../layout/navigation/RightNav';
import MainBottomNav from '../layout/navigation/MainBottomNav';

// Default custom components (replaces HTML tags)
import Text from '../components/main-content/text/Text';
import Heading from '../components/main-content/heading/Heading';
import List from '../components/main-content/list/List';
import ListItem from '../components/main-content/list/ListItem';
import CodeSnippet from '../components/main-content/code-snippet/CodeSnippet';
import Link from '../components/core/Link';

// Insertable custom components (via Jaen)
import Filesystem from '../components/main-content/filesystem/Filesystem';
import ImageCard from '../components/main-content/image-card/ImageCard';
import Callout from '../components/main-content/callout/Callouts';
import IconCard from '../components/main-content/icon-card/IconCard';
import CodePlayground from '../components/main-content/code-playground/CodePlayground';

const DocsIndex: React.FC = () => {
  const index = useIndexField({
    jaenPageId: 'JaenPage /docs/'
  });

  return (
    <SimpleGrid columns={[1, null, 2]} spacing="4" gap="4">
      {index.children.map((child, index) => {
        return (
          <ImageCard
            key={index}
            id={child.id}
            link={{
              name: `${child.jaenPageMetadata?.title || 'Read Page'}`,
              href: `/docs/${child.slug || 'none'}`
            }}
            image={{
              src: child.jaenPageMetadata?.image || '',
              alt: child.jaenPageMetadata?.description || ''
            }}
            baseProps={{ mt: 0 }}
          />
        );
      })}
    </SimpleGrid>
  );
};

export interface DocContentProps {}

export const DocContent: React.FC<DocContentProps> = () => {
  const navTopOffset = useNavOffset();

  return (
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
                      // Function to shuffle an array in place
                      function shuffleArray(array: any[]) {
                        for (let i = array.length - 1; i > 0; i--) {
                          const j = Math.floor(Math.random() * (i + 1));
                          [array[i], array[j]] = [array[j], array[i]];
                        }
                      }

                      // Fetch the emojis and shuffle the keys
                      const emojisObject = await fetch(
                        'https://api.github.com/emojis'
                      ).then(res => res.json());
                      const emojiKeys = Object.keys(emojisObject);
                      shuffleArray(emojiKeys);

                      // Get random values between 3 and 10 for the amount of emojis
                      const amountOfEmojis = Math.floor(
                        Math.random() * (10 - 3 + 1) + 3
                      );

                      // Get a random subset of emoji keys
                      const emojis = emojiKeys.slice(0, amountOfEmojis);

                      return (
                        <Stack>
                          <Text>Current Qubit state:</Text>

                          <Wrap>
                            {emojis.map(emoji => (
                              <WrapItem key={emoji}>
                                <Image src={emojisObject[emoji]} />
                              </WrapItem>
                            ))}
                          </Wrap>
                        </Stack>
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
            IconCard,
            DocsIndex
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

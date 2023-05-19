import { Box, Heading, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import CodeSnippet from "../../components/main-content/code-snippet/CodeSnippet";
import Filesystem from "../../components/main-content/filesystem/Filesystem";
import { TFilesystemItem } from "../../components/main-content/filesystem/filesystem.types";

const exampleCode = `
import React from 'react';

interface GroceryItemProps {
  item: {
    name: string;
    price: number;
    quantity: number;
  }
}

const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
  return (
    <div>
      <h2>{item.name}</h2>
      <p>Price: {item.price}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
}

export default GroceryItem;
`

const exampleFsStructure: TFilesystemItem[] = [
  {
    name: 'pages',
    type: 'folder',
    children: [
      {
        name: 'fruits',
        type: 'folder',
        defaultOpen: false,
        children: [
          {
            name: '_meta.json',
            type: 'file',
          },
          {
            name: 'apple.mdx',
            type: 'file',
          },
          {
            name: 'banana.mdx',
            type: 'file',
          },
        ],
      },
      {
        name: 'about.mdx',
        type: 'file',
        isSelected: true,
      },
      {
        name: 'contact.mdx',
        type: 'file',
      },
      {
        name: 'index.mdx',
        type: 'file',
      },
    ],
  },
];

/**
 * Main content component.
 * This is where the core content of the page goes.
 */
const MainContent: FC = () => {
    return (
        <Box
            mt={5}
        >
            <Heading size='lg'>The Secret Life of Rubber Ducks</Heading>
            <Text mb={5}>
            Rubber ducks are not just a fun bath-time companion, they have also been used by researchers to study ocean currents, providing valuable insights into global weather patterns and marine ecology.
            </Text>
            <CodeSnippet code={exampleCode} headerText="app.tsx" />
            <Filesystem structure={exampleFsStructure} />
        </Box>
    )
}

export default MainContent;
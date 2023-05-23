import { Box, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import CodeSnippet from "../../components/main-content/code-snippet/CodeSnippet";
import Filesystem from "../../components/main-content/filesystem/Filesystem";
import { TFilesystemItem } from "../../components/main-content/filesystem/filesystem.types";
import Heading from "../../components/main-content/Heading";

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
            tooltip: 'This contains some yummy apples 🍎',
          },
          {
            name: 'banana.mdx',
            type: 'file',
            tooltip: {
              text: 'This contains some weird bananas 🍌',
              placement: 'left',
              bgColor: 'yellow.500',
              hasArrow: true,
            }
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
      {
        name: '.internal',
        type: 'file',
        lowContrast: true,
      }
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
            <Heading variant='h1' noSpacing>The Secret Life of Rubber Ducks</Heading>
            <Text mb={5}>
            Rubber ducks are not just a fun bath-time companion, they have also been used by researchers to study ocean currents, providing valuable insights into global weather patterns and marine ecology.
            </Text>
            <CodeSnippet code={exampleCode} headerText="app.tsx" />
            <Heading variant='h2' id='filesystem'>Filesystem</Heading>
            <Heading variant='h3' id='filesystem'>Example</Heading>
            <Filesystem structure={exampleFsStructure} />
        </Box>
    )
}

export default MainContent;
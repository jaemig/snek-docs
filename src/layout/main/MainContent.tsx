import { Box, Text } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import CodeSnippet from "../../components/main-content/code-snippet/CodeSnippet";
import Filesystem from "../../components/main-content/filesystem/Filesystem";
import { TFilesystemItem } from "../../components/main-content/filesystem/filesystem.types";
import Heading from "../../components/main-content/Heading";
import { MainContentItem, MainContentType } from "./mainContent.types";

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

//* This is only an early example and doesnt represent the final structure
//* in the future, the content coming from the CMS will be in a different format that will be converted to this format
const exampleContent: MainContentItem[] =[
  {
    type: MainContentType.Heading,
    children: 'The Secret Life of Rubber Ducks',
    variant: 'h1',
  },
  {
    type: MainContentType.CodeSnippet,
    code: exampleCode,
    headerText: 'app.tsx',
  },
  {
    type: MainContentType.Heading,
    children: 'Filesystem',
    variant: 'h2',
    id: 'filesystem',
  },
  {
    type: MainContentType.Heading,
    children: 'Example',
    variant: 'h3',
    id: 'example',
    activeLink: true,
  },
  {
    type: MainContentType.Filesystem,
    structure: exampleFsStructure,
  }
]

/**
 * Main content component.
 * This is where the core content of the page goes.
 */
const MainContent: FC = () => {

  const [activeHeading, setActiveHeading] = useState<number | null>(1);

  const handleHeadingClick = (heading: number) => {
    setActiveHeading(heading);
  }

  return (
      <Box
          mt={5}
      >
        {
          exampleContent.map((item, index) => {
            switch (item.type) {
              case MainContentType.Heading:
                return <Heading
                  key={index}
                  variant={item.variant}
                  id={item.id}
                  activeLink={index === activeHeading}
                  setActiveLink={() => handleHeadingClick(index)}
                  noSpacing={index === 0}                  
                >
                  {item.children}
                </Heading>
              case MainContentType.CodeSnippet:
                return <CodeSnippet
                  key={index}
                  code={item.code}
                  headerText={item.headerText}
                />
              case MainContentType.Filesystem:
                return <Filesystem
                  key={index}
                  structure={item.structure}
                />
              default:
                return null;
            }
          })
        }
          {/* <Heading variant='h1' noSpacing>The Secret Life of Rubber Ducks</Heading>
          <Text mb={5}>
          Rubber ducks are not just a fun bath-time companion, they have also been used by researchers to study ocean currents, providing valuable insights into global weather patterns and marine ecology.
          </Text>
          <CodeSnippet code={exampleCode} headerText="app.tsx" />
          <Heading variant='h2' id='filesystem'>Filesystem</Heading>
          <Heading variant='h3' id='filesystem' activeLink={true} setActiveLink={() => handleHeadingClick(1)}>Example</Heading>
          <Filesystem structure={exampleFsStructure} /> */}
      </Box>
  )
}

export default MainContent;
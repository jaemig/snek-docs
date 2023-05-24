import { Box } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import CodeSnippet from "../../components/main-content/code-snippet/CodeSnippet";
import Filesystem from "../../components/main-content/filesystem/Filesystem";
import { TFilesystemItem } from "../../components/main-content/filesystem/filesystem.types";
import Heading from "../../components/main-content/heading/Heading";
import { MainContentItem, MainContentType } from "./mainContent.types";
import { mainComponentBaseStyle } from "./mainContent.vars";
import Text from "../../components/main-content/text/text";

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

//* This is only an early example and doesnt represent the final structure - in the future, the content coming from the CMS will be in a different format that will be converted to this something like this
const exampleContent: MainContentItem[] =[
  {
    type: MainContentType.Heading,
    children: 'The Secret Life of Rubber Ducks',
    variant: 'h1',
  },
  {
    type: MainContentType.Text,
    children: 'Rubber ducks are not just a fun bath-time companion, they have also been used by researchers to study ocean currents, providing valuable insights into global weather patterns and marine ecology.',
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

  //TODO: This gets reset after clicking on one of the associated links
  const [activeHeading, setActiveHeading] = useState<number>();

  const handleHeadingClick = (index: number) => {
    setActiveHeading(index);
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
                  {...mainComponentBaseStyle}
                >
                  {item.children}
                </Heading>
              case MainContentType.CodeSnippet:
                return <CodeSnippet
                  key={index}
                  code={item.code}
                  headerText={item.headerText}
                  {...mainComponentBaseStyle}
                />
              case MainContentType.Filesystem:
                return <Filesystem
                  key={index}
                  structure={item.structure}
                  {...mainComponentBaseStyle}
                />
              case MainContentType.Text:
                return <Text
                  key={index}
                  {...mainComponentBaseStyle}
                >
                  {item.children}
                </Text>
              default:
                return null;
            }
          })
        }
      </Box>
  )
}

export default MainContent;
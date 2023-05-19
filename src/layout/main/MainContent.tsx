import { Box, Heading, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import CodeSnippet from "../../components/main-content/code-snippet/CodeSnippet";

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
            <CodeSnippet code={exampleCode} fileName="app.tsx" />
        </Box>
    )
}

export default MainContent;
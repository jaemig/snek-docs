import React from "react";
import { HeadFC, graphql } from "gatsby";
import { Box, ChakraProvider, Flex, Grid, chakra } from "@chakra-ui/react";
import TopNav from "../layout/navigation/TopNav";
import LeftNav from "../layout/navigation/LeftNav";
import RightNav from "../layout/navigation/RightNav";
import MainWrapper from "../layout/main/MainWrapper";
import theme from "../theme/theme";
import AppLayout from "../layout/AppLayout";
import { connectTemplate, Field } from "@snek-at/jaen";

//TODO: Outsource the link style to the chakra theme
const DocsPage = connectTemplate(
  () => {
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
            base: "1fr",
            md: "0.8fr 2fr",
            xl: "minmax(auto, 250px) minmax(auto, 4fr) minmax(auto, 250px)",
          }}
          gap={10}
          px={{ base: 7, xl: 0 }}
        >
          <Box
            display={{ base: "none", md: "block" }}
            position="sticky"
            top="110px"
          >
            <LeftNav />
          </Box>
          <Box w="800px">
            <Field.Mdx
              name="documentation"
              components={{
                p: (props) => <chakra.p fontSize="sm" color="red" {...props} />,
                h1: (props) => (
                  <chakra.h1
                    fontSize="2xl"
                    borderBottom="1px solid blue"
                    {...props}
                  />
                ),
                h2: (props) => (
                  <chakra.h2 fontSize="xl" color="aqua" {...props} />
                ),
                h3: (props) => <chakra.h3 fontSize="lg" {...props} />,
                h4: (props) => <chakra.h4 fontSize="md" {...props} />,
              }}
              defaultValue={undefined}
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
    label: "Docs",
    children: [],
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

export { Head } from "@snek-at/jaen";

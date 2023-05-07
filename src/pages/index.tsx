import React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Box, ChakraProvider, Flex, Grid } from "@chakra-ui/react"
import TopNav from "../components/navigation/TopNav"
import LeftNav from "../components/navigation/LeftNav"
import RightNav from "../components/navigation/RightNav"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <ChakraProvider>
      <Flex
        direction='column'
        h='100vh'
      >
        <TopNav />
        <Grid
          flex={1}
          mt={5}
          w='7xl'
          mx='auto'
          templateRows='1fr'
          templateColumns='minmax(auto, 250px) 4fr minmax(auto, 250px)'
          gap={10}
        >
          <LeftNav />
          <Box>

          </Box>
          <RightNav />
        </Grid>
      </Flex>
    </ChakraProvider>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Snek Docs</title>

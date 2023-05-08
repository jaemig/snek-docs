import React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Box, ChakraProvider, Flex, Grid } from "@chakra-ui/react"
import TopNav from "../components/navigation/TopNav"
import LeftNav from "../components/navigation/LeftNav"
import RightNav from "../components/navigation/RightNav"
import MainWrapper from "../components/main/MainWrapper"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <ChakraProvider>
      <Box
        w='100vw'
        h='100vh'
        minW='100vw'
        minH='100vh'
      >
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
            <MainWrapper />
            <RightNav />
          </Grid>
        </Flex>
      </Box>
    </ChakraProvider>
  )
}

export default IndexPage

export const Head: HeadFC = () => (
  <>
    <html lang="de"></html>
    <title>Snek Docs</title>
    <meta name="description" content="Snek Docs" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </>
)

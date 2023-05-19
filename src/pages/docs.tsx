import React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Box, ChakraProvider, Flex, Grid } from "@chakra-ui/react"
import TopNav from "../layout/navigation/TopNav"
import LeftNav from "../layout/navigation/LeftNav"
import RightNav from "../layout/navigation/RightNav"
import MainWrapper from "../layout/main/MainWrapper"
import theme from "../theme/theme"
import AppLayout from "../layout/AppLayout"

//TODO: Outsource the link style to the chakra theme
const DocsPage: React.FC<PageProps> = () => {
  return (
    <AppLayout>
        <Grid
          flex={1}
          mt={5}
          maxW='7xl'
          h='100%'
          mx='auto'
          templateRows='1fr'
          templateColumns={{ base: '1fr', md: '0.8fr 2fr', xl: 'minmax(auto, 250px) minmax(auto, 4fr) minmax(auto, 250px)' }}
          gap={10}
          px={{ base: 7, xl: 0 }}
        >
          <Box display={{ base: 'none', md: 'block' }} position='sticky' top='110px'>
            <LeftNav />
          </Box>
          <MainWrapper />
          <Box position='sticky' top='80px'>
            <RightNav />
          </Box>
        </Grid>
    </AppLayout>
  )
}

export default DocsPage

export const Head: HeadFC = () => (
  <>
    <html lang="de"></html>
    <title>Snek Docs</title>
    <meta name="description" content="Snek Docs" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </>
)

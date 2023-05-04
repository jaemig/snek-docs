import React, { FC } from "react"
import type { HeadFC, PageProps } from "gatsby"
import { ChakraProvider, Heading, ThemeProvider } from "@chakra-ui/react"
import TopNav from "../components/navigation/TopNav"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <ChakraProvider>
      <TopNav />
      <main>
        <Heading>Hello world!</Heading>
      </main>
    </ChakraProvider>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Snek Docs</title>

import React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { ChakraProvider, Flex, Grid } from "@chakra-ui/react"
import theme from "../theme/theme"

//TODO: Outsource the link style to the chakra theme
const IndexPage: React.FC<PageProps> = () => {
  return (
    <h1>Hello world!</h1>
  )
}

export default IndexPage

export const Head: HeadFC = () => (
  <>
    <html lang="de"></html>
    <title>Snek Docs</title>
    <meta name="description" content="Snek Docs" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="docs:url" content="https://snek.at/docs" />
  </>
)

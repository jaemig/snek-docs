import { Box, Flex, Spacer } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import PageDirectory from "./components/PageDirectory";
import NavbarControls from "./components/NavbarControls";

/**
 * Left navigation bar.
 */
const LeftNav: FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Flex
      position="sticky"
      top="80px"
      as="nav"
      fontSize="sm"
      flexDirection="column"
      h="calc(100vh - 100px)"
      w={isExpanded ? "auto" : "5rem"}
      color="shared.text.default"
    >
      <Box w={isExpanded ? "auto" : 0}>
        <PageDirectory isExpanded={isExpanded} />
      </Box>
      <Spacer />
      <NavbarControls isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
    </Flex>
  );
};

export default LeftNav;

import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import DiscussionList from "./components/DiscussionList";

export default function Discussion() {
  return (
    <ChakraProvider>
      <Box p={5}>
        <DiscussionList />
      </Box>
    </ChakraProvider>
  );
}

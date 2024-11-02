import { Box, SimpleGrid } from "@chakra-ui/react";
import TradeAssetsOverview from "views/admin/Investment/components/TradeAssetsOverview";
import React from "react";

export default function Settings() {
  // Chakra Color Mode
  return (
<SimpleGrid mt={93}>
  <TradeAssetsOverview />

</SimpleGrid>
  );
}

import { Box, SimpleGrid } from "@chakra-ui/react";
import MarketplaceOverview from "views/admin/Marketplace/components/MarketplaceOverview";
import React from "react";

export default function Settings() {
  // Chakra Color Mode
  return (
<SimpleGrid mt={93}>
  <MarketplaceOverview />

</SimpleGrid>
  );
}

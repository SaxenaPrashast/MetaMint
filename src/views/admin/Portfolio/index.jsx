/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import TotalInvestment from "views/admin/Portfolio/components/TotalInvestment";
import BusinessListings from "views/admin/Portfolio/components/BusinessListings";
import PerformanceChart from "views/admin/Portfolio/components/PerformanceChart";
import React from "react";

export default function Settings() {
  // Chakra Color Mode
  return (
<SimpleGrid columns={{ base: 2, md: 2, xl: 2 }} gap='20px' mb='20px' mt={93}>
<Box>
  <TotalInvestment />
  <PerformanceChart />
</Box>
<Box> 
  <BusinessListings />
</Box>
</SimpleGrid>
  );
}

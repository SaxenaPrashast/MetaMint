import React from 'react';
import { Box, Flex, Text, Image, VStack, Tooltip, Progress } from '@chakra-ui/react';
import Card from "components/card/Card";

// Import currency icons
import usdIcon from "assets/img/icons/usd.png";
import btcIcon from "assets/img/icons/btc.jpg";
import ethIcon from "assets/img/icons/eth.png";
import usdtIcon from "assets/img/icons/usdt.png";
import pyusdIcon from "assets/img/icons/pyusd.png";

// Sample data for demonstration
const investmentData = [
  { id: 1, name: "PYUSD", value: 15000, displayValue: "$15,000", icon: pyusdIcon },
  { id: 2, name: "BTC", value: 10000, displayValue: "0.35 BTC", icon: btcIcon },
  { id: 3, name: "ETH", value: 7000, displayValue: "2.1 ETH", icon: ethIcon },
  { id: 4, name: "USDT", value: 3000, displayValue: "$3,000", icon: usdtIcon },
  { id: 5, name: "USD", value: 8000, displayValue: "$8,000", icon: usdIcon },
];

const TotalInvestment = ({ totalBusinesses }) => {
  // Calculate total value
  const totalInvestmentValue = investmentData.reduce((acc, asset) => acc + asset.value, 0);

  return (
    <Card boxShadow="lg" p={6} width="740px" height="650px">
      <VStack align="start" spacing={6}>
        {/* Total Number of Businesses */}
        <Box mb={4}>
          <Text fontSize="xl" fontWeight="bold" color="blue.700">
            Total Number of Businesses
          </Text>
          <Text fontSize="3xl" color="blue.500" fontWeight="extrabold">
            {totalBusinesses} 7
          </Text>
        </Box>

        {/* Total Investment Value per Asset */}
        <Box w="100%">
          <Text fontSize="xl" fontWeight="bold" color="green.700" mb={2}>
            Total Investment Value
          </Text>
          <Flex direction="column" gap={4}>
            {investmentData.map((asset) => {
              // Calculate asset's percentage of total investment
              const assetPercentage = ((asset.value / totalInvestmentValue) * 100).toFixed(1);
              return (
                <Flex key={asset.id} alignItems="center" justifyContent="space-between" w="100%">
                  <Flex alignItems="center" gap={3}>
                    <Image src={asset.icon} alt={asset.name} boxSize="35px" />
                    <Box>
                      <Tooltip label={`Current Value: ${asset.displayValue}`} hasArrow placement="top">
                        <Text fontWeight="semibold" fontSize="lg" color="gray.700">
                          {asset.name}
                        </Text>
                      </Tooltip>
                      <Text fontSize="sm" color="gray.500">Portfolio: {assetPercentage}%</Text>
                    </Box>
                  </Flex>
                  <Flex flexDirection="column" align="end">
                    <Text color="gray.600" fontSize="lg" fontWeight="bold">
                      {asset.displayValue}
                    </Text>
                    <Progress
                      value={assetPercentage}
                      size="sm"
                      width="100px"
                      colorScheme="green"
                      borderRadius="md"
                    />
                  </Flex>
                </Flex>
              );
            })}
          </Flex>
          {/* Total Value Display */}
          <Box mt={6} textAlign="center">
            <Text fontSize="lg" color="gray.600">
              Total Investment Value
            </Text>
            <Text fontSize="2xl" color="green.600" fontWeight="extrabold">
              ${totalInvestmentValue.toLocaleString()}
            </Text>
          </Box>
        </Box>
      </VStack>
    </Card>
  );
};

export default TotalInvestment;

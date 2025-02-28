import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Image, VStack, Tooltip, Progress, Spinner } from '@chakra-ui/react';
import Card from "components/card/Card";

// Import currency icons
import usdIcon from "assets/img/icons/usd.png";
import btcIcon from "assets/img/icons/btc.jpg";
import ethIcon from "assets/img/icons/eth.png";
import usdtIcon from "assets/img/icons/usdt.png";
import pyusdIcon from "assets/img/icons/pyusd.png";

const cryptoIcons = {
  USD: usdIcon,
  BTC: btcIcon,
  ETH: ethIcon,
  USDT: usdtIcon,
  PYUSD: pyusdIcon,
};

const TotalInvestment = ({ totalBusinesses }) => {
  const [cryptoData, setCryptoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,paypal-usd,usd&vs_currencies=usd");
        const data = await response.json();

        setCryptoData({
          PYUSD: data["paypal-usd"].usd,
          BTC: data.bitcoin.usd,
          ETH: data.ethereum.usd,
          USDT: data.tether.usd,
          USD: 1, // USD remains static
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching crypto prices:", error);
        setLoading(false);
      }
    };
    fetchCryptoPrices();
    const interval = setInterval(fetchCryptoPrices, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <Spinner size="xl" />;
  }

  const totalInvestmentValue = Object.values(cryptoData).reduce((acc, val) => acc + val, 0);

  return (
    <Card boxShadow="lg" p={6} width="740px" height="650px">
      <VStack align="start" spacing={6}>
        <Box mb={4}>
          <Text fontSize="xl" fontWeight="bold" color="blue.700">Total Number of Businesses</Text>
          <Text fontSize="3xl" color="blue.500" fontWeight="extrabold">{totalBusinesses}</Text>
        </Box>
        <Box w="100%">
          <Text fontSize="xl" fontWeight="bold" color="green.700" mb={2}>Total Investment Value</Text>
          <Flex direction="column" gap={4}>
            {Object.entries(cryptoData).map(([key, value]) => {
              const assetPercentage = ((value / totalInvestmentValue) * 100).toFixed(1);
              return (
                <Flex key={key} alignItems="center" justifyContent="space-between" w="100%">
                  <Flex alignItems="center" gap={3}>
                    <Image src={cryptoIcons[key]} alt={key} boxSize="35px" />
                    <Box>
                      <Tooltip label={`Current Value: $${value.toLocaleString()}`} hasArrow placement="top">
                        <Text fontWeight="semibold" fontSize="lg" color="gray.700">{key}</Text>
                      </Tooltip>
                      <Text fontSize="sm" color="gray.500">Portfolio: {assetPercentage}%</Text>
                    </Box>
                  </Flex>
                  <Flex flexDirection="column" align="end">
                    <Text color="gray.600" fontSize="lg" fontWeight="bold">${value.toLocaleString()}</Text>
                    <Progress value={assetPercentage} size="sm" width="100px" colorScheme="green" borderRadius="md" />
                  </Flex>
                </Flex>
              );
            })}
          </Flex>
          <Box mt={6} textAlign="center">
            <Text fontSize="lg" color="gray.600">Total Investment Value</Text>
            <Text fontSize="2xl" color="green.600" fontWeight="extrabold">${totalInvestmentValue.toLocaleString()}</Text>
          </Box>
        </Box>
      </VStack>
    </Card>
  );
};

export default TotalInvestment;

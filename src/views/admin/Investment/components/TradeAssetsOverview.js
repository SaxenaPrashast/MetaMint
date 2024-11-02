import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Select,
  Input,
  Button,
  Text,
  Stack,
  Divider,
  Flex,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import Card from "components/card/Card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import GasPriceEstimator from './GasPriceEstimator'; // Adjust the import path as necessary

// Asset icons import
import adaIcon from "assets/img/icons/ada.png";
import avalancheIcon from "assets/img/icons/avalanche.png";
import btcIcon from "assets/img/icons/btc.png";
import usdtIcon from "assets/img/icons/usdt.png";
import bscIcon from "assets/img/icons/bsc.png";
import maticIcon from "assets/img/icons/matic.png";
import ethIcon from "assets/img/icons/eth.png";
import pyusdIcon from "assets/img/icons/pyusd.png";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const assets = [
  { name: "Bitcoin (BTC)", icon: btcIcon, address: "0x0000000000000000000000000000000000000000000" }, // BTC doesn't have a contract address
  { name: "Ethereum (ETH)", icon: ethIcon, address: "0x0000000000000000000000000000000000000" }, // ETH doesn't have a contract address
  { name: "Cardano (ADA)", icon: adaIcon, address: "0x0000000000000000000000000000000000000000" }, // ADA doesn't have a contract address
  { name: "Avalanche (AVAX)", icon: avalancheIcon, address: "0x1ce0c2827e2ef14d5c4f29a091d735a204794041 " }, // AVAX contract address
  { name: "Tether (USDT)", icon: usdtIcon, address: "0xdac17f958d2ee523a2206206994597c13d831ec7" }, // USDT contract address on Ethereum
  { name: "Binance Smart Chain (BSC)", icon: bscIcon, address: "0x0000000000000000000000000000000000000000" }, // BSC doesn't have a contract address
  { name: "Polygon (MATIC)", icon: maticIcon, address: "0x0000000000000000000000000000000000000000" }, // MATIC doesn't have a contract address
  { name: "PyuDollar (PYUSD)", icon: pyusdIcon, address: "0x0000000000000000000000000000000000000000" }, // Replace with actual address if available
];

const TradeAssetsOverview = () => {
  const [selectedAsset, setSelectedAsset] = useState(assets[0]);
  const [amount, setAmount] = useState("");
  const [tradeType, setTradeType] = useState("Buy");
  const [tradeHistory, setTradeHistory] = useState([]);
  const [tradeStatus, setTradeStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [priceHistory, setPriceHistory] = useState([]);
  const [portfolio, setPortfolio] = useState({
    btc: 1,
    eth: 5,
    ada: 100,
    avax: 50,
    usdt: 1000,
    bsc: 2,
    matic: 200,
    pyusd: 500,
  });
  const [tokenPriceUSD, setTokenPriceUSD] = useState(null); // State for token price in USD
  const [fetchingPrice, setFetchingPrice] = useState(true); // State for fetching price loading

  const { isOpen: isTradeOpen, onOpen: onTradeOpen, onClose: onTradeClose } = useDisclosure();
  const toast = useToast();
  const [gasPrice, setGasPrice] = useState(null); // State for gas price

  useEffect(() => {
    const simulatedHistoricalData = generateHistoricalPriceData(selectedAsset.name);
    setPriceHistory(simulatedHistoricalData);
    fetchTokenPrice(selectedAsset.address);
  }, [selectedAsset]);

  const fetchTokenPrice = async (tokenAddress) => {
    const tokenPriceBaseUrl = 'https://api.odos.xyz/pricing/token';
    const chainId = 1; // Replace with appropriate chain ID

    try {
      const response = await fetch(`${tokenPriceBaseUrl}/${chainId}/${tokenAddress}`);
      if (response.status === 200) {
        const data = await response.json();
        setTokenPriceUSD(data.price); // Adjust based on the API response structure
        setFetchingPrice(false); // Stop loading
      } else {
        console.error('Error fetching token price:', response);
        setTokenPriceUSD(null);
        setFetchingPrice(false); // Stop loading
      }
    } catch (error) {
      console.error('Error fetching token price:', error);
      setTokenPriceUSD(null);
      setFetchingPrice(false); // Stop loading
    }
  };

  const handleTrade = () => {
    if (amount && selectedAsset) {
      const fee = calculateTransactionFee(selectedAsset.price, amount);
      const totalCost = (selectedAsset.price * amount) + fee;

      // Show confirmation modal
      setGasPrice(10); // Set the gas price here; in a real app, this should come from GasPriceEstimator
      onTradeOpen();
    } else {
      setTradeStatus("Please enter a valid amount.");
    }
  };

  const confirmTrade = () => {
    setLoading(true);
    
    const tradeAmount = parseFloat(amount);
    const newTrade = {
      date: new Date().toLocaleString(),
      assetName: selectedAsset.name,
      type: tradeType,
      amount: tradeAmount,
      price: tokenPriceUSD, // Use the fetched token price in USD
      fee: calculateTransactionFee(tokenPriceUSD, tradeAmount),
    };

    const assetKey = selectedAsset.name.split(' ')[0].toLowerCase();
    if (tradeType === "Buy") {
      setPortfolio((prevPortfolio) => ({
        ...prevPortfolio,
        [assetKey]: (prevPortfolio[assetKey] || 0) + tradeAmount,
      }));
    } else {
      const currentAmount = portfolio[assetKey] || 0;
      if (currentAmount >= tradeAmount) {
        setPortfolio((prevPortfolio) => ({
          ...prevPortfolio,
          [assetKey]: currentAmount - tradeAmount,
        }));
      } else {
        setTradeStatus("Insufficient quantity to sell.");
        setLoading(false);
        return;
      }
    }

    setTradeHistory((prevTrades) => [...prevTrades, newTrade]);
    setAmount("");
    setTradeStatus(`Successfully ${tradeType.toLowerCase()}ed ${tradeAmount} ${selectedAsset.name}.`);
    
    toast({
      title: "Trade Executed",
      description: tradeStatus,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    
    setLoading(false);
    onTradeClose();
  };

  const calculateTransactionFee = (price, amount) => {
    const total = price * amount;
    return tradeType === "Buy" ? total * 0.01 : total * 0.005; // Example fee: 1% for buy, 0.5% for sell
  };

  const generateHistoricalPriceData = (assetName) => {
    const mockData = Array.from({ length: 10 }, (_, index) => ({
      date: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toLocaleDateString(),
      price: Math.round(Math.random() * 100 + 50), // Random price between 50 and 150
    }));
    return mockData;
  };

  const chartData = {
    labels: priceHistory.map(data => data.date),
    datasets: [
      {
        label: `Price of ${selectedAsset.name}`,
        data: priceHistory.map(data => data.price),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <Box p={5}>
      <Heading mb={5}>Trade Assets Overview</Heading>

      <GasPriceEstimator setGasPrice={setGasPrice} />

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
      <Card mt={5}>
          <Box p={5}>
            <Heading size="md" mb={3}>Your Portfolio</Heading>
            <Divider mb={3} />
            <SimpleGrid columns={2} spacing={4}>
              {Object.entries(portfolio).map(([key, value]) => {
                const asset = assets.find(asset => asset.name.split(" ")[0].toLowerCase() === key);
                return (
                  <Flex key={key} alignItems="center">
                    {asset ? (
                      <>
                        <img src={asset.icon} alt={asset.name} style={{ width: '24px', marginRight: '8px' }} />
                        <Text>{`${asset.name}: ${value}`}</Text>
                      </>
                    ) : (
                      <Text>{`${key.toUpperCase()}: ${value}`}</Text>
                    )}
                  </Flex>
                );
              })}
            </SimpleGrid>
          </Box>
        </Card>

        <Card mt={5}>
          <Box p={5}>
            <Heading size="md" mb={3}>Trade</Heading>
            <Divider mb={3} />
            <Select
              value={assets.findIndex(asset => asset.name === selectedAsset.name)}
              onChange={(e) => setSelectedAsset(assets[e.target.value])}
              mb={4}
            >
              {assets.map((asset, index) => (
                <option key={index} value={index}>
                  {asset.name}
                </option>
              ))}
            </Select>
            <Input
              placeholder="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              mb={4}
            />
            <Button colorScheme="teal" onClick={handleTrade}>
              {tradeType}
            </Button>
            {tradeStatus && (
              <Alert status="info" mt={4}>
                <AlertIcon />
                {tradeStatus}
              </Alert>
            )}
            {fetchingPrice ? ( // Display loading state for price
              <Text mt={4} fontSize="lg">Current Price: Loading...</Text>
            ) : tokenPriceUSD ? ( // Display the token price in USD
              <Text mt={4} fontSize="lg">
                Current Price: ${tokenPriceUSD.toFixed(2)} USD
              </Text>
            ) : (
              <Text mt={4} fontSize="lg" color="red.500">Error fetching price</Text>
            )}
          </Box>
        </Card>
      </SimpleGrid>

      {/* Trade History Section */}
      <Card mt={5}>
        <Box p={5}>
          <Heading size="md" mb={3}>Trade History</Heading>
          <Divider mb={3} />
          {tradeHistory.length === 0 ? (
            <Text>No trades executed yet.</Text>
          ) : (
            tradeHistory.map((trade, index) => (
              <Text key={index}>
                {trade.date}: {trade.type} {trade.amount} {trade.assetName} at ${trade.price.toFixed(2)} (Fee: ${trade.fee.toFixed(2)})
              </Text>
            ))
          )}
        </Box>
      </Card>

      {/* Trade Confirmation Modal */}
      <Modal isOpen={isTradeOpen} onClose={onTradeClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Trade</ModalHeader>
          <ModalBody>
            <Text>Are you sure you want to {tradeType} {amount} {selectedAsset.name}?</Text>
            {gasPrice && (
              <Text mt={2}>Estimated Gas Price: ${gasPrice}</Text>
            )}
            {fetchingPrice ? ( // Display loading state in the modal as well
              <Text mt={2}>Current Price: Loading...</Text>
            ) : tokenPriceUSD ? ( // Show current token price in USD
              <Text mt={2}>Current Price: ${tokenPriceUSD.toFixed(2)} USD</Text>
            ) : (
              <Text mt={2} color="red.500">Error fetching price</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={confirmTrade} isLoading={loading}>
              Confirm
            </Button>
            <Button onClick={onTradeClose} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Chart Section */}
      <Card mt={5}>
        <Box p={5}>
          <Heading size="md" mb={3}>Price History</Heading>
          <Line data={chartData} />
        </Box>
      </Card>
    </Box>
  );
};

export default TradeAssetsOverview;

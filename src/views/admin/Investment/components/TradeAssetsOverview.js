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

// Import asset icons
import adaIcon from "assets/img/icons/ada.png"; // ADA Icon
import avalancheIcon from "assets/img/icons/avalanche.png"; // Avalanche Icon
import btcIcon from "assets/img/icons/btc.png"; // BTC Icon
import usdtIcon from "assets/img/icons/usdt.png"; // USDT Icon
import bscIcon from "assets/img/icons/bsc.png"; // BSC Icon
import maticIcon from "assets/img/icons/matic.png"; // MATIC Icon
import ethIcon from "assets/img/icons/eth.png"; // ETH Icon
import pyusdIcon from "assets/img/icons/pyusd.png"; // PYUSD Icon

// Register the components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const assets = [
  { name: "Bitcoin (BTC)", icon: btcIcon, price: 30000 },
  { name: "Ethereum (ETH)", icon: ethIcon, price: 2000 },
  { name: "Cardano (ADA)", icon: adaIcon, price: 0.5 },
  { name: "Avalanche (AVAX)", icon: avalancheIcon, price: 15 },
  { name: "Tether (USDT)", icon: usdtIcon, price: 1 },
  { name: "Binance Smart Chain (BSC)", icon: bscIcon, price: 300 },
  { name: "Polygon (MATIC)", icon: maticIcon, price: 1.5 },
  { name: "PyuDollar (PYUSD)", icon: pyusdIcon, price: 1 },
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
    btc: 1, // Start with 1 BTC
    eth: 5, // Start with 5 ETH
    ada: 100, // Start with 100 ADA
    avax: 50, // Start with 50 AVAX
    usdt: 1000, // Start with 1000 USDT
    bsc: 2, // Start with 2 BSC
    matic: 200, // Start with 200 MATIC
    pyusd: 500, // Start with 500 PYUSD
  });

  const { isOpen: isTradeOpen, onOpen: onTradeOpen, onClose: onTradeClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const simulatedHistoricalData = generateHistoricalPriceData(selectedAsset.name);
    setPriceHistory(simulatedHistoricalData);
  }, [selectedAsset]);

  const handleTrade = () => {
    if (amount && selectedAsset) {
      const fee = calculateTransactionFee(selectedAsset.price, amount);
      const totalCost = (selectedAsset.price * amount) + fee;

      // Show confirmation modal
      onTradeOpen();
    } else {
      setTradeStatus("Please enter a valid amount.");
    }
  };

  const confirmTrade = () => {
    setLoading(true);
    
    const tradeAmount = parseFloat(amount); // Ensure the amount is a number
    const newTrade = {
      date: new Date().toLocaleString(),
      assetName: selectedAsset.name,
      type: tradeType,
      amount: tradeAmount,
      price: selectedAsset.price,
      fee: calculateTransactionFee(selectedAsset.price, tradeAmount),
    };

    // Update portfolio based on trade type
    const assetKey = selectedAsset.name.split(' ')[0].toLowerCase();
    if (tradeType === "Buy") {
      // If buying, increase the amount in the portfolio
      setPortfolio((prevPortfolio) => ({
        ...prevPortfolio,
        [assetKey]: (prevPortfolio[assetKey] || 0) + tradeAmount,
      }));
    } else {
      // If selling, check if there are enough assets
      const currentAmount = portfolio[assetKey] || 0;
      if (currentAmount >= tradeAmount) {
        setPortfolio((prevPortfolio) => ({
          ...prevPortfolio,
          [assetKey]: currentAmount - tradeAmount,
        }));
      } else {
        setTradeStatus("Insufficient quantity to sell.");
        setLoading(false);
        return; // Exit if there are not enough assets to sell
      }
    }

    // Update trade history
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

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {/* User Portfolio Section */}
        <Card mb={5}>
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
                      <Text>{`${key.toUpperCase()}: ${value}`}</Text> // Fallback for missing asset
                    )}
                  </Flex>
                );
              })}
            </SimpleGrid>
          </Box>
        </Card>

        <Card>
          <Box p={5}>
            <Flex alignItems="center" mb={4}>
              <Select
                value={tradeType}
                onChange={(e) => setTradeType(e.target.value)}
                width="150px"
                mr={2}
              >
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
              </Select>
              <Select
                placeholder="Select Asset"
                value={selectedAsset.name}
                onChange={(e) => setSelectedAsset(assets.find(asset => asset.name === e.target.value))}
                width="200px"
              >
                {assets.map((asset) => (
                  <option key={asset.name} value={asset.name}>
                    {asset.name}
                  </option>
                ))}
              </Select>
            </Flex>

            <Input
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              mb={3}
            />
            <Button colorScheme="blue" onClick={handleTrade} isLoading={loading}>
              Confirm Trade
            </Button>
            {tradeStatus && (
              <Alert status={tradeStatus.includes("Insufficient") ? "error" : "success"} mt={4}>
                <AlertIcon />
                {tradeStatus}
              </Alert>
            )}
          </Box>
        </Card>
      </SimpleGrid>

      {/* Price History Chart */}
      <Card mt={5}>
        <Box p={5}>
          <Heading size="md" mb={3}>Price History</Heading>
          <Divider mb={3} />
          <Line data={chartData} />
        </Box>
      </Card>

      {/* Confirmation Modal */}
      <Modal isOpen={isTradeOpen} onClose={onTradeClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Trade</ModalHeader>
          <ModalBody>
            <Text>Are you sure you want to {tradeType.toLowerCase()} {amount} of {selectedAsset.name}?</Text>
            <Text mt={2}>Total cost (including fees): ${((selectedAsset.price * amount) + calculateTransactionFee(selectedAsset.price, amount)).toFixed(2)}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={confirmTrade}>
              Yes
            </Button>
            <Button onClick={onTradeClose}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Trade History Section */}
      <Card mt={5}>
        <Box p={5}>
          <Heading size="md" mb={3}>Trade History</Heading>
          <Divider mb={3} />
          <SimpleGrid columns={1} spacing={4}>
            {tradeHistory.length === 0 ? (
              <Text>No trades made yet.</Text>
            ) : (
              tradeHistory.map((trade, index) => (
                <Box key={index} p={3} borderWidth="1px" borderRadius="md">
                  <Text><strong>{trade.type}</strong> {trade.amount} of {trade.assetName} at ${trade.price.toFixed(2)} on {trade.date}. Fee: ${trade.fee.toFixed(2)}</Text>
                </Box>
              ))
            )}
          </SimpleGrid>
        </Box>
      </Card>
    </Box>
  );
};

export default TradeAssetsOverview;

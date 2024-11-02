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

// Import the Gas Price Estimator
import GasPriceEstimator from './GasPriceEstimator'; // Adjust the import path as necessary

// Import asset icons
import adaIcon from "assets/img/icons/ada.png";
import avalancheIcon from "assets/img/icons/avalanche.png";
import btcIcon from "assets/img/icons/btc.png";
import usdtIcon from "assets/img/icons/usdt.png";
import bscIcon from "assets/img/icons/bsc.png";
import maticIcon from "assets/img/icons/matic.png";
import ethIcon from "assets/img/icons/eth.png";
import pyusdIcon from "assets/img/icons/pyusd.png";

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
    btc: 1,
    eth: 5,
    ada: 100,
    avax: 50,
    usdt: 1000,
    bsc: 2,
    matic: 200,
    pyusd: 500,
  });

  const { isOpen: isTradeOpen, onOpen: onTradeOpen, onClose: onTradeClose } = useDisclosure();
  const toast = useToast();
  
  const [gasPrice, setGasPrice] = useState(null); // State for gas price

  useEffect(() => {
    const simulatedHistoricalData = generateHistoricalPriceData(selectedAsset.name);
    setPriceHistory(simulatedHistoricalData);
  }, [selectedAsset]);

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
      price: selectedAsset.price,
      fee: calculateTransactionFee(selectedAsset.price, tradeAmount),
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
    <Box p={5} >
      <Heading mb={5}>Trade Assets Overview</Heading>

      {/* Add the Gas Price Estimator Component */}
      <GasPriceEstimator setGasPrice={setGasPrice} /> {/* Pass setGasPrice to GasPriceEstimator */}

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {/* User Portfolio Section */}
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
                placeholder="Select asset"
                onChange={(e) => setSelectedAsset(assets[e.target.value])}
              >
                {assets.map((asset, index) => (
                  <option key={index} value={index}>
                    {asset.name}
                  </option>
                ))}
              </Select>
            </Flex>
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
              <Text mt={2}>Estimated Gas Price: ${gasPrice}</Text> // Show gas price
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

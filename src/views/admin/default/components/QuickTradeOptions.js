import React, { useState } from 'react';
import {
  Box,
  Text,
  Button,
  SimpleGrid,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Select,
  useDisclosure,
  Image,
  HStack,
  Divider,
} from '@chakra-ui/react';
import Card from "components/card/Card";

// Importing icons
import usdIcon from "assets/img/icons/usd.png"; 
import btcIcon from "assets/img/icons/btc.jpg"; 
import ethIcon from "assets/img/icons/eth.png"; 
import usdtIcon from "assets/img/icons/usdt.png";  
import pyusdIcon from "assets/img/icons/pyusd.png"; 
import adaIcon from "assets/img/icons/ada.png"; // ADA Icon
import avalancheIcon from "assets/img/icons/avalanche.png"; // Avalanche Icon
import bscIcon from "assets/img/icons/bsc.png"; // BSC Icon
import maticIcon from "assets/img/icons/matic.png"; // MATIC Icon

// Sample data for businesses available for trade
const businessesForSale = [
  {
    id: 1,
    name: "Tech Innovations Inc.",
    currentValue: 12000,
    roiPercentage: 25,
    recentPerformance: "+5% last month",
  },
  {
    id: 2,
    name: "Green Energy Solutions",
    currentValue: 15000,
    roiPercentage: 15,
    recentPerformance: "+2% last month",
  },
  {
    id: 3,
    name: "Health Care Services",
    currentValue: 9000,
    roiPercentage: 10,
    recentPerformance: "-1% last month",
  },
  {
    id: 4,
    name: "Finance & Investments LLC",
    currentValue: 18000,
    roiPercentage: 30,
    recentPerformance: "+8% last month",
  },
  {
    id: 5,
    name: "E-commerce Ventures",
    currentValue: 30000,
    roiPercentage: 50,
    recentPerformance: "+10% last month",
  },
  {
    id: 6,
    name: "Food & Beverage Co.",
    currentValue: 8000,
    roiPercentage: 5,
    recentPerformance: "-2% last month",
  },
];

// Sample data for available cryptocurrencies
const cryptocurrencies = [
  { id: 1, symbol: "BTC", name: "Bitcoin", icon: btcIcon, rate: 60000 },
  { id: 2, symbol: "ETH", name: "Ethereum", icon: ethIcon, rate: 4000 },
  { id: 3, symbol: "USDT", name: "Tether", icon: usdtIcon, rate: 1 },
  { id: 4, symbol: "ADA", name: "Cardano", icon: adaIcon, rate: 1.2 },
  { id: 5, symbol: "MATIC", name: "Polygon", icon: maticIcon, rate: 1.5 },
  { id: 6, symbol: "PYUSD", name: "PYUSD", icon: pyusdIcon, rate: 1 },
];

const QuickTradeOptions = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [sellPrice, setSellPrice] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [fee, setFee] = useState(0);
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [showTradeInfo, setShowTradeInfo] = useState(false); 
  const [currentPage, setCurrentPage] = useState(0); // Pagination state

  const itemsPerPage = 4; // Set how many businesses to show per page
  const totalPages = Math.ceil(businessesForSale.length / itemsPerPage);

  const handleOpenModal = (business) => {
    setSelectedBusiness(business);
    setSellPrice('');
    onOpen();
  };

  const handleSell = () => {
    console.log(`Selling ${selectedBusiness.name} for $${sellPrice}`);
    onClose();
  };

  const handleTrade = () => {
    if (fromCurrency && toCurrency && amount) {
      const fromRate = cryptocurrencies.find(crypto => crypto.symbol === fromCurrency)?.rate || 1;
      const toRate = cryptocurrencies.find(crypto => crypto.symbol === toCurrency)?.rate || 1;

      const tradeAmount = (amount * fromRate) / toRate; // Amount of 'toCurrency' received
      const tradingFee = (amount * 0.01).toFixed(2); // 1% fee
      setFee(tradingFee);
      setReceivedAmount(tradeAmount - tradingFee);
      setShowTradeInfo(true);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentBusinesses = businessesForSale.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <Card boxShadow="lg" p={4} mb={6} mt={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Quick Trade Options
      </Text>
      <Text fontSize="lg" mb={4}>
        Current PYUSD Balance: <strong>$10,000</strong>
      </Text>
      
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {currentBusinesses.map(business => (
          <Card key={business.id} p={4} borderWidth={1} borderRadius="md">
            <Text fontWeight="bold" fontSize="lg">
              {business.name}
            </Text>
            <Text color="gray.500">Current Value: ${business.currentValue.toLocaleString()}</Text>
            <Text color="green.500" fontWeight="bold">
              ROI: {business.roiPercentage}% 
              <Text as="span" color="green.600" fontWeight="normal"> (Profitable)</Text>
            </Text>
            <Text color="gray.400">Recent Performance: {business.recentPerformance}</Text>
            <Box mt={4}>
              <Button colorScheme="red" onClick={() => handleOpenModal(business)}>
                Sell
              </Button>
            </Box>
          </Card>
        ))}
      </SimpleGrid>

      <HStack spacing={4} mt={4}>
        <Button onClick={handlePreviousPage} isDisabled={currentPage === 0}>
          Previous
        </Button>
        <Button onClick={handleNextPage} isDisabled={currentPage === totalPages - 1}>
          Next
        </Button>
      </HStack>

      {/* Modal for Selling */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sell {selectedBusiness ? selectedBusiness.name : ''}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Enter Selling Price</FormLabel>
              <Input 
                type="number" 
                value={sellPrice} 
                onChange={(e) => setSellPrice(e.target.value)} 
                placeholder={`Current Value: $${selectedBusiness ? selectedBusiness.currentValue : ''}`} 
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleSell} isDisabled={!sellPrice}>
              Confirm Sell
            </Button>
            <Button colorScheme="gray" onClick={onClose} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Crypto Trading Options */}
      <Box mt={6}>
        <Text fontSize="lg" fontWeight="bold" mb={2}>Trade Cryptocurrency</Text>
        <FormControl mb={4}>
          <FormLabel>From</FormLabel>
          <Select placeholder="Select cryptocurrency" onChange={(e) => setFromCurrency(e.target.value)}>
            {cryptocurrencies.map(crypto => (
              <option key={crypto.id} value={crypto.symbol}>{crypto.name} ({crypto.symbol})</option>
            ))}
          </Select>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>To</FormLabel>
          <Select placeholder="Select cryptocurrency" onChange={(e) => setToCurrency(e.target.value)}>
            {cryptocurrencies.map(crypto => (
              <option key={crypto.id} value={crypto.symbol}>{crypto.name} ({crypto.symbol})</option>
            ))}
          </Select>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Amount</FormLabel>
          <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" />
        </FormControl>
        <Button colorScheme="blue" onClick={handleTrade}>
          Trade
        </Button>
      </Box>

      {showTradeInfo && (
        <Box mt={4} p={4} borderWidth={1} borderRadius="md" bg="gray.50">
          <Text fontSize="lg" fontWeight="bold" mb={2}>Trade Information</Text>
          <HStack justify="space-between">
            <Image src={cryptocurrencies.find(crypto => crypto.symbol === fromCurrency)?.icon} boxSize="30px" />
            <Text fontWeight="bold">{fromCurrency}</Text>
            <Text fontSize="lg">➡️</Text>
            <Image src={cryptocurrencies.find(crypto => crypto.symbol === toCurrency)?.icon} boxSize="30px" />
            <Text fontWeight="bold">{toCurrency}</Text>
          </HStack>
          <Divider my={2} />
          <Text fontSize="lg" fontWeight="bold">Trading Amount: {amount} {fromCurrency}</Text>
          <Text>Estimated Amount Received: {receivedAmount.toFixed(4)} {toCurrency}</Text>
          <Text>Fee: ${fee} (1% of the trade)</Text>
          <Divider my={2} />
          <Button colorScheme="green" mt={2} onClick={() => console.log("Confirm trade")}>
            Confirm Trade
          </Button>
        </Box>
      )}
    </Card>
  );
};

export default QuickTradeOptions;

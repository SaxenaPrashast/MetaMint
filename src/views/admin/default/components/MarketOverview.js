import React, { useState } from 'react';
import { Box, Text, Image, List, ListItem, ListIcon, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, SimpleGrid } from '@chakra-ui/react';
import Card from "components/card/Card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Assuming you're using recharts for charting

// Import images for top gainers/losers from icons

// Import images for top gainers/losers from icons
import adaIcon from "assets/img//icons/ada.png"; // ADA Icon
import avalancheIcon from "assets/img/icons/avalanche.png"; // Avalanche Icon
import btcIcon from "assets/img/icons/btc.png"; // BTC Icon
import usdtIcon from "assets/img/icons/usdt.png"; // USDT Icon
import bscIcon from "assets/img/icons/bsc.png"; // BSC Icon
import maticIcon from "assets/img/icons/matic.png"; // MATIC Icon

// Import images for trending businesses (keeping previous names or changing if needed)
import smartAgriculture from "assets/img/investments/smartAgriculture.png"; 
import virtualReality from "assets/img/investments/virtualReality.png"; 
import aiConsulting from "assets/img/investments/aiConsulting.png"; 
import electricVehicles from "assets/img/investments/electricVehicles.png"; 

const MarketOverview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  
  const gainersLosersData = [
    { 
      id: 1, 
      name: "ADA", 
      image: adaIcon, 
      performance: 10 // Store performance as a number for easier calculations 
    },
    { 
      id: 2, 
      name: "Avalanche", 
      image: avalancheIcon, 
      performance: 8 
    },
    { 
      id: 3, 
      name: "BTC", 
      image: btcIcon, 
      performance: 5 
    },
    { 
      id: 4, 
      name: "USDT", 
      image: usdtIcon, 
      performance: -2 
    },
    { 
      id: 5, 
      name: "BSC", 
      image: bscIcon, 
      performance: 3 
    },
    { 
      id: 6, 
      name: "MATIC", 
      image: maticIcon, 
      performance: 7 
    },
  ];

  const trendingBusinessesData = [
    { 
      id: 1, 
      name: "Smart Agriculture Tech", 
      image: smartAgriculture 
    },
    { 
      id: 2, 
      name: "Virtual Reality Innovations", 
      image: virtualReality 
    },
    { 
      id: 3, 
      name: "AI Consulting Services", 
      image: aiConsulting 
    },
    { 
      id: 4, 
      name: "Electric Vehicle Manufacturing", 
      image: electricVehicles 
    },
  ];

  const handleOpenModal = (asset) => {
    setSelectedAsset(asset);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedAsset(null);
  };

  return (
    <Box mt={6}>
    {/* Top Gainers/Losers Section */}
    <Card boxShadow="lg"mb={6}  mx="auto"> {/* Adjust width here */}
      <Text fontSize="xl" fontWeight="semibold" mb={4}>
        Top Gainers/Losers
      </Text>
      <List spacing={3}>
        {gainersLosersData.map(asset => (
          <ListItem key={asset.id} display="flex" alignItems="center">
            <ListIcon as={Image} src={asset.image} alt={asset.name} boxSize="40px" />
            <Text fontWeight="bold">{asset.name}</Text>
            <Text color={asset.performance > 0 ? "green.500" : "red.500"} ml={3}>
              {asset.performance > 0 ? `+${asset.performance}%` : `${asset.performance}%`}
            </Text>
            <Button ml="auto" onClick={() => handleOpenModal(asset)}>
              View Details
            </Button>
          </ListItem>
        ))}
      </List>
    </Card>
  
    {/* Trending Businesses Section */}
    <Card boxShadow="lg" p={4} width="100%" maxWidth="800px" mx="auto"> {/* Adjust width here */}
      <Text fontSize="xl" fontWeight="semibold" mb={4}>
        Trending Businesses
      </Text>
      <List spacing={3}>
        {trendingBusinessesData.map(business => (
          <ListItem key={business.id} display="flex" alignItems="center">
            <ListIcon as={Image} src={business.image} alt={business.name} boxSize="40px" />
            <Text fontWeight="bold">{business.name}</Text>
            <Button ml="auto" onClick={() => handleOpenModal(business)}>
              View Details
            </Button>
          </ListItem>
        ))}
      </List>
    </Card>
  
      {/* Modal for Detailed View */}
      <Modal isOpen={isOpen} onClose={handleCloseModal} size="xl"> {/* Use size prop to control width */}
  <ModalOverlay />
  <ModalContent maxWidth="1000px"> {/* Set the max width of the ModalContent */}
    <ModalHeader>{selectedAsset ? selectedAsset.name : ''}</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <Text mb={4}>Details and Chart for {selectedAsset ? selectedAsset.name : ''}</Text>
      {/* Placeholder for Chart */}
      <SimpleGrid columns={1} spacing={4}>
        <LineChart width={500} height={300} data={getChartData(selectedAsset)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" />
        </LineChart>
      </SimpleGrid>
    </ModalBody>
  </ModalContent>
</Modal>

    </Box>
  );
};

// Sample chart data generator based on selected asset
const getChartData = (asset) => {
  if (!asset) return [];
  // Example data, replace with actual data logic
  const data = [
    { date: '2023-10-01', value: Math.random() * 100 },
    { date: '2023-10-02', value: Math.random() * 100 },
    { date: '2023-10-03', value: Math.random() * 100 },
    { date: '2023-10-04', value: Math.random() * 100 },
    { date: '2023-10-05', value: Math.random() * 100 },
  ];
  return data;
};

export default MarketOverview;

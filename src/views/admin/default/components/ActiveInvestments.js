import React, { useState } from 'react';
import Card from "components/card/Card"; 
import { Box, Text, SimpleGrid, Badge, Image, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack } from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Import images for each investment
import techinnovations from "assets/img/investments/techinnovations.png";
import greenEnergy from "assets/img/investments/greenEnergy.png"; 
import healthCare from "assets/img/investments/healthCare.png"; 
import financeInvestments from "assets/img/investments/financeInvestments.png";
import ecommerce from "assets/img/investments/ecommerce.png"; 
import foodBeverage from "assets/img/investments/foodBeverage.png";

// Sample data for active investments
const investmentsData = [
  {
    id: 1,
    name: "Tech Innovations Inc.",
    currentValue: 12000,
    roiPercentage: 25,
    recentPerformance: "+5% last month",
    image: techinnovations,
    description: "Leading the tech industry with innovative solutions.",
    totalGains: 3000,
    activeTrades: 5,
    performanceData: [
      { name: 'Jan', value: 9000 },
      { name: 'Feb', value: 9500 },
      { name: 'Mar', value: 11500 },
      { name: 'Apr', value: 12000 },
      { name: 'May', value: 13000 },
      { name: 'Jun', value: 14000 },
    ],
    timeline: [
      { date: '2022-01-10', event: 'Acquired 100 shares' },
      { date: '2022-03-15', event: 'First dividend received' },
      { date: '2022-06-20', event: 'Share price hit $120' },
    ],
  },
  {
    id: 2,
    name: "Green Energy Solutions",
    currentValue: 15000,
    roiPercentage: 15,
    recentPerformance: "+2% last month",
    image: greenEnergy,
    description: "Providing sustainable energy solutions for the future.",
    totalGains: 2000,
    activeTrades: 3,
    performanceData: [
      { name: 'Jan', value: 12000 },
      { name: 'Feb', value: 12500 },
      { name: 'Mar', value: 13000 },
      { name: 'Apr', value: 14500 },
      { name: 'May', value: 15000 },
      { name: 'Jun', value: 15500 },
    ],
    timeline: [
      { date: '2022-01-05', event: 'Invested in 50 shares' },
      { date: '2022-02-10', event: 'Renewed contracts with suppliers' },
      { date: '2022-05-01', event: 'Expanded operations' },
    ],
  },
  {
    id: 3,
    name: "Health Care Services",
    currentValue: 9000,
    roiPercentage: 10,
    recentPerformance: "-1% last month",
    image: healthCare,
    description: "Committed to improving health care accessibility.",
    totalGains: 500,
    activeTrades: 1,
    performanceData: [
      { name: 'Jan', value: 8000 },
      { name: 'Feb', value: 8500 },
      { name: 'Mar', value: 9000 },
      { name: 'Apr', value: 8700 },
      { name: 'May', value: 8800 },
      { name: 'Jun', value: 9100 },
    ],
    timeline: [
      { date: '2022-01-15', event: 'Bought 30 shares' },
      { date: '2022-03-01', event: 'Signed a new partnership' },
      { date: '2022-04-20', event: 'Opened a new clinic' },
    ],
  },
  {
    id: 4,
    name: "Finance & Investments LLC",
    currentValue: 18000,
    roiPercentage: 30,
    recentPerformance: "+8% last month",
    image: financeInvestments,
    description: "Maximizing your returns with expert financial services.",
    totalGains: 5400,
    activeTrades: 10,
    performanceData: [
      { name: 'Jan', value: 15000 },
      { name: 'Feb', value: 15500 },
      { name: 'Mar', value: 17000 },
      { name: 'Apr', value: 18000 },
      { name: 'May', value: 18500 },
      { name: 'Jun', value: 19000 },
    ],
    timeline: [
      { date: '2022-02-01', event: 'Invested in new bonds' },
      { date: '2022-04-10', event: 'Merged with another company' },
      { date: '2022-06-15', event: 'Exceeded projected earnings' },
    ],
  },
  {
    id: 5,
    name: "E-commerce Ventures",
    currentValue: 30000,
    roiPercentage: 50,
    recentPerformance: "+10% last month",
    image: ecommerce,
    description: "Driving online sales with innovative marketing strategies.",
    totalGains: 15000,
    activeTrades: 15,
    performanceData: [
      { name: 'Jan', value: 20000 },
      { name: 'Feb', value: 22000 },
      { name: 'Mar', value: 25000 },
      { name: 'Apr', value: 27000 },
      { name: 'May', value: 29000 },
      { name: 'Jun', value: 30000 },
    ],
    timeline: [
      { date: '2022-01-01', event: 'Launched new website' },
      { date: '2022-03-15', event: 'Reached 1M sales' },
      { date: '2022-05-30', event: 'Introduced new product line' },
    ],
  },
  {
    id: 6,
    name: "Food & Beverage Co.",
    currentValue: 8000,
    roiPercentage: 5,
    recentPerformance: "-2% last month",
    image: foodBeverage,
    description: "Delivering quality food products to consumers.",
    totalGains: 200,
    activeTrades: 2,
    performanceData: [
      { name: 'Jan', value: 7000 },
      { name: 'Feb', value: 7200 },
      { name: 'Mar', value: 7500 },
      { name: 'Apr', value: 7800 },
      { name: 'May', value: 8000 },
      { name: 'Jun', value: 7900 },
    ],
    timeline: [
      { date: '2022-01-20', event: 'Opened new restaurant' },
      { date: '2022-04-05', event: 'Launched new product line' },
      { date: '2022-05-25', event: 'Faced supply chain issues' },
    ],
  },
];

const ActiveInvestments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInvestments, setFilteredInvestments] = useState(investmentsData);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Filter investments based on search term
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredInvestments(
      investmentsData.filter(investment => 
        investment.name.toLowerCase().includes(term)
      )
    );
  };

  // Open modal for selected investment
  const openModal = (investment) => {
    setSelectedInvestment(investment);
    setIsOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsOpen(false);
    setSelectedInvestment(null);
  };

  return (
    <Card boxShadow="lg" overflow="hidden">
      <Box p={4}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Active Investments
        </Text>
        <Input 
          placeholder="Search investments..."
          value={searchTerm}
          onChange={handleSearch}
          mb={4}
        />
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {filteredInvestments.map(investment => (
            <Card key={investment.id} p={4} boxShadow="lg" borderRadius="md" overflow="hidden">
              <Image
                src={investment.image}
                alt={investment.name}
                borderRadius="md"
                width="720px"
                height="350px" // Fixed height for consistency
              />
              <Box mt={3}>
                <Text fontWeight="bold" fontSize="lg">
                  {investment.name}
                </Text>
                <Text color="gray.500">Current Value: ${investment.currentValue.toLocaleString()}</Text>
                <Text color="green.500" fontWeight="bold">
                  ROI: {investment.roiPercentage}% 
                  <Badge ml={2} colorScheme={investment.roiPercentage >= 0 ? 'green' : 'red'}>
                    {investment.roiPercentage >= 0 ? 'Profitable' : 'Loss'}
                  </Badge>
                </Text>
                <Text color="gray.400">Recent Performance: {investment.recentPerformance}</Text>
                <Button mt={3} onClick={() => openModal(investment)}>View Details</Button>
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      </Box>

      {/* Modal for Investment Details */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedInvestment?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedInvestment && (
              <Stack spacing={4}>
                <Text>{selectedInvestment.description}</Text>
                <Text fontWeight="bold">Current Value: ${selectedInvestment.currentValue.toLocaleString()}</Text>
                <Text color="green.500" fontWeight="bold">Total Gains: ${selectedInvestment.totalGains}</Text>
                <Text color="orange.500" fontWeight="bold">Active Trades: {selectedInvestment.activeTrades}</Text>
                <Text color="gray.400">Recent Performance: {selectedInvestment.recentPerformance}</Text>
                
                {/* Performance Chart */}
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={selectedInvestment.performanceData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>

                {/* Investment Timeline */}
                <Box>
                  <Text fontWeight="bold">Investment Timeline:</Text>
                  <ul>
                    {selectedInvestment.timeline.map((event, index) => (
                      <li key={index}>
                        <Text color="gray.500">{event.date}: {event.event}</Text>
                      </li>
                    ))}
                  </ul>
                </Box>
              </Stack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default ActiveInvestments;

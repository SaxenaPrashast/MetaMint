import React, { useState, useEffect } from 'react';
import Card  from "components/card/Card"; // Adjust the path as necessary
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
import { Box, Text, Spinner, Select, Flex, Button, Input, useToast } from '@chakra-ui/react';
import { saveAs } from 'file-saver'; // Library to save files on client side

// Sample data for different timeframes
const dataSets = {
  weekly: [
    { name: 'Mon', gain: 200, loss: 50, assetA: 150, assetB: 100 },
    { name: 'Tue', gain: 300, loss: 70, assetA: 200, assetB: 150 },
    { name: 'Wed', gain: 150, loss: 30, assetA: 120, assetB: 80 },
    { name: 'Thu', gain: 400, loss: 120, assetA: 250, assetB: 200 },
    { name: 'Fri', gain: 350, loss: 90, assetA: 220, assetB: 160 },
    { name: 'Sat', gain: 600, loss: 200, assetA: 400, assetB: 300 },
    { name: 'Sun', gain: 500, loss: 100, assetA: 350, assetB: 250 },
  ],
  monthly: [
    { name: 'Jan', gain: 4000, loss: 2400, assetA: 3000, assetB: 1000 },
    { name: 'Feb', gain: 3000, loss: 1398, assetA: 2500, assetB: 1000 },
    { name: 'Mar', gain: 2000, loss: 9800, assetA: 1000, assetB: 2000 },
    { name: 'Apr', gain: 2780, loss: 3908, assetA: 2100, assetB: 700 },
    { name: 'May', gain: 1890, loss: 4800, assetA: 1500, assetB: 500 },
    { name: 'Jun', gain: 2390, loss: 3800, assetA: 2200, assetB: 1900 },
    { name: 'Jul', gain: 3490, loss: 4300, assetA: 2700, assetB: 2100 },
  ],
  yearly: [
    { name: '2021', gain: 50000, loss: 15000, assetA: 30000, assetB: 20000 },
    { name: '2022', gain: 40000, loss: 12000, assetA: 20000, assetB: 10000 },
    { name: '2023', gain: 60000, loss: 30000, assetA: 40000, assetB: 25000 },
    { name: '2024', gain: 70000, loss: 20000, assetA: 45000, assetB: 35000 },
  ],
};

const PerformanceChart = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [timeframe, setTimeframe] = useState('monthly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const toast = useToast();

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setChartData(dataSets[timeframe]);
      setLoading(false);
    }, 1000);
  }, [timeframe]);

  // Function to export chart data as CSV
  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + chartData.map(e => `${e.name},${e.gain},${e.loss}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    saveAs(encodedUri, `${timeframe}_performance_data.csv`);
    toast({
      title: "Data Exported",
      description: "Your data has been exported as CSV.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Tooltip function for customized tooltip rendering
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box bg="white" p={2} borderRadius="md" boxShadow="md">
          <Text fontWeight="bold">{label}</Text>
          <Text>Gain: ${payload[0].value}</Text>
          <Text>Loss: ${payload[1].value}</Text>
          <Text>
            Change: {(((payload[0].value - payload[1].value) / payload[1].value) * 100).toFixed(2)}%
          </Text>
        </Box>
      );
    }
    return null;
  };

  return (
    <Card boxShadow="lg" height="580px" >
      <Box p={4}>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Portfolio Performance
        </Text>
        
        <Flex mb={4} alignItems="center">
          <Text mr={2}>Select Timeframe:</Text>
          <Select
            value={timeframe}
            onChange={(e) => {
              setLoading(true);
              setTimeframe(e.target.value);
            }}
          >
            <option value="weekly">Last Week</option>
            <option value="monthly">Last Month</option>
            <option value="yearly">Last Year</option>
          </Select>
        </Flex>

        <Flex mb={4} alignItems="center">
          <Text mr={2}>Start Date:</Text>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            mr={4}
          />
          <Text mr={2}>End Date:</Text>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Flex>
        <Button colorScheme="blue" onClick={exportData} mb={4}>
          Export Data
        </Button>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <Spinner size="xl" />
          </Box>
        ) : chartData.length === 0 ? (
          <Text>No data available for the selected period.</Text>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="gain" stroke="#82ca9d" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="loss" stroke="#ff7300" strokeWidth={2} />
              <Line type="monotone" dataKey="assetA" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="assetB" stroke="#ffc658" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Card>
  );
};

export default PerformanceChart;

// Chakra imports
import { Box, Select, Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";

// Recharts imports
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Card from "components/card/Card";

// Sample data for businesses
const data = {
  techInnovations: {
    week: [
      { date: "Mon", value: 3000 },
      { date: "Tue", value: 3200 },
      { date: "Wed", value: 3400 },
      { date: "Thu", value: 3600 },
      { date: "Fri", value: 3800 },
      { date: "Sat", value: 4000 },
      { date: "Sun", value: 4200 },
    ],
    month: [
      { date: "Week 1", value: 15000 },
      { date: "Week 2", value: 16000 },
      { date: "Week 3", value: 17000 },
      { date: "Week 4", value: 18000 },
    ],
    sixMonths: [
      { date: "Jan", value: 50000 },
      { date: "Feb", value: 52000 },
      { date: "Mar", value: 54000 },
      { date: "Apr", value: 56000 },
      { date: "May", value: 58000 },
      { date: "Jun", value: 60000 },
    ],
    year: [
      { date: "Jan", value: 600000 },
      { date: "Feb", value: 620000 },
      { date: "Mar", value: 640000 },
      { date: "Apr", value: 660000 },
      { date: "May", value: 680000 },
      { date: "Jun", value: 700000 },
      { date: "Jul", value: 720000 },
      { date: "Aug", value: 740000 },
      { date: "Sep", value: 760000 },
      { date: "Oct", value: 780000 },
      { date: "Nov", value: 800000 },
      { date: "Dec", value: 820000 },
    ],
  },
  healthCare: {
    week: [
      { date: "Mon", value: 2500 },
      { date: "Tue", value: 2600 },
      { date: "Wed", value: 2700 },
      { date: "Thu", value: 2800 },
      { date: "Fri", value: 2900 },
      { date: "Sat", value: 3000 },
      { date: "Sun", value: 3100 },
    ],
    month: [
      { date: "Week 1", value: 8000 },
      { date: "Week 2", value: 8500 },
      { date: "Week 3", value: 9000 },
      { date: "Week 4", value: 9500 },
    ],
    sixMonths: [
      { date: "Jan", value: 24000 },
      { date: "Feb", value: 25000 },
      { date: "Mar", value: 26000 },
      { date: "Apr", value: 27000 },
      { date: "May", value: 28000 },
      { date: "Jun", value: 29000 },
    ],
    year: [
      { date: "Jan", value: 300000 },
      { date: "Feb", value: 320000 },
      { date: "Mar", value: 340000 },
      { date: "Apr", value: 360000 },
      { date: "May", value: 380000 },
      { date: "Jun", value: 400000 },
      { date: "Jul", value: 420000 },
      { date: "Aug", value: 440000 },
      { date: "Sep", value: 460000 },
      { date: "Oct", value: 480000 },
      { date: "Nov", value: 500000 },
      { date: "Dec", value: 520000 },
    ],
  },
  financeInvestments: {
    week: [
      { date: "Mon", value: 3200 },
      { date: "Tue", value: 3300 },
      { date: "Wed", value: 3400 },
      { date: "Thu", value: 3500 },
      { date: "Fri", value: 3600 },
      { date: "Sat", value: 3700 },
      { date: "Sun", value: 3800 },
    ],
    month: [
      { date: "Week 1", value: 12000 },
      { date: "Week 2", value: 12500 },
      { date: "Week 3", value: 13000 },
      { date: "Week 4", value: 13500 },
    ],
    sixMonths: [
      { date: "Jan", value: 48000 },
      { date: "Feb", value: 49000 },
      { date: "Mar", value: 50000 },
      { date: "Apr", value: 51000 },
      { date: "May", value: 52000 },
      { date: "Jun", value: 53000 },
    ],
    year: [
      { date: "Jan", value: 720000 },
      { date: "Feb", value: 740000 },
      { date: "Mar", value: 760000 },
      { date: "Apr", value: 780000 },
      { date: "May", value: 800000 },
      { date: "Jun", value: 820000 },
      { date: "Jul", value: 840000 },
      { date: "Aug", value: 860000 },
      { date: "Sep", value: 880000 },
      { date: "Oct", value: 900000 },
      { date: "Nov", value: 920000 },
      { date: "Dec", value: 940000 },
    ],
  },
  ecommerce: {
    week: [
      { date: "Mon", value: 2800 },
      { date: "Tue", value: 2900 },
      { date: "Wed", value: 3000 },
      { date: "Thu", value: 3100 },
      { date: "Fri", value: 3200 },
      { date: "Sat", value: 3300 },
      { date: "Sun", value: 3400 },
    ],
    month: [
      { date: "Week 1", value: 13000 },
      { date: "Week 2", value: 14000 },
      { date: "Week 3", value: 15000 },
      { date: "Week 4", value: 16000 },
    ],
    sixMonths: [
      { date: "Jan", value: 55000 },
      { date: "Feb", value: 56000 },
      { date: "Mar", value: 57000 },
      { date: "Apr", value: 58000 },
      { date: "May", value: 59000 },
      { date: "Jun", value: 60000 },
    ],
    year: [
      { date: "Jan", value: 850000 },
      { date: "Feb", value: 860000 },
      { date: "Mar", value: 870000 },
      { date: "Apr", value: 880000 },
      { date: "May", value: 890000 },
      { date: "Jun", value: 900000 },
      { date: "Jul", value: 910000 },
      { date: "Aug", value: 920000 },
      { date: "Sep", value: 930000 },
      { date: "Oct", value: 940000 },
      { date: "Nov", value: 950000 },
      { date: "Dec", value: 960000 },
    ],
  },
  foodBeverage: {
    week: [
      { date: "Mon", value: 2900 },
      { date: "Tue", value: 2950 },
      { date: "Wed", value: 3000 },
      { date: "Thu", value: 3050 },
      { date: "Fri", value: 3100 },
      { date: "Sat", value: 3150 },
      { date: "Sun", value: 3200 },
    ],
    month: [
      { date: "Week 1", value: 11000 },
      { date: "Week 2", value: 11500 },
      { date: "Week 3", value: 12000 },
      { date: "Week 4", value: 12500 },
    ],
    sixMonths: [
      { date: "Jan", value: 42000 },
      { date: "Feb", value: 43000 },
      { date: "Mar", value: 44000 },
      { date: "Apr", value: 45000 },
      { date: "May", value: 46000 },
      { date: "Jun", value: 47000 },
    ],
    year: [
      { date: "Jan", value: 600000 },
      { date: "Feb", value: 610000 },
      { date: "Mar", value: 620000 },
      { date: "Apr", value: 630000 },
      { date: "May", value: 640000 },
      { date: "Jun", value: 650000 },
      { date: "Jul", value: 660000 },
      { date: "Aug", value: 670000 },
      { date: "Sep", value: 680000 },
      { date: "Oct", value: 690000 },
      { date: "Nov", value: 700000 },
      { date: "Dec", value: 710000 },
    ],
  },
};

const PerformanceChart = () => {
  const [selectedBusiness, setSelectedBusiness] = useState("techInnovations");
  const [timeFrame, setTimeFrame] = useState("week");

  const handleBusinessChange = (event) => {
    setSelectedBusiness(event.target.value);
  };

  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.value);
  };

  const renderTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Tooltip label={`Value: ${payload[0].value}`} aria-label="Business Details">
          <Box p={2} color="white" backgroundColor="teal.500" borderRadius="md">
            Value: {payload[0].value}
          </Box>
        </Tooltip>
      );
    }
    return null;
  };

  // Define colors for each business
  const colorMap = {
    techInnovations: "#8884d8",
    healthCare: "#82ca9d",
    financeInvestments: "#ffc658",
    ecommerce: "#ff7300",
    foodBeverage: "#ff0055",
  };

  return (
    <Card mt={3} height="570px" boxShadow="lg">
    <Box >
      <Select value={selectedBusiness} onChange={handleBusinessChange}>
        <option value="techInnovations">Tech Innovations</option>
        <option value="healthCare">Health Care</option>
        <option value="financeInvestments">Finance & Investments</option>
        <option value="ecommerce">E-commerce</option>
        <option value="foodBeverage">Food & Beverage</option>
      </Select>
      <Select value={timeFrame} onChange={handleTimeFrameChange}>
        <option value="week">Week</option>
        <option value="month">Month</option>
        <option value="sixMonths">6 Months</option>
        <option value="year">Year</option>
      </Select>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data[selectedBusiness][timeFrame]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <RechartsTooltip content={renderTooltip} />
          <Legend />
          <Line type="monotone" dataKey="value" stroke={colorMap[selectedBusiness]} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
    </Card>

  );
};

export default PerformanceChart;

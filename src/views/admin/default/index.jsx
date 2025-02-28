import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  Image,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import usdIcon from "assets/img/icons/usd.png"; 
import btcIcon from "assets/img/icons/btc.jpg"; 
import ethIcon from "assets/img/icons/eth.png"; 
import usdtIcon from "assets/img/icons/usdt.png";  
import pyusdIcon from "assets/img/icons/pyusd.png";
import MiniStatistics from "components/card/MiniStatistics";
import React, { useState } from 'react';
import {
  MdAddTask,
  MdAttachMoney,
  MdShowChart,
  MdAccountBalance,
} from "react-icons/md";
import UserActivityFeed from "views/admin/default/components/UserActivityFeed";
import MarketOverview from "views/admin/default/components/MarketOverview";
import QuickTradeOptions from "views/admin/default/components/QuickTradeOptions";
import PerformanceChart from "views/admin/default/components/PerformanceChart";
import ActiveInvestments from "views/admin/default/components/ActiveInvestments";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

    const totalInvestmentValue = {
      usd: 350.4,
      btc: 0.012, // Example BTC value
      eth: 0.5,   // Example ETH value
      usdt: 642.39,
      pyusd: 100.0 // Example PYUSD value
    };
  
    const gainsLosses = '+23%'; // Example gains/losses value
    const activeInvestments = 5; // Example active investments count
    const numberOfTrades = 10; // Example trades count
  // State to manage selected currency
  const [selectedCurrency, setSelectedCurrency] = useState('usd');

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  // Function to get the displayed value based on the selected currency
  const getDisplayedValue = () => {
    switch (selectedCurrency) {
      case 'btc':
        return `${totalInvestmentValue.btc.toFixed(4)} BTC`;
      case 'eth':
        return `${totalInvestmentValue.eth.toFixed(4)} ETH`;
      case 'usdt':
        return `$${totalInvestmentValue.usdt.toFixed(2)}`;
      case 'pyusd':
        return `$${totalInvestmentValue.pyusd.toFixed(2)}`;
      default:
        return `$${totalInvestmentValue.usd.toFixed(2)}`;
    }
  };
  const getCurrencyIcon = () => {
    switch (selectedCurrency) {
      case 'btc':
        return btcIcon;
      case 'eth':
        return ethIcon;
      case 'usdt':
        return usdtIcon;
      case 'pyusd':
        return pyusdIcon;
      default:
        return usdIcon;
    }
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Select placeholder="Select Currency" mb='20px' onChange={handleCurrencyChange}>
        <option value="usd">USD</option>
        <option value="btc">BTC</option>
        <option value="eth">ETH</option>
        <option value="usdt">USDT</option>
        <option value="pyusd">PYUSD</option>
      </Select>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, "2xl": 2 }} gap='20px' mb='20px'>
      <MiniStatistics
          startContent={
            <Box w='56px' h='56px' display='flex' alignItems='center' justifyContent='center'>
              <Image src={getCurrencyIcon()} alt={`${selectedCurrency} icon`} boxSize='62px' />
            </Box>
          }
          name='Total Value'
          value={getDisplayedValue()} // Display value based on selected currency
        />
 <MiniStatistics
        startContent={
          <Box w='56px' h='56px' display='flex' alignItems='center' justifyContent='center'>
            <Icon w='32px' h='32px' as={MdShowChart} color='gray.700' /> {/* Icon for Gains/Losses */}
          </Box>
        }
        name='Gains/Losses'
        value={gainsLosses}
      />
      <MiniStatistics
        startContent={
          <Box w='56px' h='56px' display='flex' alignItems='center' justifyContent='center'>
            <Icon w='32px' h='32px' as={MdAttachMoney} color='gray.700' /> {/* Icon for Active Investments */}
          </Box>
        }
        name='Active Investments'
        value={activeInvestments}
      />
      <MiniStatistics
        startContent={
          <Box w='56px' h='56px' display='flex' alignItems='center' justifyContent='center'>
            <Icon w='32px' h='32px' as={MdAccountBalance} color='gray.700' /> {/* Icon for Number of Trades */}
          </Box>
        }
        name='Number of Trades'
        value={numberOfTrades}
      />
    </SimpleGrid>
    <SimpleGrid columns={{ base: 2, md: 2, xl: 2 }} gap='20px' mb='20px'>
  <Box> {/* First column for PerformanceChart */}
    <PerformanceChart />
    {/* Add MarketOverview directly below PerformanceChart */}
    <MarketOverview />
    <QuickTradeOptions />
  </Box>
  <Box> {/* Second column for ActiveInvestments */}
    <ActiveInvestments />
    <UserActivityFeed/>

  </Box>
</SimpleGrid>
    </Box>
  );
}

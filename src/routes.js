import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdDashboard,
  MdOutlineShoppingCart,
  MdHome,
  MdTrendingUp,
  MdAnalytics,
  MdForum,
  MdBusinessCenter,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import Portfolio from "views/admin/Portfolio";
import Marketplace from "views/admin/Marketplace";
import Investment from "views/admin/Investment";
import Analytics from "views/admin/Analytics";
import Discussion from "views/admin/Discussion";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdDashboard} width='20px' height='20px' color='inherit' />,  // Dashboard icon
    component: MainDashboard,
  },
  {
    name: "Portfolio",
    layout: "/admin",
    icon: <Icon as={MdBusinessCenter} width='20px' height='20px' color='inherit' />, // Business icon for portfolio
    path: "/Portfolio",
    component: Portfolio,
  },
  {
    name: "Marketplace",
    layout: "/admin",
    icon: <Icon as={MdOutlineShoppingCart} width='20px' height='20px' color='inherit' />, // Shopping cart for marketplace
    path: "/Marketplace",
    component: Marketplace,
  },
  {
    name: "Trading",
    layout: "/admin",
    icon: <Icon as={MdTrendingUp} width='20px' height='20px' color='inherit' />, // Trending up for trading
    path: "/Investment",
    component: Investment,
  },
  {
    name: "Analytics",
    layout: "/admin",
    icon: <Icon as={MdAnalytics} width='20px' height='20px' color='inherit' />, // Analytics icon
    path: "/Analytics",
    component: Analytics,
  },
  {
    name: "Forum",
    layout: "/admin",
    icon: <Icon as={MdForum} width='20px' height='20px' color='inherit' />, // Forum icon
    path: "/Discussion",
    component: Discussion,
  },
];

export default routes;

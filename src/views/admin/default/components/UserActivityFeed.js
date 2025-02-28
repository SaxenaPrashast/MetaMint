import React from 'react';
import {
  Box,
  Text,
  List,
  ListItem,
  HStack,
  Divider,
  Avatar,
  VStack,
  SimpleGrid,
} from '@chakra-ui/react';
import Card from "components/card/Card";

// Sample data for user activities
const recentTransactions = [
  { id: 1, title: "Bought BTC", description: "Bought 0.5 BTC for $15,000", date: "2 hours ago" },
  { id: 2, title: "Sold ETH", description: "Sold 1.2 ETH for $4,800", date: "5 hours ago" },
  { id: 3, title: "Purchased PYUSD", description: "Bought 200 PYUSD for $200", date: "1 day ago" },
];

const socialInteractions = [
  { 
    id: 1, 
    user: "John Doe", 
    action: "commented on your investment in Tech Innovations Inc.", 
    date: "3 hours ago", 
    avatar: "https://bit.ly/dan-abramov" 
  },
  { 
    id: 2, 
    user: "Jane Smith", 
    action: "liked your trade of BTC", 
    date: "8 hours ago", 
    avatar: "https://bit.ly/code-beast" 
  },
  { 
    id: 3, 
    user: "Chris Brown", 
    action: "started following you", 
    date: "1 day ago", 
    avatar: "https://bit.ly/prosper-baba" 
  },
];

const UserActivityFeed = () => {
  return (
    <Card mt={2} boxShadow="lg" p={4} h="380px" overflowY="auto">
      <Text fontSize="xl" fontWeight="bold" mb={3}>
        User Activity Feed
      </Text>

      <SimpleGrid spacing={4}>
        {/* Recent Transactions Section */}
        <Box>
          <Text fontSize="md" fontWeight="semibold" mb={2}>
            Recent Transactions
          </Text>
          <List spacing={2}>
            {recentTransactions.map(transaction => (
              <ListItem key={transaction.id}>
                <VStack align="flex-start" spacing={1}>
                  <Text fontWeight="bold" fontSize="sm">{transaction.title}</Text>
                  <Text fontSize="xs" color="gray.500">{transaction.description}</Text>
                  <Text fontSize="xs" color="gray.400">{transaction.date}</Text>
                </VStack>
                <Divider my={2} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Social Interaction Section */}
        <Box>
          <Text fontSize="md" fontWeight="semibold" mb={2}>
            Social Interactions
          </Text>
          <List spacing={2}>
            {socialInteractions.map(interaction => (
              <ListItem key={interaction.id}>
                <HStack align="center" spacing={2}>
                  <Avatar src={interaction.avatar} size="xs" />
                  <VStack align="flex-start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">{interaction.user}</Text>
                    <Text fontSize="xs" color="gray.500">{interaction.action}</Text>
                    <Text fontSize="xs" color="gray.400">{interaction.date}</Text>
                  </VStack>
                </HStack>
                <Divider my={2} />
              </ListItem>
            ))}
          </List>
        </Box>
      </SimpleGrid>
    </Card>
  );
};

export default UserActivityFeed;

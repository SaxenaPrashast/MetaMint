// Chakra imports
import {
  Box,
  Text,
  Image,
  List,
  ListItem,
  Button,
  Link,
  Flex,
  Spacer,
  HStack,
  Tooltip,
  Badge,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Grid,
  GridItem,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useState } from "react";

// Import images for each business
import techInnovations from "assets/img/investments/techinnovations.png";
import greenEnergy from "assets/img/investments/greenEnergy.png";
import healthCare from "assets/img/investments/healthCare.png";
import financeInvestments from "assets/img/investments/financeInvestments.png";
import ecommerce from "assets/img/investments/ecommerce.png";
import foodBeverage from "assets/img/investments/foodBeverage.png";

// Complete sample data for assets of each business
const assetData = {
  1: {
    name: "Tech Innovations Inc.",
    assets: [
      { type: "Vehicles", value: "$15,000" },
      { type: "Office Space", value: "$120,000", address: "456 Innovation Dr, Silicon Valley" },
      { type: "IT Equipment", value: "$30,000" },
      { type: "Patent Portfolio", value: "$220,000" },
    ],
    totalMarketValue: "$385,000",
  },
  2: {
    name: "Green Energy Solutions",
    assets: [
      { type: "Renewable Facilities", value: "$180,000", address: "123 Green Ave, Eco City" },
      { type: "Machinery", value: "$70,000" },
      { type: "Energy Storage Systems", value: "$45,000" },
    ],
    totalMarketValue: "$318,000",
  },
  3: {
    name: "Health Care Services",
    assets: [
      { type: "Medical Equipment", value: "$120,000" },
      { type: "Clinic Property", value: "$200,000", address: "789 Care Blvd, Healthtown" },
      { type: "Vehicles", value: "$30,000" },
    ],
    totalMarketValue: "$220,000",
  },
  4: {
    name: "Finance & Investments LLC",
    assets: [
      { type: "Office Building", value: "$250,000", address: "321 Finance St, Downtown" },
      { type: "Investment Vehicles", value: "$300,000" },
      { type: "Technology Systems", value: "$40,000" },
    ],
    totalMarketValue: "$680,000",
  },
  5: {
    name: "E-commerce Ventures",
    assets: [
      { type: "Warehouse", value: "$200,000", address: "456 Online Way, Commerce City" },
      { type: "Vehicles", value: "$20,000" },
      { type: "IT Systems", value: "$40,000" },
      { type: "Inventory", value: "$100,000" },
    ],
    totalMarketValue: "$360,000",
  },
  6: {
    name: "Food & Beverage Co.",
    assets: [
      { type: "Factory", value: "$300,000", address: "789 Flavor Rd, Tasty Town" },
      { type: "Machinery", value: "$50,000" },
      { type: "Delivery Vehicles", value: "$40,000" },
      { type: "Inventory", value: "$30,000" },
    ],
    totalMarketValue: "$420,000",
  },
};

// Sample business data
const businessData = [
  {
    id: 1,
    name: "Tech Innovations Inc.",
    image: techInnovations,
    currentValue: "$385,000",
    purchasePrice: "$320,000",
    roi: "20%",
    recentActivity: "Purchased on 01/10/2023",
    description: "Leading company in the technology innovation sector.",
  },
  {
    id: 2,
    name: "Green Energy Solutions",
    image: greenEnergy,
    currentValue: "$318,000",
    purchasePrice: "$250,000",
    roi: "27%",
    recentActivity: "Invested on 02/11/2023",
    description: "Focused on renewable energy and sustainability projects.",
  },
  {
    id: 3,
    name: "Health Care Services",
    image: healthCare,
    currentValue: "$220,000",
    purchasePrice: "$200,000",
    roi: "10%",
    recentActivity: "Acquired on 03/15/2023",
    description: "Healthcare provider with a strong focus on community care.",
  },
  {
    id: 4,
    name: "Finance & Investments LLC",
    image: financeInvestments,
    currentValue: "$680,000",
    purchasePrice: "$600,000",
    roi: "13%",
    recentActivity: "Investment on 04/20/2023",
    description: "Finance firm with diversified investment portfolios.",
  },
  {
    id: 5,
    name: "E-commerce Ventures",
    image: ecommerce,
    currentValue: "$360,000",
    purchasePrice: "$290,000",
    roi: "24%",
    recentActivity: "Purchased on 05/12/2023",
    description: "E-commerce platform with a global customer base.",
  },
  {
    id: 6,
    name: "Food & Beverage Co.",
    image: foodBeverage,
    currentValue: "$420,000",
    purchasePrice: "$360,000",
    roi: "17%",
    recentActivity: "Invested on 06/18/2023",
    description: "Manufacturer and distributor of popular food products.",
  },
];

const BusinessListings = () => {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [sellPrice, setSellPrice] = useState("");
  const [feedback, setFeedback] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: detailsOpen, onOpen: openDetails, onClose: closeDetails } = useDisclosure();
  const { isOpen: editOpen, onOpen: openEdit, onClose: closeEdit } = useDisclosure();

  const handleSellBusiness = (business) => {
    setSelectedBusiness(business);
    setSellPrice(business.currentValue);
    onOpen();
  };

  const confirmSellBusiness = () => {
    alert(`"${selectedBusiness.name}" listed for sale at ${sellPrice}`);
    setFeedback(`Successfully listed "${selectedBusiness.name}" for sale at ${sellPrice}`);
    onClose();
  };

  const openBusinessDetails = (business) => {
    setSelectedBusiness(business);
    openDetails();
  };

  const handleEditBusiness = () => {
    // This could be expanded to handle more detailed editing
    alert(`Editing details for ${selectedBusiness.name}`);
    closeEdit();
  };

  return (
    <Card>

    <Box p={5}>
      <Text fontSize="2xl" mb={5}>Business Listings</Text>
      {feedback && (
        <Alert status="success" mb={4}>
          <AlertIcon />
          <AlertTitle mr={2}>Success!</AlertTitle>
          <AlertDescription>{feedback}</AlertDescription>
        </Alert>
      )}
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {businessData.map((business) => (
          <GridItem key={business.id}>
            <Card boxShadow="lg">
              <Flex direction="column" align="center">
                <Image src={business.image} alt={business.name} boxSize="150px" borderRadius="md" mb={4} />
                <Text fontWeight="bold">{business.name}</Text>
                <Text>Current Value: {business.currentValue}</Text>
                <Text>Purchase Price: {business.purchasePrice}</Text>
                <Text>
                  ROI: <Badge colorScheme={parseFloat(business.roi) > 20 ? "green" : "yellow"}>{business.roi}</Badge>
                </Text>
                <HStack mt={4}>
                  <Button colorScheme="blue" size="sm" onClick={() => openBusinessDetails(business)}>
                    View Details
                  </Button>
                  <Button colorScheme="orange" size="sm" onClick={() => handleSellBusiness(business)}>
                    Sell
                  </Button>
                  <Button colorScheme="teal" size="sm" onClick={() => {
                    setSelectedBusiness(business);
                    openEdit();
                  }}>
                    Edit
                  </Button>
                </HStack>
              </Flex>
            </Card>
          </GridItem>
        ))}
      </Grid>

      {/* Sell Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sell {selectedBusiness?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedBusiness && (
              <>
                <Text mb={3}>Total Market Value: {selectedBusiness.currentValue}</Text>
                <Text mb={3}>Set Your Sale Price:</Text>
                <Input
                  type="number"
                  placeholder="Sale Price"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                  mb={3}
                />
                <Text fontSize="sm" color="gray.500">
                  (Market Value: {selectedBusiness.currentValue})
                </Text>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={confirmSellBusiness}>
              Confirm Sale
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Details Modal */}
      <Modal isOpen={detailsOpen} onClose={closeDetails}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedBusiness?.name} Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedBusiness && (
              <>
                <Text mb={3}>{selectedBusiness.description}</Text>
                <Divider my={3} />
                <Text><strong>Current Value:</strong> {selectedBusiness.currentValue}</Text>
                <Text><strong>Purchase Price:</strong> {selectedBusiness.purchasePrice}</Text>
                <Text><strong>ROI:</strong> {selectedBusiness.roi}</Text>
                <Text><strong>Recent Activity:</strong> {selectedBusiness.recentActivity}</Text>
                <Divider my={3} />
                <Text fontWeight="bold">Assets:</Text>
                <List spacing={2}>
                  {assetData[selectedBusiness.id].assets.map((asset, index) => (
                    <ListItem key={index}>
                      {asset.type}: {asset.value} {asset.address && ` (Address: ${asset.address})`}
                    </ListItem>
                  ))}
                </List>
                <Text fontWeight="bold">Total Market Value: {assetData[selectedBusiness.id].totalMarketValue}</Text>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={closeDetails}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={editOpen} onClose={closeEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Business Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedBusiness && (
              <>
                <Text fontWeight="bold">{selectedBusiness.name}</Text>
                <Text mb={3}>Current Value: {selectedBusiness.currentValue}</Text>
                <Text mb={3}>Edit Purchase Price:</Text>
                <Input
                  type="number"
                  placeholder="Purchase Price"
                  value={selectedBusiness.purchasePrice}
                  onChange={(e) => {
                    // Here you would implement a way to update the purchase price
                    alert(`Edit purchase price for ${selectedBusiness.name}`);
                  }}
                  mb={3}
                />
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleEditBusiness}>
              Save Changes
            </Button>
            <Button variant="ghost" onClick={closeEdit}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
    </Card>

  );
};

export default BusinessListings;

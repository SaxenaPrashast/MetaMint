// Chakra imports
import {
  Box,
  Heading,
  SimpleGrid,
  Input,
  Button,
  Stack,
  Select,
  Image,
  Text,
  Divider,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Card from "components/card/Card";

// Sample images for featured listings
import techImage from "assets/img/investments/tech.png";
import retailImage from "assets/img/investments/retail.png";
import healthImage from "assets/img/investments/health.png";
import financeImage from "assets/img/investments/finance.png";
import ecommerceImage from "assets/img/investments/ecommerce.png";
import foodImage from "assets/img/investments/foodBeverage.png";
import greenEnergyImage from "assets/img/investments/greenEnergy.png";
import tourismImage from "assets/img/investments/tourism.png";
import realEstateImage from "assets/img/investments/realEstate.png";
import appDevImage from "assets/img/investments/appDev.png";
import marketingImage from "assets/img/investments/marketing.png";
import constructionImage from "assets/img/investments/construction.png";
import fitnessImage from "assets/img/investments/fitness.png";
import consultingImage from "assets/img/investments/consulting.png";
import automotiveImage from "assets/img/investments/automotive.png";

const MarketplaceOverview = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [offers, setOffers] = useState({});
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [offerAmount, setOfferAmount] = useState("");
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  const categories = [
    "Technology", "Retail", "Services", "Health", "Finance", 
    "E-commerce", "Food & Beverage", "Green Energy", "Tourism", 
    "Real Estate", "App Development", "Marketing", "Construction", 
    "Fitness", "Consulting", "Automotive", "Agriculture", 
    "Entertainment", "Logistics", "Education", "Beauty", 
    "Cybersecurity", "Event Planning"
  ];

  const featuredListings = [
    // Sample business listings (same as before)
    { id: 1, name: "Tech Innovations", image: techImage, askingPrice: "$75,000", rating: 4.5, investmentOpportunity: "A leading company in tech innovation, focused on developing cutting-edge solutions.", recentActivity: "Listed 1 week ago", owner: "Tech Innovations Inc.", category: "Technology" },
    { id: 2, name: "Retail Store", image: retailImage, askingPrice: "$50,000", rating: 4.0, investmentOpportunity: "A well-established retail store with a loyal customer base.", recentActivity: "Sold 2 weeks ago", owner: "Retail Corp.", category: "Retail" },
    { id: 3, name: "Healthcare Services", image: healthImage, askingPrice: "$150,000", rating: 5.0, investmentOpportunity: "Healthcare provider focusing on patient care and community health.", recentActivity: "Listed 3 weeks ago", owner: "Health Services LLC", category: "Health" },
    { id: 4, name: "Finance Solutions", image: financeImage, askingPrice: "$120,000", rating: 4.8, investmentOpportunity: "Financial consulting firm with a strong reputation in the industry.", recentActivity: "Listed 5 days ago", owner: "Finance Solutions Inc.", category: "Finance" },
    { id: 5, name: "E-commerce Business", image: ecommerceImage, askingPrice: "$30,000", rating: 4.2, investmentOpportunity: "An online retail business with a growing customer base.", recentActivity: "Listed 2 days ago", owner: "E-commerce Ventures", category: "E-commerce" },
    { id: 6, name: "Food & Beverage Co.", image: foodImage, askingPrice: "$20,000", rating: 3.5, investmentOpportunity: "A local favorite serving delicious food and drinks.", recentActivity: "Listed 1 month ago", owner: "Food & Beverage Inc.", category: "Food & Beverage" },
    { id: 7, name: "Green Energy Solutions", image: greenEnergyImage, askingPrice: "$250,000", rating: 4.9, investmentOpportunity: "Innovative solutions for sustainable energy.", recentActivity: "Listed 4 days ago", owner: "Green Energy LLC", category: "Green Energy" },
    { id: 8, name: "Tourism Agency", image: tourismImage, askingPrice: "$40,000", rating: 4.3, investmentOpportunity: "Offering the best travel packages around the globe.", recentActivity: "Sold 1 week ago", owner: "Travel Agency Inc.", category: "Tourism" },
    { id: 9, name: "Real Estate Firm", image: realEstateImage, askingPrice: "$500,000", rating: 4.6, investmentOpportunity: "Specializing in residential and commercial real estate.", recentActivity: "Listed 1 month ago", owner: "Realty Experts", category: "Real Estate" },
    { id: 10, name: "App Development Studio", image: appDevImage, askingPrice: "$90,000", rating: 4.7, investmentOpportunity: "Creating innovative mobile applications for various industries.", recentActivity: "Listed 2 weeks ago", owner: "AppMasters Inc.", category: "App Development" },
    { id: 11, name: "Digital Marketing Agency", image: marketingImage, askingPrice: "$65,000", rating: 4.1, investmentOpportunity: "Providing comprehensive marketing strategies for businesses.", recentActivity: "Listed 3 weeks ago", owner: "MarketPro Agency", category: "Marketing" },
    { id: 12, name: "Construction Company", image: constructionImage, askingPrice: "$300,000", rating: 4.5, investmentOpportunity: "Expertise in commercial and residential construction.", recentActivity: "Listed 5 days ago", owner: "Construct Corp.", category: "Construction" },
    { id: 13, name: "Fitness Center", image: fitnessImage, askingPrice: "$150,000", rating: 4.0, investmentOpportunity: "Popular local gym with a loyal membership base.", recentActivity: "Listed 2 weeks ago", owner: "FitLife Gym", category: "Fitness" },
    { id: 14, name: "Consulting Firm", image: consultingImage, askingPrice: "$120,000", rating: 4.2, investmentOpportunity: "Business consulting services with proven results.", recentActivity: "Listed 1 week ago", owner: "Consulting Solutions", category: "Consulting" },
    { id: 15, name: "Automotive Shop", image: automotiveImage, askingPrice: "$80,000", rating: 4.3, investmentOpportunity: "Full-service automotive repair shop with high customer ratings.", recentActivity: "Listed 3 weeks ago", owner: "AutoCare Services", category: "Automotive" },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOfferOpen, onOpen: onOfferOpen, onClose: onOfferClose } = useDisclosure();

  const handleBuyNow = (business) => {
    setSelectedBusiness(business);
    onOfferOpen();
  };

  const handleOfferSubmit = () => {
    if (offerAmount) {
      const newOffer = {
        amount: offerAmount,
        status: "Pending",
      };
      setOffers((prevOffers) => ({
        ...prevOffers,
        [selectedBusiness.id]: newOffer,
      }));
      alert(`Your offer of ${offerAmount} has been submitted for ${selectedBusiness.name}`);
      setOfferAmount("");
      onOfferClose();
    } else {
      alert("Please enter a valid offer amount.");
    }
  };

  const handleAddToWatchlist = (business) => {
    alert(`${business.name} has been added to your watchlist!`);
  };

  const handleViewDetails = (business) => {
    setSelectedBusiness(business);
    onOpen();
  };

  // Filtered listings based on the selected category
  const filteredListings = selectedCategory 
    ? featuredListings.filter(listing => listing.category === selectedCategory)
    : featuredListings;

  const handleSendMessage = () => {
    if (message) {
      setChatMessages((prevMessages) => [...prevMessages, { text: message, from: "You" }]);
      setMessage("");
    }
  };

  return (
    <Box p={5}>
      <Heading mb={5}>Marketplace Overview</Heading>
      <Select placeholder="Select a category" mb={5} onChange={(e) => setSelectedCategory(e.target.value)}>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </Select>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {filteredListings.map((listing) => (
          <Card key={listing.id}>
            <Image src={listing.image} alt={listing.name} borderRadius="md" />
            <Text fontWeight="bold" fontSize="lg" mb={1} onClick={() => handleViewDetails(listing)} cursor="pointer">
              {listing.name}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Asking Price: {listing.askingPrice}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Owner’s Rating: {listing.rating} ⭐
            </Text>
            <Text fontSize="sm" color="gray.500">
              Investment Opportunity: {listing.investmentOpportunity}
            </Text>
            <Flex mt={3} justify="space-between">
              <Button colorScheme="green" onClick={() => handleBuyNow(listing)}>
                Buy Now
              </Button>
              <Button colorScheme="yellow" onClick={() => handleAddToWatchlist(listing)}>
                Add to Watchlist
              </Button>
            </Flex>
          </Card>
        ))}
      </SimpleGrid>

      {/* Offer Modal */}
      <Modal isOpen={isOfferOpen} onClose={onOfferClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Make an Offer for {selectedBusiness?.name}</ModalHeader>
          <ModalBody>
            <Input 
              placeholder="Enter your offer amount" 
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value)}
              mb={3}
            />
            <Text>Your Offer: {offers[selectedBusiness?.id]?.amount || "N/A"}</Text>
            <Text>Status: {offers[selectedBusiness?.id]?.status || "No Offer Yet"}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleOfferSubmit}>
              Submit Offer
            </Button>
            <Button onClick={onOfferClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for Business Details */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedBusiness?.name}</ModalHeader>
          <ModalBody>
            <Image src={selectedBusiness?.image} alt={selectedBusiness?.name} borderRadius="md" mb={4} />
            <Text><strong>Description:</strong> {selectedBusiness?.investmentOpportunity}</Text>
            <Text><strong>Owner:</strong> {selectedBusiness?.owner}</Text>
            <Text><strong>Asking Price:</strong> {selectedBusiness?.askingPrice}</Text>
            <Text><strong>Owner’s Rating:</strong> {selectedBusiness?.rating} ⭐</Text>
            <Text><strong>Recent Activity:</strong> {selectedBusiness?.recentActivity}</Text>
            <Divider my={4} />
            <Text fontWeight="bold" mb={2}>Chat with Seller:</Text>
            <Stack spacing={3}>
              {chatMessages.map((msg, index) => (
                <Text key={index} textAlign={msg.from === "You" ? "right" : "left"}>
                  <strong>{msg.from}:</strong> {msg.text}
                </Text>
              ))}
              <Textarea 
                placeholder="Type your message..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)} 
              />
              <Button colorScheme="blue" onClick={handleSendMessage}>
                Send
              </Button>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MarketplaceOverview;

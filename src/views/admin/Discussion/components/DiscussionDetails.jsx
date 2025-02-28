import React from "react";
import { Box, Text, Button, Flex, Avatar } from "@chakra-ui/react";

export default function DiscussionDetails({ discussion, closeDetails }) {
  return (
    <Box p={5} borderWidth="1px" borderRadius="lg" shadow="md">
      <Flex align="center" mb={4}>
        <Avatar size="md" name={discussion.user} src={discussion.avatar} mr={3} />
        <Box>
          <Text fontWeight="bold">{discussion.user}</Text>
          <Text fontSize="sm" color="gray.500">{discussion.date}</Text>
        </Box>
      </Flex>
      <Text fontSize="xl" fontWeight="bold" mb={3}>{discussion.title}</Text>
      <Text>{discussion.content}</Text>
      
      {/* Close Button */}
      <Button mt={4} colorScheme="red" onClick={closeDetails}>
        Back to Discussions
      </Button>
    </Box>
  );
}

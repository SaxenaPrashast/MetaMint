import React from "react";
import { Box, Text, Badge, Flex, Avatar, IconButton } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";

export default function DiscussionItem({ data, onSelect }) {
  return (
    <Box 
      p={4} 
      borderWidth="1px" 
      borderRadius="lg" 
      shadow="sm" 
      cursor="pointer"
      _hover={{ bg: "gray.100" }}
      onClick={onSelect}
    >
      <Flex align="center" mb={2}>
        <Avatar size="sm" name={data.user} src={data.avatar} mr={2} />
        <Text fontWeight="bold">{data.user}</Text>
        <Badge ml={2} colorScheme={data.status === "Open" ? "green" : "red"}>
          {data.status}
        </Badge>
      </Flex>
      <Text fontSize="lg" fontWeight="semibold">
        {data.title}
      </Text>
      <Text fontSize="sm" color="gray.500">
        {data.date} • {data.replies} replies
      </Text>
      <Flex mt={2} justify="space-between">
        <Text fontSize="sm" color="blue.500">
          View Discussion
        </Text>
        <IconButton size="sm" icon={<ChatIcon />} />
      </Flex>
    </Box>
  );
}

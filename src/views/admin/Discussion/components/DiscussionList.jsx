import React, { useState } from "react";
import { Box, VStack, Heading, Button } from "@chakra-ui/react";
import DiscussionItem from "./DiscussionItem";
import DiscussionDetails from "./DiscussionDetails";
import NewDiscussionForm from "./NewDiscussionForm";
import discussionData from "../variables/discussionData.json";

export default function DiscussionList() {
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [showNewForm, setShowNewForm] = useState(false);

  return (
    <Box p={5}>
      <Heading mb={4}>Discussion Board</Heading>
      
      {/* New Discussion Button */}
      <Button colorScheme="blue" onClick={() => setShowNewForm(true)} mb={4}>
        Start New Discussion
      </Button>

      {/* Show New Discussion Form */}
      {showNewForm && (
        <NewDiscussionForm closeForm={() => setShowNewForm(false)} />
      )}

      {/* Show Discussion Details if selected */}
      {selectedDiscussion ? (
        <DiscussionDetails 
          discussion={selectedDiscussion} 
          closeDetails={() => setSelectedDiscussion(null)} 
        />
      ) : (
        <VStack spacing={4} align="stretch">
          {discussionData.map((discussion) => (
            <DiscussionItem 
              key={discussion.id} 
              data={discussion} 
              onSelect={() => setSelectedDiscussion(discussion)} 
            />
          ))}
        </VStack>
      )}
    </Box>
  );
}

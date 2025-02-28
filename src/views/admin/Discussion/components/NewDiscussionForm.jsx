import React, { useState } from "react";
import { Box, Input, Textarea, Button } from "@chakra-ui/react";

export default function NewDiscussionForm({ closeForm }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("New discussion posted! (Functionality can be expanded)");
    closeForm();
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" shadow="md">
      <Input 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        mb={2}
      />
      <Textarea 
        placeholder="Start the discussion..." 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        mb={2}
      />
      <Button colorScheme="blue" onClick={handleSubmit} mr={2}>Post</Button>
      <Button colorScheme="red" onClick={closeForm}>Cancel</Button>
    </Box>
  );
}

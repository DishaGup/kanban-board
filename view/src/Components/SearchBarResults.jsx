import React from "react";
import { Box, List, ListItem, ListIcon } from "@chakra-ui/react";
import { FcInfo } from "react-icons/fc";

const SearchBarResults = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Box
      position="absolute"
      bg="white"
      zIndex="2"
      width="300px"
      right={2}
      top="50px"
      boxShadow="md"
      borderRadius="md"
      overflowY="scroll"
      maxH="10cm"
    >
      <List spacing={3} p={4}>
        {data.map((result, index) => (
          <ListItem key={index} fontWeight="bold">
            {result.board}
            {result.tasks.length > 0 && (
              <List ml={4}>
                {result.tasks.map((task, taskIndex) => (
                  <ListItem key={taskIndex}>{task}</ListItem>
                ))}
              </List>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SearchBarResults;

import React from "react";
import { Box, List, ListItem, ListIcon } from "@chakra-ui/react";
import { FcInfo } from "react-icons/fc";

const SearchBarResults = ({ board, task }) => {
  console.log(board, task);

  if (board == "" && task == "") {
    return <></>;
  }

  return (
    <>
      {board != "" && (
        <Box
          position="absolute"
          bg="white"
          zIndex="2"
          width="300px"
          right="10px"
          top="50px"
          boxShadow="md"
          borderRadius="md"
        >
          <List spacing={3} p={4}>
            <ListItem fontWeight="bold">{board}</ListItem>
            {task.length >= 1 &&
              task.map((el, index) => (
                <ListItem key={index} pl={4}>
                  <ListIcon as={FcInfo} color="blue.500" />
                  {el}
                </ListItem>
              ))}
          </List>
        </Box>
      )}
    </>
  );
};

export default SearchBarResults;

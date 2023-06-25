import React from "react";
import { Box, List, ListItem, ListIcon, OrderedList } from "@chakra-ui/react";
import { FcInfo } from "react-icons/fc";

const SearchBarResults = ({ data }) => {
  //console.log(data)
  if (!data) {
    return (
      <>
        <Box
          position="absolute"
          bg="white"
          zIndex="2"
          width="200px"
          right="10px"
          top="50px"
          boxShadow="md"
          borderRadius="md"
        >
          <List spacing={3} p={4}>
            <ListItem fontWeight="bold">
              <ListIcon as={FcInfo} color="blue.500" />
              No Results Found
            </ListItem>
          </List>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box
        position="absolute"
        bg="white"
        zIndex="2"
        width="300px"
        right="10px"
        top="50px"
        boxShadow="md"
        borderRadius="md"
        overflowY={"scroll"}
        maxH={"6cm"}
      >
        {" "}
        {data &&
          data.length >= 1 &&
          data.map((ele, index) => (
            <List spacing={3} p={4}>
              <ListItem fontWeight="bold">{ele.board}</ListItem>
              {ele.tasks.length >= 1 &&
                ele.tasks.map((el, index) => (
                  <List>
                    <ListItem key={index} pl={4}>
                      {el}
                    </ListItem>{" "}
                  </List>
                ))}
            </List>
          ))}
      </Box>
    </>
  );
};

export default SearchBarResults;

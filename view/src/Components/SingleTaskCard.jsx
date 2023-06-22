import { Box, VStack, Text } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import React from "react";

const SingleTaskCard = ({ title, description, subtasks }) => {
 

  return (
    <div>
      <Box p={3} border='1px solid green' m={3} borderRadius={'20px'} >
        <VStack>
          <Text>{title}</Text>
          <Text>{description}</Text>
      
          <Accordion allowToggle>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
        <Text> {subtasks.length} </Text>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    { subtasks && subtasks.map((subtask, index) => (
            <Text key={index}>{subtask.title}</Text>
          ))}
    </AccordionPanel>
  </AccordionItem>
</Accordion>
        
        </VStack>
      </Box>
    </div>
  );
};

export default SingleTaskCard;

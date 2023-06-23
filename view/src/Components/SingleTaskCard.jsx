import { Box, VStack, Text,Button, useDisclosure } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import React from "react";
import { FcCheckmark, FcReading ,FcPlus,FcFullTrash} from "react-icons/fc";
import AddSubtask from "./AddSubtask";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTaskFromBoard } from "../Redux/action";

const SingleTaskCard = ({ title, description, subtasks,_id }) => {

const {boardId} =useParams()
const dispatch=useDispatch()
const {token} =useSelector((store)=>store.reducer)
 const {onOpen,isOpen,onClose} =useDisclosure()
const handleUpdateStatusOfSubtask=()=>{


}

const handleTaskDelete=()=>{
dispatch(deleteTaskFromBoard(_id,token))
}

  return (
    <div>
      <Box p={3} border='1px solid green' m={3} borderRadius={'20px'} >
        <Button> <FcFullTrash onClick={handleTaskDelete}  />  </Button>
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
          <>    <Text key={index}>{subtask.title}</Text>
   <Button   onClick={handleUpdateStatusOfSubtask} >
                    {subtask.isCompleted ? (
                      <FcCheckmark boxsize={6} />
                    ) : (
                      <FcReading boxsize={6} />
                    )}
                  </Button>
          </>
          
         
          ))}
<Button> <FcPlus  onClick={onOpen}  /> </Button>

{
  isOpen && <AddSubtask isOpen={isOpen} onClose={onClose} onOpen={onOpen} taskId={_id} boardId={boardId}  />
}

    </AccordionPanel>
  </AccordionItem>
</Accordion>
        
        </VStack>
      </Box>
    </div>
  );
};

export default SingleTaskCard;

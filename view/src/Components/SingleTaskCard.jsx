import {
  Box,
  VStack,
  Text,
  Button,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon, List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,Tooltip
} from "@chakra-ui/react";
import React, { forwardRef, useEffect, useState } from "react";
import {
  FcCheckmark,
  FcReading,
  FcPlus,
  FcFullTrash,
  FcPositiveDynamic,
} from "react-icons/fc";
import AddSubtask from "./AddSubtask";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTaskFromBoard, updateTaskToDoing } from "../Redux/action";
import { Droppable } from "react-beautiful-dnd";
const SingleTaskCard = ({
  title,
  description,
  subtasks,
  _id,
  statuss,
  status,
}) => {
  const { boardId } = useParams();

  const [donetasklength, setdoneTasklength] = useState(0);
  const dispatch = useDispatch();
  const { token,TaskData } = useSelector((store) => store.reducer);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const handleUpdateStatusOfSubtask = () => {};

  const handleTaskDelete = () => {
    const defaultBoardId = TaskData[0]?._id;
    const passId = boardId || defaultBoardId;
    dispatch(deleteTaskFromBoard(_id, token,passId));
  };

  const findDonesubtask = () => {
    let donesubtaskfilter = subtasks.filter(
      (el, index) => el.isCompleted == true
    );
    setdoneTasklength(donesubtaskfilter.length);
  };

  useEffect(() => {
    findDonesubtask();
  }, []);

  const handleAddtoDoing = () => {
    const defaultBoardId = TaskData[0]?._id;
    const passId = boardId || defaultBoardId;
    let obj = { token, boardId:passId, taskId: _id };
    dispatch(updateTaskToDoing(obj));
  };

  return (
    <Box p={3} w={{ base:'280px',sm:'90%'}} position={"relative"} border="2px dashed green" borderRadius={'10px'} m={3} bg='white' cursor={'cursor'} >
      {statuss == true && status !== "Done" && (
        <Button
          position={"absolute"}
          _hover={{ bg: "0 0" }}
          left={0}
          top={0}
          zIndex={1}
          bg="0 0"
          outline={"0 0"}
          m="1"
          mb="8px"
          ml="5px"
          cursor={'pointer'}
        >
          {" "}
          <FcPositiveDynamic
            fontSize={"22px"}
            onClick={handleAddtoDoing}
          />{" "}
        </Button>
      )}

      <Button
        position={"absolute"}
        _hover={{ bg: "0 0" }}
        right={0}
        top={0}
        zIndex={1}
        bg="0 0"
        outline={"0 0"}
        m="1"
        mb="8px"
        mr="5px"
      
      >
        {" "}
        <FcFullTrash fontSize={"22px"} onClick={handleTaskDelete} />{" "}
      </Button>
      <VStack mt="18px">
        <Text fontSize="16px" fontWeight={"600"}>
          {title}
        </Text>
        <Text fontSize="13px" fontWeight={"400"}>
          {description}
        </Text>

        <Accordion allowToggle w="95%" m="auto">
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="center">
                  <Text>
                    {donetasklength} of {subtasks.length} subtask done{" "}
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} border="1px solid green" bg='green.100' >


            <OrderedList spacing={3}>


              {subtasks &&
                subtasks.map((subtask, index) => (
                  <>
                    {" "}
                    <ListItem key={index}>
                    <HStack align="center">
                      {" "}
                      <Text >{subtask.title}</Text>
                      <Button bg='0 0' _hover={{bg:'0 0'}} ouline='0 0' onClick={handleUpdateStatusOfSubtask}>
                        {subtask.isCompleted ? (
                          <FcCheckmark boxsize={7} />
                        ) : (
                          <FcReading boxsize={7} />
                        )}
                      </Button>{" "}
                    </HStack>
  </ListItem>
                 
                  </>
                ))}
                
                <Tooltip label="Add Subtask">
  <div>
    <Button fontSize="20px" bg="0 0" _hover={{ bg: '0 0' }} outline="0 0">
      <FcPlus onClick={onOpen} />
    </Button>
  
  </div>
</Tooltip>

              </OrderedList>
              {isOpen && (
                <AddSubtask
                  isOpen={isOpen}
                  onClose={onClose}
                  onOpen={onOpen}
                  taskId={_id}
                
                  boardId={boardId}
                />
              )}

            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    </Box>
  );
};

export default SingleTaskCard;

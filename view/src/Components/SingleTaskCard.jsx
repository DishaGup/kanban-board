import {
  Box,
  VStack,
  Text,
  Button,
  useDisclosure,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  ListIcon,
  OrderedList,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  FcCheckmark,
  FcReading,
  FcPlus,
  FcFullTrash,
  FcPositiveDynamic,
} from "react-icons/fc";
import AddSubtask from "./AddSubtask";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTaskFromBoard,
  updateSubTaskStatus,
  updateTaskToDoing,
} from "../Redux/action";
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

  const [doneTaskLength, setDoneTaskLength] = useState(0);
  const dispatch = useDispatch();
  const location = useLocation();
  const { token, TaskData, userDetails, SingleTaskData, loading, updateSubTaskStatus } = useSelector(
    (store) => store.reducer
  );
  const { onOpen, isOpen, onClose } = useDisclosure();

  const handleUpdateStatusOfSubtask = (subtaskId) => {
    const defaultBoardId = TaskData[0]?._id;
    const passId = boardId || defaultBoardId;
    let obj = {
      token,
      boardId: passId,
      taskId: _id,
      email: userDetails[0].email,
      subtaskId,
    };
    dispatch(updateSubTaskStatus(obj));
  };

  const handleTaskDelete = () => {
    const defaultBoardId = TaskData[0]?._id;
    const passId = boardId || defaultBoardId;
    let email = userDetails[0].email;
    dispatch(deleteTaskFromBoard(_id, token, passId, email));
  };

  const findDoneSubtask = () => {
    let doneSubtaskFilter = subtasks.filter((el, index) => el.isCompleted === true);
    setDoneTaskLength(doneSubtaskFilter.length);
  };

  useEffect(() => {
    findDoneSubtask();
  }, [updateSubTaskStatus]);

  const handleAddToDoing = () => {
    const defaultBoardId = TaskData[0]?._id;
    const passId = boardId || defaultBoardId;
    let obj = {
      token,
      boardId: passId,
      taskId: _id,
      email: userDetails[0].email,
    };
    dispatch(updateTaskToDoing(obj));
  };

  return (
    <Box
      p={3}
      w={{ base: "280px", sm: "90%" }}
      position="relative"
      border="2px dashed green"
      borderRadius="10px"
      m={3}
      bg="white"
      cursor="cursor"
    >
      {statuss && status !== "Done" && (
        <Button
          position="absolute"
          _hover={{ bg: "0 0" }}
          left={0}
          top={0}
          zIndex={1}
          bg="0 0"
          outline="0 0"
          m="1"
          mb="8px"
          ml="5px"
          cursor="pointer"
        >
          <FcPositiveDynamic fontSize="22px" onClick={handleAddToDoing} />
        </Button>
      )}

      <Button
        position="absolute"
        _hover={{ bg: "0 0" }}
        right={0}
        top={0}
        zIndex={1}
        bg="0 0"
        outline="0 0"
        m="1"
        mb="8px"
        mr="5px"
      >
        <FcFullTrash fontSize="22px" onClick={handleTaskDelete} />
      </Button>
      <VStack mt="18px">
        <Text fontSize="16px" fontWeight="600">
          {title}
        </Text>
        <Text fontSize="13px" fontWeight="400">
          {description}
        </Text>

        <Accordion allowToggle w="95%" m="auto">
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="center">
                  <Text>
                    {doneTaskLength} of {subtasks.length} subtask done{" "}
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} border="1px solid green" bg="green.100">
              <OrderedList spacing={3}>
                {subtasks.map((subtask) => (
                  <ListItem key={subtask._id}>
                    <HStack align="center">
                      <Text>{subtask.title}</Text>
                      <Button
                        bg="0 0"
                        _hover={{ bg: "0 0" }}
                        outline="0 0"
                        onClick={() => handleUpdateStatusOfSubtask(subtask._id)}
                      >
                        {subtask.isCompleted ? (
                          <FcCheckmark boxSize={7} />
                        ) : (
                          <FcReading boxSize={7} />
                        )}
                      </Button>
                    </HStack>
                  </ListItem>
                ))}
                <Tooltip label="Add Subtask">
                  <Button
                    fontSize="20px"
                    bg="0 0"
                    _hover={{ bg: "0 0" }}
                    outline="0 0"
                  >
                    <FcPlus onClick={onOpen} />
                  </Button>
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

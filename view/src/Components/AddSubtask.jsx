import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AddSubtaskToTask } from "../Redux/action";

const AddSubtask = ({ isOpen, onClose, taskId, boardId }) => {
  const [formError, setFormError] = useState(false);
  const [title, setTitle] = useState("");
  const toast = useToast();
  const { token, TaskData, userDetails } = useSelector((store) => store.reducer);
  const dispatch = useDispatch();

  const handleAddSubtask = (e) => {
    e.preventDefault();
    
    if (title.trim() === "") {
      setFormError(true);
      return;
    }

    const passId = boardId || TaskData[0]?._id;

    const data = {
      boardId: passId,
      taskId,
      title,
      token,
      isCompleted: false,
      email: userDetails[0].email,
    };

    dispatch(AddSubtaskToTask(data));
    setTitle("");
    onClose();
    setFormError(false);
  };

  return (
    <Modal
      size={["xs", "sm", "md"]}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Subtask</ModalHeader>
        <ModalBody pb={6}>
          <form onSubmit={handleAddSubtask}>
            <FormControl isRequired>
              <FormLabel>Task Name: </FormLabel>
              <Input
                type="text"
                placeholder="Type your task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            {formError && <p>Please fill out all the required fields.</p>}

            <HStack w="80%" m="auto" justify="space-between" mt="50px">
              <Button type="submit" colorScheme="green" mr={3}>
                Add SubTask
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </HStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddSubtask;

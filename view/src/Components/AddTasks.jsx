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
import { useParams } from "react-router-dom";
import { AddtaskToBoard } from "../Redux/action";

const AddTasks = ({ isOpen, onClose }) => {
  const { boardId } = useParams();
  const initialFormData = {
    title: "",
    description: "",
    status: "Todo",
    subtasks: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(false);
  const toast = useToast();
  const { token, TaskData, userDetails } = useSelector((store) => store.reducer);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddtask = (e) => {
    e.preventDefault();

    if (formData.title.trim() === "" || formData.description.trim() === "") {
      setFormError(true);
      return;
    }

    const passId = boardId || TaskData[0]?._id;
    const obj = {
      ...formData,
      boardId: passId,
      token,
      email: userDetails[0].email,
    };

    dispatch(AddtaskToBoard(obj));
    setFormData(initialFormData);
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
        <ModalHeader>Create Task</ModalHeader>
        <ModalBody pb={6}>
          <form onSubmit={handleAddtask}>
            <FormControl isRequired>
              <FormLabel>Task Title:</FormLabel>
              <Input
                required
                type="text"
                name="title"
                placeholder="Write Title"
                value={formData.title}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Task Description:</FormLabel>
              <Input
                required
                type="text"
                name="description"
                placeholder="Write Description"
                value={formData.description}
                onChange={handleChange}
              />
            </FormControl>

            {formError && <p>Please fill out all the required fields.</p>}

            <HStack w="80%" m="auto" justify="space-between" mt="50px">
              <Button type="submit" colorScheme="green" mr={3}>
                Add Task
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </HStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddTasks;

import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  ModalCloseButton,
  Input,
  Button,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AddtaskToBoard } from "../Redux/action";

const AddTasks = ({ isOpen, onOpen, onClose }) => {
  const { boardId } = useParams();
  const initial = {
    title: "",
    description: "",
    status: "Todo",
    subtasks: [],
  };

  const [formData, setFormData] = useState(initial);
  const [formError, setFormError] = useState(false);
  const toast = useToast();
  const { error, token, TaskData } = useSelector((store) => store.reducer);

  const dispatch = useDispatch();
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAddtask = (e) => {
    e.preventDefault();
    if (formData.title.trim() === "" || formData.description.trim() === "") {
      setFormError(true);
      return;
    }

    let passId = boardId || TaskData[0]?._id;
    let obj = { ...formData, boardId: passId, token };
    dispatch(AddtaskToBoard(obj));
    setFormData(initial);
    setFormError(false);
  };

  return (
    <>
      <Modal
        size={["xs", "sm", "md"]}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
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
                {" "}
                <Button type="submit" colorScheme="green" mr={3}>
                  Add Task
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </HStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTasks;

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
  useToast,HStack
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AddSubtaskToTask } from "../Redux/action";
const AddSubtask = ({ isOpen, onOpen, onClose, taskId, boardId }) => {
  const [formError, setFormError] = useState(false);

  const [title, setTitle] = useState("");

  const toast = useToast();
  const { error, token, TaskData } = useSelector((store) => store.reducer);

  const dispatch = useDispatch();

  const handleAddSubtask = (e) => {
    e.preventDefault();
    e.preventDefault();
    if (title.trim() === "") {
      setFormError(true);
      return;
    }

    let passId = boardId || TaskData[0]?._id;

    let data = { boardId: passId, taskId, title, token, isCompleted: false };

    dispatch(AddSubtaskToTask(data));
    setTitle("");
    setFormError(false);
  };

  return (
    <div>
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
            <form onSubmit={handleAddSubtask}>
              <FormControl isRequired>
                <FormLabel>Task Name: </FormLabel>
                <Input
                  type="text"
                  placeholder="Type your task"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <FormHelperText>We'll never share your data</FormHelperText>
              </FormControl>
              {formError && <p>Please fill out all the required fields.</p>}

              <HStack w="80%" m="auto" justify="space-between" mt="50px">
                {" "}
                <Button type="submit" colorScheme="green" mr={3}>
                  Add SubTask
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </HStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddSubtask;

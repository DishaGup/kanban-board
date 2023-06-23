import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,Input,Button,useToast
  } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AddtaskToBoard } from '../Redux/action';

const AddTasks = ({ isOpen, onOpen, onClose}) => {
    const {boardId} =useParams()
const initial = {
   title:"",
   description:"",
   status:"Todo",
   subtasks:[]
  };

const [formData, setFormData] = useState(initial);
const toast = useToast();
const { error,token,TaskData } = useSelector((store) => store.reducer);
  
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

const handleAddtask=()=>{
    let passId=boardId ||  TaskData[0]?._id;
let obj={...formData,boardId:passId,token}
dispatch(AddtaskToBoard(obj))
setFormData(initial)

isOpen=false

}


  return (
    <>
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input  type='text' name="title" placeholder="Write Title" value={formData.title} onChange={handleChange}  />
            <Input  type='text' name="description" placeholder="Write Description" value={formData.description} onChange={handleChange}  />
  
          </ModalBody>

          <ModalFooter>
            <Button  onClick={handleAddtask} colorScheme='blue' mr={3}>
              Add SubTask
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddTasks
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
import { AddSubtaskToTask } from '../Redux/action';
const AddSubtask = ({ isOpen, onOpen, onClose,taskId,boardId } ) => {




    const [title, setTitle] = useState("");

    const toast = useToast();
    const { error,token,TaskData } = useSelector((store) => store.reducer);
  
    const dispatch = useDispatch();
  
  const handleAddSubtask =(e)=>{
    e.preventDefault()
let passId=boardId ||  TaskData[0]?._id;

let data={boardId:passId,taskId,title,token,isCompleted:false}

dispatch(AddSubtaskToTask(data))
setTitle("")
isOpen=false
  }  





  return (
    <div>
 <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input  type='text' placeholder="Type your task" value={title} onChange={(e)=>setTitle(e.target.value)}  />
          </ModalBody>

          <ModalFooter>
            <Button  onClick={handleAddSubtask} colorScheme='blue' mr={3}>
              Add SubTask
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </div>
  )
}

export default AddSubtask
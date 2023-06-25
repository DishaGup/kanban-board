import { HStack, Box, VStack, Text, Button } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import SingleBoardCard from "./SingleBoardCard";
import { FcAddDatabase } from "react-icons/fc";
import { addBoardData } from "../Redux/action";

const BoardSideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, TaskData,userDetails } = useSelector((store) => store.reducer);
console.log(TaskData)
const addBoard=()=>{

 let data={name:`Board ${TaskData.length}`,email:userDetails[0].email,email_task:userDetails[0].email}
   dispatch(addBoardData(data,token))
}



  return (
    <>
      <Box>
        <Text fontWeight='600' fontSize='20px' my="10px">Total Boards {TaskData.length}</Text>

        <Box>
          <VStack>
            {TaskData &&
              TaskData.length > 0 &&
              TaskData.map((el, index) => (
                <SingleBoardCard key={index} {...el} />
              ))}

            <Box mt='30px'p={1}  border='1px solid #66BB6A'  align='center'>
              <HStack  align='center' > 
                <Button _hover={{color:'none',bg:'#2E7D32'}} onClick={addBoard} bg='#66BB6A' w='180px' align='center' color='white'  >
                  {" "}
                  <FcAddDatabase />
                  <Text>Add Board</Text>{" "}

                </Button>
              </HStack>
            </Box>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default BoardSideBar;

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
  const { token, TaskData } = useSelector((store) => store.reducer);

const addBoard=()=>{

 let data={name:`Board ${TaskData.length}`}
   dispatch(addBoardData(data,token))
}



  return (
    <>
      <Box>
        <Text my="10px">All Boards {TaskData.length}</Text>

        <Box>
          <VStack>
            {TaskData &&
              TaskData.length > 0 &&
              TaskData.map((el, index) => (
                <SingleBoardCard key={index} {...el} />
              ))}

            <Box p={2}>
              <HStack>
                <Button onClick={addBoard}>
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

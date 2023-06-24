import React, { useEffect, useState } from "react";
import { BiStar } from "react-icons/bi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  HStack,
  VStack,
  Heading,
  Text,
  Box,
  Image,
  useDisclosure,
  Button,
  Select,
  Input,
  useToast,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchAllBoards } from "../Redux/action";
import BoardSideBar from "../Components/BoardSideBar";
import TaskRight from "../Components/TaskRight";
import MovileDisplayBoards from "../Components/MovileDisplayBoards";

const Homepage = () => {
  
  const [usersData, setUsersData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchParams, SetSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, TaskData } = useSelector((store) => store.reducer);
  const toast = useToast();


  useEffect(() => {
    dispatch(fetchAllBoards(token));
  }, [TaskData.length]);

  if(!token || token === ""){
    return <> token not found</>
  }
 return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Box h={{base:'max-content',md:'100vh'}}   style={{
          backgroundImage: "linear-gradient(to right,#E8F5E9 ,#F1F8E9, white)",
        }}>   
      <Button
        onClick={onOpen}
        display={{ base: "block", lg: "none" }}
        position={"absolute"}
        left={4}
        top={{base:'100px',sm:"80px"}}
        color="white"
        _hover={{ bg: "#689F38" }}
        bg="#8BC34A"
      >
        Boards
      </Button>
      {isOpen && (
        <MovileDisplayBoards isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      )}

      <Grid 
      
        templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "240px 1fr 1fr" }}
        gap={4}
        autoRows={'true'}
        
        m="auto"
        w='98%'
        
      >
        <GridItem
          display={{ base: "none", lg: "block" }}
          colSpan={1}
          scrollBehavior="smooth"
          overflowY="scroll"
          mt="50px"
          maxHeight="700px"
        >
          {TaskData && TaskData.length > 0 && <BoardSideBar />}
        </GridItem>
        <GridItem colSpan={2} mt={{ base: "100px", md: "110px",xl:'90px' }}>
          {TaskData && TaskData.length > 0 && <TaskRight defaults={TaskData[0]._id} />}
        </GridItem>
      </Grid>
      </Box>
    </React.Suspense>
  );
};

export default Homepage;

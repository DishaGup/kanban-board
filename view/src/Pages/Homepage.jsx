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


const Homepage = () => {
  const [usersData, setUsersData] = useState([]);
  const [searchParams,SetSearchParams] =useSearchParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, TaskData } = useSelector((store) => store.reducer);
  // const [visibleRows, setVisibleRows] = useState([1, 5]);
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchAllBoards(token))
   // SetSearchParams({boardId:TaskData[0]._id})
  }, [TaskData.length]);
//console.log(TaskData)
  // const handleAddToBookMark = (data) => {
  //   if (!token) {
  //     toast({
  //       title: "Login to Your Account",
  //       position: "top",
  //       status: "info",
  //       variant: "top-accent",
  //       duration: 3000,
  //       isClosable: true,
  //     });

  //     setTimeout(() => {
  //       navigate("/login");
  //     }, 2000);
  //     return;
  //   }

  //   const isAlreadyBookmarked = bookmarkedData.some(
  //     (item) => item.id === data.id
  //   );

  //   if (!isAlreadyBookmarked) {
  //     dispatch(userAddToBookmarked(data, token));
  //   } else {
  //     toast({
  //       title: "Already in WatchList",
  //       position: "top",
  //       status: "info",
  //       variant: "top-accent",
  //       duration: 2000,
  //       isClosable: true,
  //     });
  //   }
  // };

  // const handleToggleRow = (rowIndex) => {
  //   if (visibleRows.includes(rowIndex)) {
  //     setVisibleRows(visibleRows.filter((row) => row !== rowIndex));
  //   } else {
  //     setVisibleRows([...visibleRows, rowIndex]);
  //   }
  // };




  return (
    <React.Suspense fallback={<div>Loading...</div>}>
    <Grid templateColumns='repeat(3, 1fr)' border='2px solid green' w='98%' m='auto' >
  <GridItem colSpan={1}>

{ TaskData && TaskData.length>0 &&  <BoardSideBar />}

  </GridItem>
<GridItem colSpan={2}>

 {  TaskData && TaskData.length>0 &&  <TaskRight defaults={TaskData[0]._id}  />}

</GridItem>


    </Grid>
    
    
    
    </React.Suspense>
   

  );
};

export default Homepage;

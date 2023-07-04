import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  GridItem,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBoards } from "../Redux/action";
import BoardSideBar from "../Components/BoardSideBar";
import TaskRight from "../Components/TaskRight";
import MobileDisplayBoards from "../Components/MobileDisplayBoards";

const Homepage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { token, TaskData, userDetails } = useSelector(
    (store) => store.reducer
  );

  useEffect(() => {
    if (!token || token == "") {
      <>Token not found... Please Login </>;
      setTimeout(() => {
        toast({
          title: "Please Login",
          description: "token not found",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login");
      }, 1000);
      return;
    }

    if (token != "" && userDetails.length >= 1) {
      dispatch(fetchAllBoards(token, userDetails[0].email));
    }
  }, [token]);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Box
        h={{ base: "100vh", lg: "100%" }}
        style={{
          backgroundColor: "#F1F8E9",
          opacity: "1",
          background:
            "radial-gradient(circle, transparent 20%, #F1F8E9 20%, #F1F8E9 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, #F1F8E9 20%, #F1F8E9 80%, transparent 80%, transparent) 27.5px 27.5px, linear-gradient(#C5E1A5 2.2px, transparent 2.2px) 0 -1.1px, linear-gradient(90deg, #C5E1A5 2.2px, #F1F8E9 2.2px) -1.1px 0",
          backgroundSize: "55px 55px, 55px 55px, 27.5px 27.5px, 27.5px 27.5px",
        }}
      >
        <Button
          onClick={onOpen}
          display={{ base: "block", lg: "none" }}
          position={"absolute"}
          left={4}
          top={{ base: "100px", sm: "80px" }}
          color="white"
          _hover={{ bg: "#689F38" }}
          bg="#8BC34A"
        >
          Boards
        </Button>
        {isOpen && (
          <MobileDisplayBoards
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
          />
        )}

        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "240px 1fr 1fr" }}
          gap={4}
          autoRows={"true"}
          m="auto"
          w="98%"
        >
          <GridItem
            display={{ base: "none", lg: "block" }}
            colSpan={1}
            overflowY="scroll"
            mt="10px"
            minHeight="90vh"
            style={{
              backgroundImage:
                "linear-gradient(to right,#E8F5E9 ,#F1F8E9, white)",
            }}
          >
            <BoardSideBar />
          </GridItem>
          <GridItem colSpan={2} mt={{ base: "100px", md: "110px", xl: "90px" }}>
            {TaskData && TaskData.length > 0 && (
              <TaskRight defaults={TaskData[0]._id} />
            )}
          </GridItem>
        </Grid>
      </Box>
    </React.Suspense>
  );
};

export default Homepage;

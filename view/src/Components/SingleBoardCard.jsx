import { HStack, Box, Text, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { FcList, FcFullTrash } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBoardData } from "../Redux/action";

const deleteBoard = (dispatch, id, token, email) => {

  dispatch(deleteBoardData(id, token, email));
};

const SingleBoardCard = ({ name, _id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { boardId } = useParams();
  const { token, TaskData, userDetails } = useSelector(
    (store) => store.reducer
  );
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

 

  return (
    <>
      <Box p={2} w="130px">
        <Link to={`/board/${_id}`}>
          <HStack w="150px" border="1px solid black" borderRadius="10px">
            <Button
              _hover={{ color: "none", bg: "none" }}
              onMouseEnter={handleHover}
              bg={boardId === _id ? "#AED581" : ""}
              w="100%"
              onMouseLeave={handleMouseLeave}
            >
              <FcList />
              <Text mx="9px" textTransform={boardId === _id ? "uppercase" : "none"}>
                {name}
              </Text>
              {isHovered && (
                <FcFullTrash
                  fontSize="22px"
                  onClick={() => deleteBoard(dispatch, _id, token, userDetails[0].email)}
                />
              )}
            </Button>
          </HStack>
        </Link>
      </Box>
    </>
  );
};

export default SingleBoardCard;

import { HStack, Box, Text, Button } from "@chakra-ui/react";
import React,{useState} from "react";
import { FcList,FcFullTrash } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { delteBoardData } from "../Redux/action";
const SingleBoardCard = ({ name,_id }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {boardId}=useParams()
  const { token, TaskData } = useSelector((store) => store.reducer);
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

const deleteBoard=(id)=>{
 
  dispatch(delteBoardData(id,token))
}

  return (
    <div>
      <Box p={2} w='130px'  >
      <Link to={`/board/${_id}`}  >
        <HStack w='150px' border='1px solid black'  borderRadius={'10px'}  >

            <Button _hover={{color:'none',bg:'none'}} onMouseEnter={handleHover} bg={boardId==_id?"#AED581":""} w='100%'  onMouseLeave={handleMouseLeave} >
              {" "}
              <FcList />
              <Text mx='9px' textTransform={boardId==_id?"uppercase":"none"}  >{name}</Text>{" "}
              {isHovered ? <FcFullTrash fontSize={'22px'} onClick={()=>deleteBoard(_id)} /> : ""}
            </Button>

       
        </HStack>
        </Link>
      </Box>
    </div>
  );
};

export default SingleBoardCard;

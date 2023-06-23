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
      <Box p={2}>
        <HStack>
          <Link to={`/board/${_id}`} >
            <Button onMouseEnter={handleHover} onMouseLeave={handleMouseLeave} >
              {" "}
              <FcList />
              <Text textTransform={boardId==_id?"uppercase":"none"}  >{name}</Text>{" "}
              {isHovered ? <FcFullTrash onClick={()=>deleteBoard(_id)} /> : ""}
            </Button>

          </Link>
        </HStack>
      </Box>
    </div>
  );
};

export default SingleBoardCard;

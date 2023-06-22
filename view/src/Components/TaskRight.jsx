import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchSingleBoardsData } from "../Redux/action";
import { Grid, GridItem, Spinner } from "@chakra-ui/react";
import SingleTaskCard from "./SingleTaskCard";

const TaskRight = ({ defaults }) => {
  const [task, setTask] = useState([]);
  const [searchParams, SetSearchParams] = useSearchParams();
  const { boardId } = useParams();

  const [todo, setTodo] = useState([]);
  const [done, setDone] = useState([]);
  const [doing, setDoing] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, TaskData,loading ,error} = useSelector((store) => store.reducer);
  //console.log(TaskData[0]._id)
  const defaultBoardId = TaskData[0]?._id;
  console.log(defaultBoardId,"default",boardId,task)
  useEffect(() => {
    let passId = boardId || defaultBoardId;
    dispatch(fetchSingleBoardsData(token, passId)).then((res) => {
        setTask(res.tasks);
      });
// console.log(task,"task")
    
        const filteredTasks = task.filter((el) => el.status === "Todo");
        setTodo(filteredTasks);
        
        const filteredDoingTasks = task.filter((el) => el.status === "Doing");
        setDoing(filteredDoingTasks);
        
        const filteredDoneTasks = task.filter((el) => el.status === "Done");
        setDone(filteredDoneTasks);
    
  
  }, [boardId,defaultBoardId]);

 // console.log(todo, "todod",done,doing);
console.log(loading,error,"loading  error",TaskData)
if(loading){
  return  <> <Spinner /> </>
}

  return (
    
      <div>
        <Grid templateColumns="repeat(3, 1fr)">
          <GridItem>
            {TaskData &&
              todo.length > 0 &&
              todo.map((el, index) => <SingleTaskCard key={index} title={el.title} description={el.description} subtasks={el.subtasks} />)}
          </GridItem>

          <GridItem>
            {" "}
            {TaskData &&
              TaskData.length > 1 &&
              doing.map((el, index) => <SingleTaskCard key={index}title={el.title} description={el.description} subtasks={el.subtasks}  />)}
          </GridItem>

          <GridItem>
            {TaskData &&
              TaskData.length > 1 &&
              done.map((el, index) => <SingleTaskCard key={index}title={el.title} description={el.description} subtasks={el.subtasks}  />)}
          </GridItem>
        </Grid>
      </div>
   
  );
};

export default TaskRight;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchSingleBoardsData } from "../Redux/action";
import { Grid, GridItem, Heading, Spinner,Button, useDisclosure } from "@chakra-ui/react";
import SingleTaskCard from "./SingleTaskCard";
import AddTasks from "./AddTasks";

const TaskRight = ({ defaults }) => {
  const {isOpen,onOpen,onClose} =useDisclosure()
  const [task, setTask] = useState([]);
  const [searchParams, SetSearchParams] = useSearchParams();
  const { boardId } = useParams();
 var passId;
  const [todo, setTodo] = useState([]);
  const [done, setDone] = useState([]);
  const [doing, setDoing] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, TaskData, loading, error } = useSelector((store) => store.reducer);
  const defaultBoardId = TaskData[0]?._id;

  useEffect(() => {
     passId = boardId || defaultBoardId;
    dispatch(fetchSingleBoardsData(token, passId)).then((res) => {
      setTask(res.tasks);
    });
  }, [boardId]);

  useEffect(() => {
    const filteredTasks = task.filter((el) => el.status === "Todo");
    setTodo(filteredTasks);

    const filteredDoingTasks = task.filter((el) => el.status === "Doing");
    setDoing(filteredDoingTasks);

    const filteredDoneTasks = task.filter((el) => el.status === "Done");
    setDone(filteredDoneTasks);
  }, [task]);





  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }





  return (
    <div>

  <Button onClick={onOpen} > Add Task </Button>

      <Grid templateColumns="repeat(3, 1fr)">
        <GridItem>
          <Heading fontSize={"20px"} fontWeight={"500"} _firstLetter={{ color: "green" }} textTransform={"uppercase"}>
            todo ({todo.length})
          </Heading>

          {TaskData &&
            todo.length > 0 &&
            todo.map((el, index) => (
              <SingleTaskCard _id={el._id} key={index+el._id} title={el.title} description={el.description} subtasks={el.subtasks} />
            ))}
        </GridItem>

        <GridItem>
          <Heading fontSize={"20px"} fontWeight={"500"} _firstLetter={{ color: "green" }} textTransform={"uppercase"}>
            doing ({doing.length})
          </Heading>

          {TaskData &&
            TaskData.length > 1 &&
            doing.map((el, index) => (
              <SingleTaskCard _id={el._id} key={index+el._id} title={el.title} description={el.description} subtasks={el.subtasks} />
            ))}
        </GridItem>

        <GridItem>
          <Heading fontSize={"20px"} fontWeight={"500"} _firstLetter={{ color: "green" }} textTransform={"uppercase"}>
            done ({done.length})
          </Heading>

          {TaskData &&
            TaskData.length > 1 &&
            done.map((el, index) => (
              <SingleTaskCard key={index+el._id} title={el.title} description={el.description} _id={el._id} subtasks={el.subtasks} />
            ))}
        </GridItem>
      </Grid>


      {
  isOpen && <AddTasks isOpen={isOpen} onClose={onClose} onOpen={onOpen}   />
}



    </div>
  );
};

export default TaskRight;

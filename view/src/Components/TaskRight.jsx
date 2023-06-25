import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchSingleBoardsData } from "../Redux/action";
import {
  Grid,
  GridItem,
  Heading,
  Spinner,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import SingleTaskCard from "./SingleTaskCard";
import AddTasks from "./AddTasks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskRight = ({ defaults }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [task, setTask] = useState([]);
  const [searchParams, SetSearchParams] = useSearchParams();
  const { boardId } = useParams();
  var passId;
  const [todo, setTodo] = useState([]);
  const [done, setDone] = useState([]);
  const [doing, setDoing] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, TaskData, loading, error, SingleTaskData,userDetails } = useSelector(
    (store) => store.reducer
  );
  const defaultBoardId = TaskData[0]?._id;
  useEffect(() => {
    const passId = boardId || defaultBoardId;
    
    dispatch(fetchSingleBoardsData(token, passId,userDetails[0].email));
  }, [boardId, defaultBoardId, token,TaskData.length]);

  useEffect(() => {
    setTask(SingleTaskData);
  }, [SingleTaskData]);

  useEffect(() => {
    const filteredTasks = task.filter((el) => el.status === "Todo");
    setTodo(filteredTasks);

    const filteredDoingTasks = task.filter((el) => el.status === "Doing");
    setDoing(filteredDoingTasks);

    const filteredDoneTasks = task.filter((el) => el.status === "Done");
    setDone(filteredDoneTasks);
  }, [task]);

  const onDragEnd = useCallback(
    (result) => {
      const { destination, source, draggableId } = result;

      if (!destination) {
        return;
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      // const updatedTask = [...task];
      // const sourceColumn = updatedTask.find((el) => el.status === source.droppableId);
      // const destinationColumn = updatedTask.find((el) => el.status === destination.droppableId);
      // const sourceTasks = [...sourceColumn.tasks];
      // const destinationTasks = [...destinationColumn.tasks];
      // const [removed] = sourceTasks.splice(source.index, 1);
      // destinationTasks.splice(destination.index, 0, removed);
      // sourceColumn.tasks = sourceTasks;
      // destinationColumn.tasks = destinationTasks;

      // setTask(updatedTask);
    },
    [task]
  );

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <Button
        position={"absolute"}
        right={"10"}
        w={{ base: "20%", md: "100px", xl: "130px" }}
         top={{base:'100px',sm:"80px"}}
        color="white"
        _hover={{ bg: "#689F38" }}
        bg="#8BC34A"
        onClick={onOpen}
      >
        {" "}
        Add Task{" "}
      </Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid autoFlow
         templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)",md:"repeat(3,1fr)" }}
          autoRows
          m='auto'
          w='95%'
          align='center'
         rowGap={'50px'}
        >
          <GridItem >
            
            <Heading
            fontSize={{ base: "18px", lg: "20px" }}
              fontWeight={"500"}
              _firstLetter={{ color: "green" }}
              textTransform={"uppercase"}
            >
              todo ({todo.length})
            </Heading>

            {TaskData && todo.length > 0 && (
              <Droppable droppableId="todo">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {todo.map((el, index) => (
                      <Draggable
                        draggableId={`${el._id}-${index}`}
                        index={index}
                        key={`${el._id}-${index}`}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <SingleTaskCard
                              _id={el._id}
                              key={el._id}
                              index={index}
                              title={el.title}
                              description={el.description}
                              subtasks={el.subtasks}
                              statuss={true}
                              status={el.status}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )}
          </GridItem>

          <GridItem>
            <Heading
              fontSize={{ base: "18px", lg: "20px" }}
              fontWeight={"500"}
              _firstLetter={{ color: "green" }}
              textTransform={"uppercase"}
            >
              doing ({doing.length})
            </Heading>

            {TaskData && doing.length > 0 && (
              <Droppable droppableId="doing">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {doing.map((el, index) => (
                      <Draggable
                        draggableId={`${el._id}-${index}`}
                        index={index}
                        key={`${el._id}-${index}`}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <SingleTaskCard
                              _id={el._id}
                              key={el._id}
                              index={index}
                              title={el.title}
                              description={el.description}
                              subtasks={el.subtasks}
                              statuss={true}
                              status={el.status}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )}
          </GridItem>

          <GridItem>
            <Heading
              fontSize={{ base: "18px", lg: "20px" }}
              fontWeight={"500"}
              _firstLetter={{ color: "green" }}
              textTransform={"uppercase"}
            >
              done ({done.length})
            </Heading>

            {TaskData && done.length > 0 && (
              <Droppable droppableId="done">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {done.map((el, index) => (
                      <Draggable
                        draggableId={`${el._id}-${index}`}
                        index={index}
                        key={`${el._id}-${index}`}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <SingleTaskCard
                              _id={el._id}
                              key={el._id}
                              index={index}
                              title={el.title}
                              description={el.description}
                              subtasks={el.subtasks}
                              statuss={false}
                              status={el.status}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )}
          </GridItem>
        </Grid>
      </DragDropContext>

      {isOpen && <AddTasks isOpen={isOpen} onClose={onClose} onOpen={onOpen} />}
    </div>
  );
};

export default TaskRight;

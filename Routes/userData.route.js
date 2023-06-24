const express = require("express");
const userDataRouter = express.Router();
const { BoardModel, TaskModel, SubTaskModel } = require("../Model/userData.model");
const { default: mongoose } = require("mongoose");

userDataRouter.get("/", async (req, res) => {
  try {
    const boards = await BoardModel.find().populate({
      path: "tasks",
      populate: {
        path: "subtasks",
        model: "SubTaskModel"
      }
    });

    res.status(200).json({ boards });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userDataRouter.get("/board/:id", async (req, res) => {
  try {
    const boardId = req.params.id;
    const board = await BoardModel.findById(boardId).populate({
      path: "tasks",
      populate: {
        path: "subtasks",
        model: "SubTaskModel"
      }
    });

    if (!board) {
      throw new Error("Board not found");
    }

    res.status(200).json({ board });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});




userDataRouter.post("/addboard", async (req, res) => {
  try {
    const board = new BoardModel({ ...req.body, _id: new mongoose.Types.ObjectId() });
    await board.save();
    res.status(200).json({ board });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userDataRouter.post("/addtask", async (req, res) => {
  try {
    const boardId = req.body.boardId; // Retrieve boardId from the request or any other source
    const board = await BoardModel.findById(boardId);

    if (!board) {
      throw new Error("Board not found");
    }

    const task = new TaskModel({ ...req.body, _id: new mongoose.Types.ObjectId() });
    await task.save();

    board.tasks.push(task._id);
    await board.save();

    res.status(200).json({ task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userDataRouter.post("/addsubtask", async (req, res) => {
  try {
    const boardId = req.body.boardId;
    const taskId = req.body.taskId;
    
    const board = await BoardModel.findById(boardId);
    if (!board) {
      throw new Error("Board not found");
    }
    
    const task = await TaskModel.findById(taskId);
    if (!task) {
      throw new Error("Task not found");
    }

    const subtask = new SubTaskModel({ ...req.body, _id: new mongoose.Types.ObjectId() });
    await subtask.save();

    task.subtasks.push(subtask._id);
    await task.save();

    res.status(200).json({ subtask });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


userDataRouter.delete("/delete/board/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await BoardModel.findByIdAndDelete({ _id: id });
    res.status(201).send({ message: "deleted Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.messsage });
  }
});



userDataRouter.delete("/delete/task/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await TaskModel.findByIdAndDelete({ _id: id });
    res.status(201).send({ message: "deleted Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.messsage });
  }
});

userDataRouter.get("/search", async (req, res) => {
  const query = req.query.query;

  try {
    const boards = await BoardModel.find({
      $or: [
        { "tasks.title": { $regex: query, $options: "i" } },
        { "tasks.subtasks.title": { $regex: query, $options: "i" } }
      ]
    })
    .populate({
      path: "tasks",
      populate: {
        path: "subtasks",
        model: "SubTaskModel"
      }
    });

    res.status(200).json({ boards });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


/***
 * 
 
frontend logic

userDataRouter.get("/search", async (req, res) => {
  const query = req.query.query;
try{
  const searchResults = boards.filter(board => {
    const matchingTasks = board.tasks.filter(task => {
      // Check if the task title matches the query
      if (task.title.toLowerCase().includes(query.toLowerCase())) {
        return true;
      }
      
      // Check if any of the subtask titles match the query
      const matchingSubtasks = task.subtasks.filter(subtask => {
        return subtask.title.toLowerCase().includes(query.toLowerCase());
      });
      
      // Include the task in the search results if there are matching subtasks
      return matchingSubtasks.length > 0;
    });
    
    // Include the board in the search results if there are matching tasks
    return matchingTasks.length > 0;
  });
  

  
  
  */

userDataRouter.patch("/updatetasktodoing/:id", async (req, res) => {
const {id}=req.params
  try {
    const boardId = req.body.boardId; // Retrieve boardId from the request or any other source
    const board = await BoardModel.findById({_id:boardId});

    if (!board) {
      throw new Error("Board not found");
    }

    const task = await TaskModel.findById({_id:id});

    if (!task) {
      throw new Error("Task not found");
    }

    if (task.status === "Todo") {
      task.status = "Doing";
    } else if (task.status === "Doing") {
      task.status = "Done";
    } else {
      // Handle any other status transition if needed
      throw new Error("Invalid status transition");
    }

    await task.save();

    res.status(200).json({ msg: "Task status updated successfully" });
   
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = { userDataRouter };

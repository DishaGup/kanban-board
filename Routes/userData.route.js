//userData.route.js

const express = require("express");
const userDataRouter = express.Router();
const {
  BoardModel,
  TaskModel,
  SubTaskModel,
} = require("../Model/userData.model");
const { default: mongoose } = require("mongoose");
const {
  filterBoardsByEmail,
} = require("../Controllers/filterBoardByEmail.middleware");




userDataRouter.get("/", filterBoardsByEmail,(req, res) => {
  const boards = req.filteredBoards;
  res.status(200).json({ boards });
});

userDataRouter.get("/board/:id", async (req, res) => {
  try {
    const boardId = req.params.id;
    //console.log(boardId);
    const board = await BoardModel.findById(boardId).populate({
      path: "tasks",
      populate: {
        path: "subtasks",
        model: "SubTaskModel",
      },
    });
   // console.log(board);
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    res.status(200).json({ board });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userDataRouter.post("/addboard", filterBoardsByEmail,async (req, res) => {
  //console.log(req.body,'..req.body')
  try {
    const board = new BoardModel({
      ...req.body,
      _id: new mongoose.Types.ObjectId(),
    });
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

    const task = new TaskModel({
      ...req.body,
      _id: new mongoose.Types.ObjectId(),
    });
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

    const subtask = new SubTaskModel({
      ...req.body,
      _id: new mongoose.Types.ObjectId(),
    });
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

userDataRouter.patch("/updatetasktodoing/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const boardId = req.body.boardId; // Retrieve boardId from the request or any other source
    const board = await BoardModel.findById({ _id: boardId });

    if (!board) {
      throw new Error("Board not found");
    }

    const task = await TaskModel.findById({ _id: id });

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

userDataRouter.patch("/update_subtask_completed/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { boardId, taskId } = req.body; // Retrieve boardId and taskId from the request body
    const board = await BoardModel.findById(boardId);

    if (!board) {
      throw new Error("Board not found");
    }

    const task = await TaskModel.findById(taskId);
    if (!task) {
      throw new Error("Task not found");
    }
    const subtask = await SubTaskModel.findById(id);

    if (!subtask) {
      throw new Error("Subtask not found");
    }

    if (subtask.isCompleted === true) {
      subtask.isCompleted = false;
    } else if (subtask.isCompleted === false) {
      subtask.isCompleted = true;
    } else {
      throw new Error("Invalid status transition");
    }

    await subtask.save();
    await task.save();

    res.status(200).json({ msg: "Subtask status updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});





module.exports = { userDataRouter };

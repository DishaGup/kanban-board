const { Schema, model, ObjectId } = require("mongoose");
const subtaskSchema = Schema(
  {
    _id: ObjectId,
    title: String,
    isCompleted: { type: Boolean, default: false },
  },
  {
    versionKey: false,
  }
);


const SubTaskModel = model("SubTaskModel", subtaskSchema);
const taskSchema = Schema(
  {
    _id: ObjectId,
    title: String,
    description: String,
    status: { type: String, enum: ['Todo', 'Doing', 'Done'], default: 'Todo' },
    subtasks: [{ type: ObjectId, ref: "SubTaskModel" }] 
  },
  {
    versionKey: false,
  }
);

const TaskModel = model("TaskModel", taskSchema);

const boardSchema = Schema(
  {
    _id: ObjectId,
    name: String,
    email_task: { type: String, required: true },
    tasks: [{ type: ObjectId, ref: "TaskModel" }]
  },
  {
    versionKey: false,
  }
);

const BoardModel = model("user_board", boardSchema);

module.exports = { BoardModel, TaskModel, SubTaskModel };



/***
 * 
 
{
  "title": "party",
  "isCompleted": false
}

 */
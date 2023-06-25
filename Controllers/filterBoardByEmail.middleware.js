const { BoardModel } = require("../Model/userData.model");

const filterBoardsByEmail = async (req, res, next) => {
    try {
        let email;
      email= req.query.email; // Extract the email from the request body
  if(!email || email==""){
    email=req.body.email
  } 

   // console.log(email)
      const boards = await BoardModel.find({ email_task: email }).populate({
        path: "tasks",
        populate: {
          path: "subtasks",
          model: "SubTaskModel",
        },
      });
  
      req.filteredBoards = boards; 
    //  console.log(req.body)
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  module.exports={filterBoardsByEmail}
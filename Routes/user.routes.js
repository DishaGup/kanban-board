const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt"); //for hashing of password
const jwt = require("jsonwebtoken"); //for authorization the realtime user
const { UserModel } = require("../Model/user.model"); 


userRouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

      const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .json({ message: "Email already exists, Please Login" });
    }

    bcrypt.hash(password, 2, async (err, hash) => {
    if(err) return new Error("server error")
     const user = new UserModel({
        email,
        password: hash, 
        });
      await user.save();
      res.status(201).json({ message: "Account created successfully" });
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});



userRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if(err) throw new Error("server error")
        if (result) {
          const token = jwt.sign(
            { email_task : user.email }, 
            "kanban"
          );

          res.status(200).json({
            message: "Login Successful",
            token,
            userD: [user],
          });
        } else {
          res.status(401).send({ message: "Invalid password" });
        }
      });
    } else {
      res.status(401).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.messsage });
  }
});

module.exports = { userRouter };

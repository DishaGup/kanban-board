const mongoose = require('mongoose');

const { Schema, model } = mongoose

// Define the user schema
const userSchema = Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);


// Create the User model using the user schema
const UserModel = model("users", userSchema);

module.exports = { UserModel };

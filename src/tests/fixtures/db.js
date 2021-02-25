// Utils
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Models
const User = require("../../models/user");
const Task = require("../../models/task");

// Sample users
const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Test",
  email: "1@1.com",
  password: "djdkfh@dj11",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "TEST 222",
  email: "2@2.com",
  password: "asdhdg@@11",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
    },
  ],
};

// Sample tasks
const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "first task",
  completed: false,
  owner: userOne._id,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "second task",
  completed: true,
  owner: userOne._id,
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "third task",
  completed: true,
  owner: userTwo._id,
};

const setUpDatabase = async () => {
  // Clear the database
  await User.deleteMany({});
  await Task.deleteMany({});

  // Insert data into the DB (for testing something like logging in etc)
  const user1 = new User(userOne);
  const user2 = new User(userTwo);
  await user1.save();
  await user2.save();

  const task1 = new Task(taskOne);
  const task2 = new Task(taskTwo);
  const task3 = new Task(taskThree);
  await task1.save();
  await task2.save();
  await task3.save();
};

module.exports = {
  userOneId,
  userOne,
  userTwo,
  userTwoId,
  taskOne,
  setUpDatabase,
};

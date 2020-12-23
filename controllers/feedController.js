const user = require("../models/userModel");
const task = require("../models/taskModel");


// Fetch all data joining both user details and task details from mongoDb
exports.fetchAll = async (request, response, next) => {
    const arr=[];
  const fetchall = await user.aggregate([
    {
      $lookup: {
        from: "tasks",
        localField: "_id",
        foreignField: "userId",
        as: "task",
      },
    },
  ]);
  if (fetchall) {
      fetchall.map(data=>{
          arr.push(data);
      })
    response.status(200).json(
      arr
    );
  } else {
    response.status(404).json({
      message: "No record found",
    });
  }
};

// Create a new user in mongoDB

exports.postUser = async (request, response, next) => {
  const name = request.body.username;

  const newUser = await user.findOne({ username: name });
  if (!newUser) {
    const newFeed = new user({
      username: name,
    });
    newFeed.save();

    response.status(201).json({
      message: "Successfully posted",
    });
  } else {
    response.status(409).json({
      message: "Username Already Exist",
    });
  }
};

// Update a user in mongoDB with Id as parameter
exports.UpdateUser = (request, response, next) => {
  const userId = request.params.userId;
  const userName = request.body.username;
console.log(userName);
  user
    .findOne({ _id: userId })
    .then((res) => {
      if (!res) {
        response.status(404).json({ message: "task not found" });
      } else {
        res.username = userName;
        res.__v += 1;
        return res.save();
      }
    })
    .then((res) => {
      response
        .status(200)
        .json({ Response: res, message: "Posted Successfully" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
    .catch((err) => {
      err.statusCode = 500;
      throw err;
    });
};

// Delete already existing user in mongoDB with id parameter

exports.deleteUser = (request, response, next) => {
  const userId = request.params.userId;

  user
    .findOneAndDelete({ _id: userId })
    .then((res) => {
      response.status(200).json({ Response: res, message: "Deleted post." });
    })
    .catch((err) => {
      response
        .status(500)
        .json({ Response: err, message: "Unsuccessful delete" });
    });
};

// Create a new task for a user in mongoDB

exports.postTask = (request, response, next) => {
  const userId = request.params.userId;
  const taskname = request.body.taskname;
  user
    .findOne({ _id: userId })
    .then((res) => {
      if (res) {
        const newTask = new task({
          title: taskname,
          userId: res.id,
        });
        newTask.save();
        response.status(200).json({
          message: "Posted successfully",
        });
      } else {
        response.status(404).json({
          message: "User not found",
        });
      }
    })
    .catch((err) => {
      response.status(500).json({
        message: "Server Error",
      });
    });
};

// update a  task for a user in mongoDB
exports.UpdateTask = (request, response, next) => {
  const taskId = request.params.taskId;
  const taskName = request.body.taskname;

  task
    .findOne({ _id: taskId })
    .then((res) => {
      if (!res) {
        response.status(404).json({ message: "task not found" });
      } else {
        res.title = taskName;
        res.__v += 1;
        return res.save();
      }
    })
    .then((res) => {
      response
        .status(200)
        .json({ Response: res, message: "Posted Successfully" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
    .catch((err) => {
      err.statusCode = 500;
      throw err;
    });
};

// delete a task for a user in mongoDB
exports.deleteTask = (request, response, next) => {
  const taskId = request.params.taskId;
  task
    .findOneAndDelete({ _id: taskId })
    .then((res) => {
        console.log('response'+res);
      response.status(200).json({ Response: res, message: "Deleted post." });
    })
    .catch((err) => {
        console.log(err);
      response
        .status(500)
        .json({ Response: err, message: "Unsuccessful delete" });
    });
};

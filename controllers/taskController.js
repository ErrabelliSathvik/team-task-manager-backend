const Task = require("../models/Task");
const Project = require("../models/Project");




// Create Task
const createTask = async (req, res) => {

  try {

    const {
      title,
      description,
      dueDate,
      priority,
      assignedTo,
      projectId,
    } = req.body;

    const project = await Project.findById(
      projectId
    );

    if (!project) {

      return res.status(404).json({
        message: "Project not found",
      });

    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      assignedTo,
      project: projectId,
      createdBy: req.user._id,
    });

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};






// Get Tasks
const getTasks = async (req, res) => {

  try {

    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("project", "name");

    res.json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};








// Update Task Status
const updateTaskStatus = async (req, res) => {

  try {

    const task = await Task.findById(
      req.params.id
    );

    if (!task) {

      return res.status(404).json({
        message: "Task not found",
      });

    }

    task.status = req.body.status;

    const updatedTask = await task.save();

    res.json(updatedTask);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};








// Delete Task
const deleteTask = async (req, res) => {

  try {

    const task = await Task.findById(
      req.params.id
    );

    if (!task) {

      return res.status(404).json({
        message: "Task not found",
      });

    }

    await task.deleteOne();

    res.json({
      message: "Task deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};







module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
};
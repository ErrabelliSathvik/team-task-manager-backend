const Project = require("../models/Project");


// Create Project
const createProject = async (req, res) => {

  try {

    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      admin: req.user._id,
      members: [req.user._id],
    });

    res.status(201).json(project);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// Get Projects
const getProjects = async (req, res) => {

  try {

    const projects = await Project.find()
      .populate("admin", "name email")
      .populate("members", "name email");

    res.json(projects);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


module.exports = {
  createProject,
  getProjects,
};
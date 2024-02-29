const router = require("express").Router()

const Project = require("../models/Project.model")
const Task = require('../models/Task.model')


router.post('/', (req, res, next) => {

  const { title, description, projectId } = req.body

  Task
    .create({ title, description, project: projectId })
    .then(newTaskt => Project.findByIdAndUpdate(projectId, { $push: { tasks: newTaskt._id } }))
    .then(() => res.sendStatus(201))
    .catch(err => res.status(500).json(err))
})


module.exports = router
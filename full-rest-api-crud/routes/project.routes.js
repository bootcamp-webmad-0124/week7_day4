const router = require("express").Router()
const mongoose = require('mongoose')
const Project = require('../models/Project.model')



router.post('/', (req, res, next) => {

  const { title, description } = req.body

  Project
    .create({ title, description, tasks: [] })
    .then(newProject => res.json(newProject))
    .catch(err => res.status(500).json(err))
})


router.get('/', (req, res, next) => {

  Project
    .find()
    .populate('tasks')
    .then(allProjects => res.json(allProjects))
    .catch(err => res.status(500).json(err))
})


router.get('/:projectId', (req, res, next) => {

  const { projectId } = req.params

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: 'Specified id is not valid' })
    return
  }


  Project
    .findById(projectId)
    .populate('tasks')
    .then(project => res.json(project))
    .catch(err => res.status(500).json(err))
})



router.put('/:projectId', (req, res, next) => {

  const { projectId } = req.params
  const { title, description } = req.body

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: 'Specified id is not valid' })
    return
  }

  Project
    .findByIdAndUpdate(projectId, { title, description }, { new: true, runValidators: true })
    .then(updatedProject => res.json(updatedProject))
    .catch(err => res.status(500).json(err))
})



router.delete('/:projectId', (req, res, next) => {

  const { projectId } = req.params

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: 'Specified id is not valid' })
    return
  }

  Project
    .findByIdAndDelete(projectId)
    .then(() => res.sendStatus(204))
    .catch(err => res.status(500).json(err))
})

module.exports = router
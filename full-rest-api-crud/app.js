require("dotenv").config()
require("./db")

const express = require("express")
const app = express()

require("./config")(app)

const customMiddleware = require("./middleware/example.middleware")
app.use(customMiddleware)



const projectRoutes = require("./routes/project.routes")
app.use("/api/projects", projectRoutes)

const tasksRoutes = require("./routes/tasks.routes")
app.use("/api/tasks", tasksRoutes)

require("./error-handling")(app)



module.exports = app
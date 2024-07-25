//importações
const { Router } = require("express")
const userRoutes = require("./user.routes")
const sessionRoutes = require("./session.routes")
const dishRoutes = require("./dish.routes")
const requestsRoutes = require("./requests.routes")

const Routes = Router()

Routes.use("/users", userRoutes)
Routes.use("/session", sessionRoutes)
Routes.use("/dish", dishRoutes)
Routes.use("/request", requestsRoutes)

module.exports = Routes
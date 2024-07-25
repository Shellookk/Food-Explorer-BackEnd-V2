//importações
const { Router } = require("express");
const UserSessionControllers = require("../controllers/UserSessionControllers")
const SessionRoutes = Router()

const userSessionControllers = new UserSessionControllers()

SessionRoutes.use("/", userSessionControllers.create)

module.exports = SessionRoutes
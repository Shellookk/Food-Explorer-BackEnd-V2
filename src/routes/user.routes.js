//importações
const { Router }= require("express")
const UserContreoller = require("../controllers/UserControllers")
const UserValidatedControllers = require("../controllers/UserValidatedControllers")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const UserRoutes = Router()
const userContreoller = new UserContreoller()
const userValidatedControllers = new UserValidatedControllers()

UserRoutes.post("/", userContreoller.create)
UserRoutes.get("/validated", ensureAuthenticated, userValidatedControllers.index)

module.exports = UserRoutes
//importações
const { Router } = require("express");
const RequestControllers = require("../controllers/RequestControllers");
const RequestsRoutes = Router()
const requestControllers = new RequestControllers()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const users = ["admin", "customer"]

RequestsRoutes.use(ensureAuthenticated)
RequestsRoutes.get("/", requestControllers.index)
RequestsRoutes.post("/", requestControllers.create)
RequestsRoutes.patch("/:id", verifyUserAuthorization(users), requestControllers.update)
RequestsRoutes.delete("/:id", verifyUserAuthorization(users), requestControllers.delete)

module.exports = RequestsRoutes
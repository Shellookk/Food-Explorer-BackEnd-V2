//importações
const { Router } = require("express");
const DishControllers = require("../controllers/DishControllers");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const uploadConfig = require("../config/upload")
const multer = require("multer");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const user = ["admin"]

const DishRoutes = Router()
const dishControllers = new DishControllers()
const upload = multer(uploadConfig.MULTER)


DishRoutes.use(ensureAuthenticated)
DishRoutes.get("/", dishControllers.index)
DishRoutes.get("/:id", dishControllers.show)
DishRoutes.put("/:id", upload.single("file"), verifyUserAuthorization(user),  dishControllers.update)
DishRoutes.delete("/:id", verifyUserAuthorization(user), dishControllers.delete)
DishRoutes.post("/", upload.single("file"), verifyUserAuthorization(user), dishControllers.create)


module.exports = DishRoutes
const router = require("express").Router()
const userController = require("../controllers/user.controller")
const authController = require("../controllers/auth.controller")
const uploadController = require("../controllers/upload.controller")


const multer = require("multer")
const upload = multer()

router.post("/register", authController.signUp)
router.post("/login", authController.signIn)
router.get("/logout", authController.logout)

router.get("/", userController.getAllUsers)
router.get("/:id", authController.getUser)
router.put("/:id", userController.updateUser)
router.delete("/:id", userController.deleteUser)

//Continuer et faire le système de follow


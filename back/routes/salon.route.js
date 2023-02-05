const router = require("express").Router()

const salonController = require("../controllers/salon.controller")
const multer = require("multer")
const upload = multer

router.get("/", salonController.getSalon)
router.post("/", upload.single("file"), salonController.createSalon)
router.put("/:id", salonController.updateSalon)
router.delete("/:id", salonController.deleteSalon)
router.patch("/fav-salon/:id"), salonController.favSalon
router.patch("/unfav-salon/:id", salonController.unfavSalon)


router.patch("/comment-salon/:id", salonController.comment)
router.patch("/edit-comment-salon", salonController.editComment)
router.patch("delete-comment-salon", salonController.deleteComment)
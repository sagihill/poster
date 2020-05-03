const experss = require("express");
const router = experss.Router();

const userController = require("../controllers/user");

router.post("/signup", userController.createUser);

router.post("/login", userController.userLogin);

module.exports = router;

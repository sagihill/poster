const express = require("express");
const router = express.Router();

const postsController = require("../controllers/posts");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

router.post("", checkAuth, extractFile, postsController.createPost);

router.put("/:id", checkAuth, extractFile, postsController.updatePost);

router.get("", postsController.getPosts);

router.get("/:id", postsController.getPost);

router.delete("/:id", checkAuth, postsController.removePost);

module.exports = router;

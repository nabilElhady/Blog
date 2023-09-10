const express = require("express");
const router = express.Router();

const { createPost } = require("../controllers/Post");
const { getPosts } = require("../controllers/Post");
const { getPost } = require("../controllers/Post");

router.post("/createPost", createPost);
router.get("/getPosts", getPosts);
router.get("/:id", getPost);
module.exports = router;

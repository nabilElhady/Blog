const express = require("express");
const router = express.Router();

const { createPost } = require("../controllers/Post");

router.post("/createPost", createPost);
module.exports = router;

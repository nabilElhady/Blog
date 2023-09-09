const express = require("express");
const router = express.Router();
const { Register, Login } = require("../controllers/Auth");
router.post("/Login", Login);
router.post("/Register", Register);

module.exports = router;

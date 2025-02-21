
const express = require("express");
const { register, login, getUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", authMiddleware, getUser); // Fetch logged-in user details

module.exports = router;


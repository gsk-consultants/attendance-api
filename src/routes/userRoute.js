const express = require("express");
const router = express.Router();
const authMiddleware = require("../middileware/authMiddleware");
const { getProfile } = require("../controllers/userController");

router.get("/profile", authMiddleware(), getProfile);

module.exports = router;

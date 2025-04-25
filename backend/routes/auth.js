const express = require("express");
const router = express.Router();
const { handleLogin, handleRegister } = require("../controllers/handleAuth");

router.post("/register", handleRegister);

router.post("/login", handleLogin);

module.exports = router;

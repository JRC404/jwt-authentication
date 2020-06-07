const express = require("express");
const router = express.Router();

const jwt = require('jsonwebtoken'); //use to create, verify, and decode tokens
const bcrypt = require('bcryptjs'); //use to hash passwords
const secret = require('../config').secret; //contains secret key used to sign tokens
const User = require("../models/User");

router.post("/register", (req, res) => {
})

router.post("/login", (req, res) => {
})

module.exports = router; //this should the last line of code
const express = require("express");
const router = express.Router();

const jwt = require('jsonwebtoken'); //use to create, verify, and decode tokens
const bcrypt = require('bcryptjs'); //use to hash passwords
const secret = require('../config').secret; //contains secret key used to sign tokens
const User = require("../models/User");

router.post("/register", (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    User.create({
        email: req.body.email,
        password: hashedPassword,
    }).then((user) => {
        // create a token
        let token = jwt.sign({ id: user._id }, secret, {
            expiresIn: 86400 // expires in 24 hours
        })
        return res.status(201).send({ auth: true, token: token })
    })
        .catch((err) => { return res.send(err) })
})

router.post("/login", (req, res) => {
})

module.exports = router; //this should the last line of code
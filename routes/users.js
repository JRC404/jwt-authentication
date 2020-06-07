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
        .catch((err) => {return res.send(err)})
})

router.get('/current-user', function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
        return res.status(403).send({ auth: false, msg: 'No token provided.' });

    jwt.verify(token, secret, function (err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, msg: 'Failed to authenticate token.' });

        User.findById(decoded.id, { password: 0 }, function (err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");

            return res.status(200).send(user);
        });
    });
});

router.post("/login", (req, res) => {
})

module.exports = router; //this should the last line of code
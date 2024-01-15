const express = require('express')
const router = express.Router()
const user = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = "WelcometoDigINfoodwebsite#$%"

router.post("/createuser", [
    body('Name').isLength({ min: 5 }).withMessage('Name is too small. Give Minimum 5 Characters.'),
    body('Email').isEmail().withMessage('Invalid Email Address'),
    body('Password').isLength({ min: 5 }).withMessage('Password is too small. Give Minimum 5 Characters.')
]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ message: errors.array()[0].msg });
        }

        const salt = await bcrypt.genSalt(10)
        let securedPassword = await bcrypt.hash(req.body.Password, salt)

        try {
            const userEmail = await user.findOne({ Email: req.body.Email })
            if (userEmail) {
                return res.status(200).json({ message: "Email already registered. Please Sign In." });
            }
            await user.create({
                Name: req.body.Name,
                Email: req.body.Email,
                Password: securedPassword,
                Location: req.body.Location
            });
            res.json({ success: true });
        }
        catch (error) {
            console.log(error)
            res.json({ message: "Invalid Credentials" });
        }
    })


router.post("/signinuser", [
    body('Email').isEmail().withMessage('Invalid Email Address'),
    body('Password').isLength({ min: 5 }).withMessage('Password is too small. Give Minimum 5 Characters.')
]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ message: errors.array()[0].msg });
        }
        try {
            const userEmail = await user.findOne({ Email: req.body.Email })
            if (!userEmail) {
                return res.status(200).json({ message: "Invaild Email Address. Please Sign Up first." });
            }
            const pwdCompare = await bcrypt.compare(req.body.Password, userEmail.Password)
            if (!pwdCompare) {
                return res.status(200).json({ message: "Incorrect Password" });
            }

            const data = { user: { id: userEmail.id } }
            const authToken = jwt.sign(data, jwtSecret)
            res.json({ message: `Welcome ${userEmail.Name}, you Signed In successfully.`, success: true, authToken: authToken });

        } catch (error) {
            console.log(error)
            res.json({ message: "Invalid Credentials" });
        }
    })

module.exports = router

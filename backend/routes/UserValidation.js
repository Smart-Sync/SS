const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/User");
const Expert = require("../models/Expert");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = "maghyredvcfxswqouynmkljhgfdaswds";

router.post(
  "/createuser",
  body("email", "Invalid Email").isEmail(),
  body("password", "Invalid Password").isLength({ min: 5 }),
  body("name", "Invalid Name").isLength({ min: 5 }),
  async (req, res) => {
    console.log("****");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      let secPassword = await bcrypt.hash(req.body.password, salt);

      console.log("Hashed Password:", secPassword); // Log hashed password

      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

router.post(
  "/loginuser",
  body("email", "Invalid Email").isEmail(),
  body("password", "Invalid Password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;

    try {
      let userdata = await User.findOne({ email });
      if (!userdata) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials" });
      }

      console.log("User Data:", userdata); // Log user data

      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userdata.password
      );

      console.log("Password Comparison Result:", pwdCompare); // Log password comparison result

      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials!" });
      }

      const data = {
        user: {
          id: userdata.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret);

      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);
//Expert login
router.post(
  "/loginexpert",
  body("email", "Invalid Email").isEmail(),
  body("password", "Invalid Password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let userdata = await Expert.findOne({ email });
      
      if (!userdata) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct Email" });
      }
      console.log("UserData",userdata)
    // console.log(" Data:", userdata);

      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userdata.password
      );

      console.log("Password Comparison Result:", pwdCompare); // Log password comparison result

      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials!" });
      }

      const authToken = jwt.sign({ expertId: userdata._id }, "secretKey", {
        expiresIn: "1h",
      });

      // Return success, authToken, and the expert's unique _id
      res.json({
        success: true,
        authToken,
        expertId: userdata._id, // Include expert's _id in the response
        userdata
      });
    } 
    catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);
module.exports = router;

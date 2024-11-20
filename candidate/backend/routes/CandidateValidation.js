const express = require("express");
const {body , validationResult} = require("express-validator");
const router = express.Router();
const Candidate = require("../models/Candidate");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = " kjgruleij9dklii9domkk845509#($* 8mjdfu$$";
router.post(
    "/signupCandidate",
    body("email","Invalid Email").isEmail(),
    body('password',"Invalid Password").isLength({min:5}),
    body("name","Invalid Name"),
    async(req,res) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        try{
            const salt = await bcrypt.genSalt(10);
            let secPassword = await bcrypt.hash(req.body.password,salt);
            console.log("Hashed Password:", secPassword);
            await Candidate.create({
                name: req.body.name,
                password:secPassword,
                email:req.body.email,
            });
            res.json({success:true});

        }catch(error){
            console.log(error);
            res.status(500).json({success:false , error: error.message  })
        }
    }
);

router.post(
    "/loginCandidate",
    body("email", "Invalid Email").isEmail(),
    body("password", "Invalid Password").isLength({ min: 5 }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      let email = req.body.email;
  
      try {
        let userdata = await Candidate.findOne({ email });
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
        console.log("auth",authToken)
        return res.json({ success: true, authToken: authToken });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error.message });
      }
    }

)
router.get('/dashboard', async (req, res) => {
  const token = req.headers['authorization'];
  console.log("token to get dashboard api resonse ",token)
  try {
    const decoded = jwt.verify(token,jwtSecret);
    const user = await Candidate.findById(decoded.user.id);
    console.log(user)
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
});
module.exports = router;
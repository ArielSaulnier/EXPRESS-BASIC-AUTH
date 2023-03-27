const express = require("express");
const {restrictToLoggedinUserOnly} = require("../middlewares/auth");
const { handleUserSignup, handleUserLogin } = require("../controllers/user");

const router = express.Router();

router.post("/register", handleUserSignup);
router.post("/login", handleUserLogin);
router.get("/me", restrictToLoggedinUserOnly, (req,res)=>{
    res.send({name:req.user.name, email: req.user.email});
  })

module.exports = router;

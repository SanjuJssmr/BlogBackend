const express = require("express") 
const { register, login } = require("../controllers/user.js") ;
const userRoute = express.Router();

userRoute.post("/register", register)
userRoute.post("/login", login)

module.exports = userRoute;
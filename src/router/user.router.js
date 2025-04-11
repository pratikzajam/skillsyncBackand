import express from 'express';

import { signup, login, addProfile } from '../controller/user.controller.js'
import { auth } from '../Middleware/auth.middleware.js'

let route = express.Router();


route.post("/signup", signup);
route.get("/login", login);
route.get("/addprofile", addProfile);



export default route



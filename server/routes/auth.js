import express from "express";
import { check } from "express-validator";
import { login } from "../controller/auth.js";

const router = express.Router();

/*
@route_type  : POST
@route_url   : /auth/login
@reout_desc  : user login
@access      : public
*/ 

router.post("/login", [
    check("email", "Please include a valid email.").isEmail(),
    check("password", "Password is required").exists()
],  
login );

export default router;
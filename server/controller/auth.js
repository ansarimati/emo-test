import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

//  new user registration

export const register = async (req, res)  =>  {

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, gender } = req.body;
    console.log("req ki file", req.file)
    const { profile_pic } = req.file; 
    
    try {
        // Check if user already exist
        
        let existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(400).json({ message : "User already exist" });
        } 

        // Hashing password
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);
        
        // Create new user
        let user = new User({ name, email, gender, password : hashedPassword, profile_pic , status: "pending", phone: "" });
        
        user.profile_pic = req.file.path;
        await user.save();

        // Return jwt and user 
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, 
            process.env.JwtSecret, 
            {
                expiresIn: "1h"
            }, (err, token) => {
                if(err) throw err;
                res.json({ token, user });
            } )

    } catch (err) {
        console.log("error", err);
        return res.status(500).json({ message : "Server Error" });
    }
}



// user login 

export const login = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 

    const { email, password } = req.body;

    try {
        // check user exist or not
        const user = await User.findOne({ email });
        if(!user) {
           return res.status(400).json({ message: "Invalid credentials." });
        }
        

        // check passowrd matches
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        
        if(!isPasswordMatch) 
           return res.status(400).json({ message: "Invalid credentials." });

        user.password = undefined;
        // return jwt token
        const payload = {
            user: {
                id: user.id
            }
        };
      
        jwt.sign(payload, process.env.JwtSecret, { expiresIn: "1h" }, 
            (err, token) => {
                if(err) throw err;
                res.json({ token, user });
            })

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error." })
    }
}
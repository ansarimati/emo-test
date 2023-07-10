import { json } from "express";
import User from "../models/User.js";

export const editProfile = async (req, res) => {
  
    try {
    
    const {
        name, 
        email, 
        gender, 
        phone,  
        status, 
        profile_pic
    } = req.body;

    console.log( name, 
        email, 
        gender, 
        phone,  
        status, 
        profile_pic)
    
        await User.findByIdAndUpdate( req.user.id, {
            name, 
            email, 
            gender, 
            phone,  
            status, 
            profile_pic
        });
    

        res.status(200).json({ message: "data updated successfully" });

    } catch (err) { 
        console.log(err);
        res.status(500).json("Server Error.");
    }
}


// export const tempEditProfile = async (req, res) => {
//     const { id } = req.params
//     console.log("id", id);
//     res.json({ message: "temp edit profile" })
// }


export const getAllUsers = async (req, res) => {
    const allUsers = await User.find();
    if(!allUsers) {
        return json.status(404).json("No data to display.");
    }
    res.json({ allUsers });
}
import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },

    email: {
        type: String,
        required: true,
        min: 5,
        max:50,
        unique: true,
    },

    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },

    phone: {
        type: String,
        max: 10
    },

    password: {
        type: String,
        required: true,
        min: 6,
        max: 20,
    },

    status: {
        type: String,
        enum: ["pending", "active", "de-active"],
    },

    profile_pic: {
        type: String
    },
},
    { timestamps: true } 
);

const User = mongoose.model("User", UserSchema);

export default User;
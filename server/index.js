import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import { register } from "./controller/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import bodyParser from "body-parser";


// Configuration 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


app.use(cors());
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


// File storage 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "images");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// Route with file

/* 
@route_type  : POST
@reoute_url  : /auth/register
@desc        : new user registration
@access      : pulic
*/

app.post("/auth/register",  [
    upload.single("profile_pic")
] , register);


// Routes 

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// Mongo steup  

const PORT = process.env.PORT || 6001;

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        app.listen(PORT, ()=> console.log(`Server Running on Port ${PORT}`))
    })
    .catch((err)=> console.log(`Server did not connected ${err}`));
    


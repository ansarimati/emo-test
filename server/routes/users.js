import express from "express";
import auth from "../middleware/auth.js";
import { editProfile, getAllUsers} from "../controller/user.js";

const router = express.Router();

/* 
@route_type  : PUT
@route_url   : /user/edit
@reout_desc  : user info update
@access      : private
*/

router.put("/edit", auth, editProfile);
// router.put("/:id", auth, tempEditProfile);

/* 
@route_type  : GET
@route_url   : /user/allUsers
@reout_desc  : get all users
@access      : private
*/

router.get("/all_users", getAllUsers);


export default router;
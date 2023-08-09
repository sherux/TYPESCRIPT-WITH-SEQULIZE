import express from "express";
const router = express.Router();
import { auth } from "../middleware/auth";
import { upload } from "../util/fileupload";


import {
  addUser,
  getUserDetails,
  getUserLists,
  deleteUser,
  updatedUser,
  userLogin,
  checkAuth,
  userLogout,
  userForgetPassword,
  userResetPassword,
} from "../controllers/user.controller";
// Replace this with your actual multer setup.

// ALL user ROUTES
router.get("/checkAuth", auth, checkAuth);
router.get("/:id", getUserDetails);
router.get("/", getUserLists);
router.post("/add", upload.single("profile"), addUser);
router.post("/login", userLogin);
router.put("/:id", upload.single("profile"), updatedUser);
router.delete("/:id", deleteUser);
router.post("/logout", auth, userLogout);
router.post("/forget-password", userForgetPassword);
router.post("/reset-password", userResetPassword);

export default router;






// SELECT USER1.id ,USER1.username, COURSE.coursename FROM `USER1`INNER JOIN `COURSE` on USER1.id=COURSE.user_idSELECT USER1.id, USER1.username, USER1.email, COURSE.coursename

// SELECT USER1.id, USER1.username, USER1.email, COURSE.coursename
// FROM USER1
// left JOIN COURSE ON USER1.id = COURSE.user_id
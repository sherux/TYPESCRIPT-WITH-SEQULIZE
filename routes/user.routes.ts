import express from "express";
const router = express.Router();
import { auth } from "../middleware/auth";
import { uploads } from "../util/fileupload";
import {
  addUser,
  getUserDetails,
  getUserLists,
  deleteUser,
  updatedUser,
  userLogin,
  checkAuth,
} from "../controllers/user.controller";

// ALL user ROUTES
router.get("/checkAuth", auth, checkAuth);
router.get("/:id", getUserDetails);
router.get("/", getUserLists);
router.post("/add", uploads.array("profile"), addUser);
router.post("/login", userLogin);
router.put("/:id", updatedUser);
router.delete("/:id", deleteUser);

export default router;

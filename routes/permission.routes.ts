import express from "express";
const router = express.Router();
import { addPermission } from "../controllers/permission.controller";

// ALL user ROUTES
// router.get("/checkAuth", auth, checkAuth);
// router.get("/:id", getUserDetails);
// router.get("/", getUserLists);
router.post("/add", addPermission);
// router.post("/login", userLogin);
// router.put("/:id", updatedUser);
// router.delete("/:id", deleteUser);

export default router;

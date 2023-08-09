import express from "express";
const router = express.Router();
import { addQr } from "../controllers/qrcode.controller";

// ALL user ROUTES
// router.get("/checkAuth", auth, checkAuth);
// router.get("/:id", getUserDetails);
// router.get("/", getUserLists);
router.post("/add", addQr);
// router.post("/login", userLogin);
// router.put("/:id", updatedUser);
// router.delete("/:id", deleteUser);

export default router;

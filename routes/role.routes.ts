import express from "express";
const router = express.Router();
import {
  addRole,
  getRoleDetails,
  getRoleLists,
  deleteRole,
  updatedRole,
} from "../controllers/role.controller";

// ALL user ROUTES
router.get("/:id", getRoleDetails);
router.get("/", getRoleLists);
router.post("/add", addRole);
router.put("/:id", updatedRole);
router.delete("/:id", deleteRole);

export default router;

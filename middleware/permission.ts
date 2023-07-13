import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import Role from "../models/role.model";
import Permission from "../models/permission.model";
import { WhereOptions } from "sequelize";

// interface AuthenticatedRequest extends Request {
//   user: any;
// }

const permissionAuthentication = (param1: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("token");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    var errorMessage;
    try {
      Role.hasMany(Permission, { foreignKey: "id" });
      Permission.belongsTo(Role, { foreignKey: "role_id" });
      User.hasOne(Role, { foreignKey: "id" });
      Role.belongsTo(User, { foreignKey: "role_id" });

      const decoded: any = jwt.verify(token, "Abbas ali");
      req.user = decoded;
      const getUserId = decoded.id;
      const checkUserId: any = await User.findOne({
        where: { id: getUserId } as WhereOptions,
      });
      const getRoleIdData = checkUserId.dataValues.role_id;

      const getPermissionData = await Permission.findAll({
        where: { role_id: getRoleIdData },
      });
      let allow = false;

      getPermissionData.forEach((element: any) => {
        if (req.method === "POST" && element.dataValues.add) {
          allow = true;
        } else if (req.method === "GET" && element.dataValues.view) {
          allow = true;
        } else if (req.method === "PUT" && element.dataValues.edit) {
          allow = true;
        } else if (req.method === "DELETE" && element.dataValues.delete) {
          allow = true;
        }
      });

      if (allow) {
        next();
      } else {
        return res.status(200).json({
          message: `You don't have access to ${param1} product`,
        });
      }
    } catch (err) {
      return res.status(400).json({
        message: "Error in middleware",
      });
    }
  };
};

export default permissionAuthentication;

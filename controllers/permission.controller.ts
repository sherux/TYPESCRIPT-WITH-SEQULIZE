import { RequestHandler } from "express";
import PERMISIION from "../models/permission.model";

import { changeTime, changeTimeFormat } from "../util/common";

export const addPermission: RequestHandler = async (req, res) => {
  try {
    const permisionData = new PERMISIION({
      role_id: req.body.roleId,
      add: req.body.add,
      edit: req.body.edit,
      deleted: req.body.deleted,
      view: req.body.view,
    });

    const permissionDataSave = await permisionData.save();
    res
      .status(200)
      .json({ message: "Data successfully created", data: permissionDataSave });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

// export const getUserDetails: RequestHandler = async (req, res) => {
//   try {
//     ROLE.hasOne(USER, { foreignKey: "id" });
//     USER.belongsTo(ROLE, { foreignKey: "role_id" });

//     const userId: string = req.params.id;
//     const userData: any = await USER.findOne({
//       where: { id: userId } as WhereOptions,
//       include: [{ model: ROLE }],
//     });
//     if (!userData)
//       return res.status(400).json({ message: "user data not found" });
//     userData.dataValues.createdAt = changeTimeFormat(
//       userData.dataValues.createdAt
//     );
//     userData.dataValues.updatedAt = changeTimeFormat(
//       userData.dataValues.updatedAt
//     );

//     res
//       .status(200)
//       .json({ message: "data successfully fetched", data: userData });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getUserLists: RequestHandler = async (req, res) => {
//   try {
//     ROLE.hasOne(USER, { foreignKey: "id" });
//     USER.belongsTo(ROLE, { foreignKey: "role_id" });
//     const userData = await USER.findAll({ include: [{ model: ROLE }] });

//     if (!userData)
//       return res.status(400).json({ message: "user data not found" });
//     await changeTime(userData);

//     res.status(200).json({ message: "data succesfully fetch", data: userData });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

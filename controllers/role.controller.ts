import { RequestHandler } from "express";
import PERMISIION from "../models/permission.model";
import ROLE from "../models/role.model";
import { WhereOptions } from "sequelize";
import { changeTime, changeTimeFormat } from "../util/common";
export const addRole: RequestHandler = async (req, res) => {
  try {
    const roleName: string = req.body.roleName;
    const roleNameExist = await ROLE.findOne({
      where: { role_name: roleName },
    });
    if (roleNameExist)
      return res.status(400).json({ message: "roleName already exists" });

    const roleData = new ROLE({
      role_name: req.body.roleName,
      status: req.body.status,
    });

    const roleDataSave = await roleData.save();
    res
      .status(200)
      .json({ message: "Data successfully created", data: roleDataSave });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

export const getRoleDetails: RequestHandler = async (req, res) => {
  try {
    ROLE.hasMany(PERMISIION, { foreignKey: "id" });
    PERMISIION.belongsTo(ROLE, { foreignKey: "role_id" });

    const roleId: string = req.params.id;
    const roleData: any = await ROLE.findOne({
      where: { id: roleId } as WhereOptions,
      include: [{ model: PERMISIION, attributes: ["id", "role_id"] }],
    });

    if (!roleData)
      return res.status(400).json({ message: "role data not found" });
    roleData.dataValues.createdAt = changeTimeFormat(
      roleData.dataValues.createdAt
    );
    roleData.dataValues.updatedAt = changeTimeFormat(
      roleData.dataValues.updatedAt
    );
    res
      .status(200)
      .json({ message: "data successfully fetched", data: roleData });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getRoleLists: RequestHandler = async (req, res) => {
  try {
    const roleData = await ROLE.findAll();

    if (!roleData)
      return res.status(400).json({ message: "role data not found" });
    await changeTime(roleData);
    res.status(200).json({ message: "data succesfully fetch", data: roleData });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRole: RequestHandler = async (req, res) => {
  try {
    const roleId: string = req.params.id;

    const roleData = await ROLE.findOne({
      where: { id: roleId } as WhereOptions,
    });
    if (!roleData)
      return res.status(400).json({ message: "role data not found" });
    const deleteData = await ROLE.destroy({
      where: { id: roleId } as WhereOptions,
    });
    res
      .status(200)
      .json({ message: "Data succesfully deleted", data: deleteData });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updatedRole: RequestHandler = async (req, res) => {
  try {
    const roleId: string = req.params.id;

    const roleData = await ROLE.findOne({
      where: { id: roleId } as WhereOptions,
    });
    if (!roleData)
      return res.status(400).json({ message: "role data not found" });

    const updatedData = await ROLE.update(
      {
        role_name: req.body.roleName,
        status: req.body.status,
      },
      {
        where: { id: roleId } as WhereOptions,
      }
    );
    res
      .status(200)
      .json({ message: "Data succesfully updated", data: updatedData });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

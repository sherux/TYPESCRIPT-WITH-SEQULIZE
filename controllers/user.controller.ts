import { RequestHandler } from "express";
import USER from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { WhereOptions } from "sequelize";
import ROLE from "../models/role.model";
import { changeTime, changeTimeFormat } from "../util/common";

export const checkAuth: RequestHandler = async (req: any, res) => {
  res.status(200).json({ message: "user authentication", users: req.user });
};

export const addUser: RequestHandler = async (req, res) => {
  try {
    const email: string = req.body.email;
    const emailExist = await USER.findOne({
      where: { email: email },
    });
    if (emailExist)
      return res.status(400).json({ message: "Email already exists" });

    const hashpassword = await bcrypt.hash(req.body.password, 12);

    // Check if a file was uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Please upload files" });
    }
    let image;
    if (req.files) {
      var path: any = "";
      req.files.forEach(function (files: any, index: number, arr: any) {
        console.log("forEach console", files.filename);
        path = path + files.filename + ",";
      });
      path = path.substring(0, path.lastIndexOf(","));
      image = path;
    }

    const userData = new USER({
      name: req.body.name,
      email: req.body.email,
      password: hashpassword,
      mobile_no: req.body.mobileno,
      city: req.body.city,
      image: path,
      role_id: req.body.roleId,
    });

    const userDataSave = await userData.save();
    res
      .status(200)
      .json({ message: "Data successfully created", data: userDataSave });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

export const getUserDetails: RequestHandler = async (req, res) => {
  try {
    ROLE.hasOne(USER, { foreignKey: "id" });
    USER.belongsTo(ROLE, { foreignKey: "role_id" });

    const userId: string = req.params.id;
    const userData: any = await USER.findOne({
      where: { id: userId } as WhereOptions,
      include: [{ model: ROLE }],
    });
    if (!userData)
      return res.status(400).json({ message: "user data not found" });
    userData.dataValues.createdAt = changeTimeFormat(
      userData.dataValues.createdAt
    );
    userData.dataValues.updatedAt = changeTimeFormat(
      userData.dataValues.updatedAt
    );

    res
      .status(200)
      .json({ message: "data successfully fetched", data: userData });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserLists: RequestHandler = async (req, res) => {
  try {
    ROLE.hasOne(USER, { foreignKey: "id" });
    USER.belongsTo(ROLE, { foreignKey: "role_id" });
    const userData = await USER.findAll({ include: [{ model: ROLE }] });

    if (!userData)
      return res.status(400).json({ message: "user data not found" });
    await changeTime(userData);

    res.status(200).json({ message: "data succesfully fetch", data: userData });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const userId: string = req.params.id;

    const userData = await USER.findOne({
      where: { id: userId } as WhereOptions,
    });
    if (!userData)
      return res.status(400).json({ message: "user data not found" });
    const deleteData = await USER.destroy({
      where: { id: userId } as WhereOptions,
    });
    res
      .status(200)
      .json({ message: "Data succesfully deleted", data: deleteData });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updatedUser: RequestHandler = async (req, res) => {
  try {
    const userId: string = req.params.id;

    const userData = await USER.findOne({
      where: { id: userId } as WhereOptions,
    });
    if (!userData)
      return res.status(400).json({ message: "user data not found" });

    const updatedData = await User.update(
      {
        mobile_no: req.body.mobileno,
        city: req.body.city,
      },
      {
        where: { id: userId } as WhereOptions,
      }
    );
    res
      .status(200)
      .json({ message: "Data succesfully updated", data: updatedData });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const userLogin: RequestHandler = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userData = await USER.findOne({
      where: { email: email },
    });
    if (!userData) return res.status(400).json({ message: "Email not found" });

    const validPassword = await bcrypt.compare(password, userData.password);
    if (!validPassword)
      return res.status(400).json({ message: "Password is invalid" });

    const token = jwt.sign(
      { id: userData.id, email: userData.email },
      "Abbas ali",
      {
        expiresIn: "365d",
      }
    );
    res
      .header("token", token)
      .status(200)
      .json({ message: "Login Successfully", token: token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

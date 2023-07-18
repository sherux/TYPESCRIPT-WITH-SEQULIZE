import { RequestHandler } from "express";
import USER from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { Op, WhereOptions } from "sequelize";
import ROLE from "../models/role.model";
import { changeTime, changeTimeFormat } from "../util/common";
import Sequelize from "sequelize";
import { sendResetPasswordEmail } from "../util/nodemailer";
import { uploadFile } from "../util/fileupload";
const attributes: any = [
  ["id", "id"],
  ["name", "Name"],
  ["mobile_no", "mobileNo"],
  ["email", "email"],
  ["city", "city"],
  ["password", "password"],
  ["role_id", "roleId"],
  ["image", "image"],
  ["createdAt", "createdAt"],
  ["updatedAt", "updatedAt"],
];

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
    const imageReq = req.file as any
    const imageData: any = await uploadFile(imageReq)



    // Check if a file was uploaded
    // if (!req.files) {
    //   return res.status(400).json({ message: "Please upload files" });
    // }
    // let image;
    // if (req.files) {
    //   var path: any = "";
    //   req.files.forEach(function (files: any, index: number, arr: any) {
    //     path = path + files.filename + ",";
    //   });
    //   path = path.substring(0, path.lastIndexOf(","));
    //   image = path;
    // }

    const userData = new USER({
      name: req.body.name,
      email: req.body.email,
      password: hashpassword,
      mobile_no: req.body.mobileNo,
      city: req.body.city,
      image: imageData.Location,
      token: "",
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

      attributes: [
        ["id", "id"],
        ["name", "Name"],
        ["mobile_no", "mobileNo"],
        ["email", "email"],
        ["city", "city"],
        ["password", "password"],
        ["role_id", "roleId"],
        ["image", "image"],
        ["createdAt", "createdAt"],
        ["updatedAt", "updatedAt"],
        [Sequelize.col("ROLE.role_name"), "roleName"],
      ],

      include: [{ model: ROLE, attributes: [] }],
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
    const { pageNo, totalRecord } = req.query;
    const bodyData = req.body;
    const pageNumber = parseInt(pageNo as string, 10) || 0;
    const itemsPerPage = parseInt(totalRecord as string, 10) || 5;
    const columnName = "createdAt";
    let whereClause = {};

    const whereArr = [];
    if (bodyData.name) {
      whereArr.push({ name: { [Op.like]: `%${bodyData.name}%` } });
    }

    if (bodyData.email) {
      whereArr.push({ email: { [Op.like]: `%${bodyData.email}%` } });
    }

    whereClause = {
      [Op.and]: whereArr,
    };

    const { count, rows: data } = await USER.findAndCountAll({
      where: whereClause,
      order: [[columnName, "ASC"]],
      offset: pageNumber * itemsPerPage,
      limit: itemsPerPage,
      attributes,
    });

    if (data.length) {
      await changeTime(data);
    }

    res.status(200).json({
      message: "data succesfully fetch",
      data: data,
      pagination: {
        total: count,
        itemsPerPage: totalRecord,
        page: pageNo,
        lastPage: Math.ceil(count / itemsPerPage),
      },
    });
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
        mobile_no: req.body.mobileNo,

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
    await USER.update({ token: token }, { where: { id: userData.id } } as any);
    res
      .header("token", token)
      .status(200)
      .json({ message: "Login Successfully", token: token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const userLogout: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const userId = req.user.id;
    const user = await USER.findByPk(userId);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    user.token = null;
    user.save();
    res.status(200).json({ message: "Logout Successfully" });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export const userForgetPassword: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const user = await USER.findOne({
      where: { email: req.body.email },
    });
    if (user) {
      const token = jwt.sign({ id: user.id, email: user.email }, "Abbas ali", {
        expiresIn: "15m",
      });
      await user.save();
      await sendResetPasswordEmail(user.email, token);
      return res
        .status(200)
        .json({ message: "Link succesfully send in your register email" });
    } else {
      res.status(400).json({ message: "Email not found" });
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const userResetPassword: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const token: string = req.query.token;
    const decoded: any = jwt.verify(token, "Abbas ali");
    const user = await User.findOne({ where: { id: decoded.id } } as any);

    const tokenData: any = await User.findOne({ token } as any);
    console.log(tokenData);

    if (tokenData) {
      const password = req.body.password;
      const confirmationPassword = req.body.confirmationPassword;
      if (password === confirmationPassword) {
        const newPassword = await bcrypt.hash(password, 12);

        await User.update({ password: newPassword, token: null } as any, {
          where: { id: tokenData.id } as any,
          returning: true,
        });

        await user.save();

        res.status(200).json({ message: "reset password succesfully" });
      } else {
        res
          .status(400)
          .json({ message: "confirmPassword and password does not match" });
      }
    } else {
      res.status(400).json({ message: "link expired" });
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

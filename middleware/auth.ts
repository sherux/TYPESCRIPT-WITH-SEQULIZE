import { RequestHandler } from "express";
require("dotenv").config();

const jwt = require("jsonwebtoken");

export const auth: RequestHandler = (req: any, res, next) => {
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Unathorization " });

  try {
    // const decoded = jwt.verify(token, "Abbas ali");
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN as string,
    );

    req.user = decoded;
    next();
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

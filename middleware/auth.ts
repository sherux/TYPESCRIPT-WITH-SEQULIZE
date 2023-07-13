import { RequestHandler } from "express";

const jwt = require("jsonwebtoken");

export const auth: RequestHandler = (req: any, res, next) => {
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Unathorization " });

  try {
    const decoded = jwt.verify(token, "Abbas ali");
    req.user = decoded;
    next();
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

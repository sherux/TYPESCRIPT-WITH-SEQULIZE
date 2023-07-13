import { RequestHandler } from "express";
import PRODUCT from "../models/product.model";
import { WhereOptions } from "sequelize";
import { changeTime, changeTimeFormat } from "../util/common";

export const addProduct: RequestHandler = async (req, res) => {
  try {
    const productData = new PRODUCT({
      product_name: req.body.product_name,
      product_price: req.body.product_price,
      product_description: req.body.product_description,
    });

    const productDataSave = await productData.save();
    res
      .status(200)
      .json({ message: "Data successfully created", data: productDataSave });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

export const getProductDetails: RequestHandler = async (req, res) => {
  try {
    const productId: string = req.params.id;
    const productData: any = await PRODUCT.findOne({
      where: { id: productId } as WhereOptions,
    });
    if (!productData)
      return res.status(400).json({ message: "product data not found" });
    productData.dataValues.createdAt = changeTimeFormat(
      productData.dataValues.createdAt
    );
    productData.dataValues.updatedAt = changeTimeFormat(
      productData.dataValues.updatedAt
    );

    res
      .status(200)
      .json({ message: "data successfully fetched", data: productData });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductLists: RequestHandler = async (req, res) => {
  try {
    const productData = await PRODUCT.findAll({});

    if (!productData)
      return res.status(400).json({ message: "product data not found" });
    await changeTime(productData);

    res
      .status(200)
      .json({ message: "data succesfully fetch", data: productData });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct: RequestHandler = async (req, res) => {
  try {
    const productId: string = req.params.id;

    const productData = await PRODUCT.findOne({
      where: { id: productId } as WhereOptions,
    });
    if (!productData)
      return res.status(400).json({ message: "product data not found" });
    const deleteData = await PRODUCT.destroy({
      where: { id: productId } as WhereOptions,
    });
    res
      .status(200)
      .json({ message: "Data succesfully deleted", data: deleteData });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updatedProduct: RequestHandler = async (req, res) => {
  try {
    const productId: string = req.params.id;

    const productData = await PRODUCT.findOne({
      where: { id: productId } as WhereOptions,
    });
    if (!productData)
      return res.status(400).json({ message: "product data not found" });

    const updatedData = await PRODUCT.update(
      {
        product_price: req.body.product_price,
        product_description: req.body.product_description,
      },
      {
        where: { id: productId } as WhereOptions,
      }
    );
    res
      .status(200)
      .json({ message: "Data succesfully updated", data: updatedData });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

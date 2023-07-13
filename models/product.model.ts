import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db"; // Assuming sequelize is properly configured in a separate file
interface ProductModelAttributes {
  product_name: string;
  product_price: string;
  product_description: string;
}

class Product
  extends Model<ProductModelAttributes>
  implements ProductModelAttributes
{
  public product_name!: string;
  public product_price!: string;
  public product_description!: string;
  id: any;
}

Product.init(
  {
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products", // Adjust the table name as per your requirement
  }
);

export default Product;

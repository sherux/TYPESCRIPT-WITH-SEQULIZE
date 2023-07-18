import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db"; // Assuming sequelize is properly configured in a separate file
interface UserModelAttributes {
  name: string;
  email: string;
  password: string;
  mobile_no: string;
  city: string;
  image: string;
  role_id: string;
  token: string;
}

class User extends Model<UserModelAttributes> implements UserModelAttributes {
  public name!: string;
  public email!: string;
  public password!: string;
  public mobile_no!: string;
  public city!: string;
  public image!: string;

  public role_id!: string;
  public token!: string;

  id: any;
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users", // Adjust the table name as per your requirement
  }
);

export default User;

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db"; // Assuming sequelize is properly configured in a separate file
interface PermissionModelAttributes {
  role_id: string;
  add: boolean;
  edit: boolean;

  deleted: boolean;

  view: boolean;
}

class Permission
  extends Model<PermissionModelAttributes>
  implements PermissionModelAttributes {

  public role_id!: string;
  public add!: boolean;
  public edit!: boolean;
  public deleted!: boolean;
  public view!: boolean;

  id: any;
}

Permission.init(
  {
    role_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    add: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    edit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    view: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Permission",
    tableName: "permissions", // Adjust the table name as per your requirement
  }
);

export default Permission;

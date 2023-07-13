import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db"; // Assuming sequelize is properly configured in a separate file
interface RoleModelAttributes {
  role_name: string;
  status: boolean;
}

class Role extends Model<RoleModelAttributes> implements RoleModelAttributes {
  public role_name!: string;
  public status!: boolean;
  id: any;
}

Role.init(
  {
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ROLE",
    tableName: "Role", // Adjust the table name as per your requirement
  }
);

export default Role;

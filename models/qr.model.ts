import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db"; // Assuming sequelize is properly configured in a separate file
interface QrcodeModelAttributes {
    content: string;

}

class Qrcode extends Model<QrcodeModelAttributes> implements QrcodeModelAttributes {

    public content!: string;

    id: any;
}

Qrcode.init(
    {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Qrcode",
        tableName: "qrcode", // Adjust the table name as per your requirement
    }
);

export default Qrcode;

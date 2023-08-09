const express = require("express");
const app = express();
import { sequelize } from "./util/db";

const PORT = process.env.PORT || 7000;
require("dotenv").config();

app.use(express.json());
import userRoutes from "./routes/user.routes";
import rolerRoutes from "./routes/role.routes";
import productRoutes from "./routes/product.routes";
import permissionsRoutes from "./routes/permission.routes";


app.use("/user", userRoutes);
app.use("/role", rolerRoutes);
app.use("/product", productRoutes);
app.use("/permission", permissionsRoutes);


// console.log(process.env);
// -----------------------------------connect to the database----------------------

sequelize
  .sync({})
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Running at port ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.log("Error connecting the database", err);
  });





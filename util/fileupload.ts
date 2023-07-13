const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
require("dotenv").config();
const uniqid = require("uniqid");
import fs from "fs";

// ------------------------------file upload on aws s3---------------------

// const accessKeyId = process.env.AWS_ID;
// const secretAccessKey = process.env.AWS_SECRET;
// const bucketName = process.env.AWS_BUCKET;

// const s3 = new AWS.S3({
//   accessKeyId,
//   secretAccessKey,
//   region: "Asia Pacific (Mumbai) ap-south-1",
// });

// const path = uniqid();

// export const upload = multer({
//   storage: multerS3({
//     s3,
//     bucket: bucketName,

//     metadata: function (req: any, file: any, cb: any) {
//       cb(null, { fieldName: path });
//     },
//     key: function (req: any, file: any, cb: any) {
//       cb(null, path + "." + file.originalname.split(".")[1]);
//     },
//   }),
// });

//-----------------------------------IMGES UPLOADED FOLDER------------------

const uploadDestination = "./uploads";

if (!fs.existsSync(uploadDestination)) {
  fs.mkdirSync(uploadDestination);
}

const upload = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, uploadDestination);
  },

  filename: (req: any, file: any, cb: any) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
export const uploads = multer({ storage: upload, array: true });

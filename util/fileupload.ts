const multer = require("multer");
const multerS3 = require("multer-s3");
// const AWS = require("aws-sdk");
// require("dotenv").config();
// const uniqid = require("uniqid");
import fs from "fs";

// ------------------------------file upload on aws s3---------------------
// var accessKeyId;
// var secretAccessKey;
// accessKeyId = "AKIATCIR3XZPEREO4DNG";
// secretAccessKey = "yl25boYSeAFkg7xdYgdbFviQxfqPtYVaay/ZzGi";
// const bucketName = "123abbas-sheru"

// const s3 = new AWS.S3({
//   accessKeyId: "AKIATCIR3XZPEREO4DNG",
//   secretAccessKey: "yl25boYSeAFkg7xdYgdbFviQxfqPtYVaay/ZzGi",
// });

// const path = uniqid();

// export const upload: any = multer({
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



// var accessKeyId;
// var secretAccessKey;
// accessKeyId = "AKIATCIR3XZPEREO4DNG";
// secretAccessKey = "yl25boYSeAFkg7xdYgdbFviQxfqPtYVaay/ZzGi";
// const bucketName = "123abbas-sheru"

// const s3: any = new AWS.S3({
//   accessKeyId: "AKIATCIR3XZPEREO4DNG",
//   secretAccessKey: "yl25boYSeAFkg7xdYgdbFviQxfqPtYVaay/ZzGi",
//   region: "ap-south-1", // Replace with your desired AWS region
// });

// const path = uniqid();

// const upload = multer({
//   storage: multerS3({
//     s3,
//     bucket: bucketName,
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: path });
//     },
//     key: function (req, file, cb) {
//       cb(null, path + "." + file.originalname.split(".")[1]);
//     },
//   }),
// });

// export { upload };

// const s3: any = new AWS.S3({
//   accessKeyId: "AKIATCIR3XZPEREO4DNG",
//   secretAccessKey: "yl25boYSeAFkg7xdYgdbFviQxfqPtYVaay/ZzGi",
//   region: "ap-south-1", // Replace with your desired AWS region
// });
// const bucketName = 'your-aws-bucket-name';

// // Multer-S3 Configuration
// export const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: bucketName,
//     acl: 'public-read', // Change to 'private' if you want to restrict access
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString()); // Generate unique filenames
//     },
//   }),
// });

import { config as dotenvConfig } from 'dotenv';
import { createReadStream } from 'fs';
import AWS from 'aws-sdk';

// Load environment variables from .env file
dotenvConfig();



const bucketName: string = process.env.AWS_BUCKET as string;
const region: string = process.env.AWS_BUCKET_REGION as string;
const accessKeyId: string = process.env.AWS_ID as string;
const secretAccessKey: string = process.env.AWS_SECRET as string;

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// Uploads a file to S3
export function uploadFile(
  file: Express.Multer.File
): Promise<AWS.S3.ManagedUpload.SendData> {
  const fileStream = createReadStream(file.path);

  const uploadParams: AWS.S3.PutObjectRequest = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}
;

// Update uploadFile function to use multer and AWS S3


// Downloads a file from S3
// function getFileStream(fileKey: string): NodeJS.ReadableStream {
//     const downloadParams: AWS.S3.GetObjectRequest = {
//         Key: fileKey,
//         Bucket: bucketName,
//     };

//     return s3.getObject(downloadParams).createReadStream();
// }
// export { getFileStream };
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
export const uploads = multer({ storage: upload });
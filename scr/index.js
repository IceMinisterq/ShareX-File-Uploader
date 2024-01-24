const express              = require("express");
const formidableMiddleware = require("express-formidable");
const fs                   = require("fs");
const randomstring         = require("randomstring");
const path                 = require("path");
const config               = require("./config.json")

const UPLOAD_PATH      = config["Upload Path"]
const BASE_URL         = config["Base URL"]
const AUTHORIZATION    = config.Authorization
const FILE_NAME_LENGHT = config["File Name Lenght"]
const PORT             = config.Port


const server = express();

server.use(formidableMiddleware());

server.post("/upload", (req, res) => {
  const field = req.fields

  const authKey = field.authorization || "NONE";

  if (! authKey || authKey != AUTHORIZATION) {
    return res.status(401).end("Not authorized");
  }

  if (! req.files || typeof(req.files) != "object") {
    return res.status(401).end("Not authorized."); // I honestly don't even know why i even made this check in the first place
  }

  const files = Object.values(req.files);

  if (files.length === 0) {
    return res.status(400).end("No files uploaded.");
  } else if (files.length > 1) {
    return res.status(400).end("Only 1 file can be uploaded per request!");
  }

  const file       = files[0];
  const filePath   = file.path;
  const fileFormat = path.extname(file.name).toLowerCase();

  const generatedName = randomstring.generate({
    length: FILE_NAME_LENGHT,
    charset: "alphanumeric",
  });

  const fileName = generatedName + fileFormat;

  const destinationPath = `${UPLOAD_PATH}${fileName}`;
  const urlDestination  = `${BASE_URL}${fileName}`;

  fs.copyFile(filePath, destinationPath, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).end(`Error while saving file ${fileName}.`);
    }
  });

  return res.status(202).end(urlDestination);
})

server.listen(PORT, () => {
  console.log(`Share X file host is running on port ${PORT}`);

  if (AUTHORIZATION === "YOUR_AUTORIZATION") {
    console.warn("[WARNING] Please change the AUTHORIZATION Key. Leaving it as default could pose serious security risks.");
  }
});
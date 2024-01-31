const randomstring = require("randomstring");
const path         = require("path");
const fileUpload   = require("express-fileupload");
const express      = require("express");

const config       = require("./config.json");

const UPLOAD_PATH      = config["Upload Path"];
const BASE_URL         = config["Base URL"];
const AUTHORIZATION    = config.Authorization;
const FILE_NAME_LENGHT = config["File Name Lenght"];
const PORT             = config.Port;


const app = express();

app.use(fileUpload());

app.post("/upload", (req, res) => {
  const field = req.body || {}

  const authKey = field["authorization"] || "NONE";

  if (! authKey || authKey != AUTHORIZATION) {
    return res.status(401).end("Not authorized 1");
  }

  if (! req.files || typeof(req.files) != "object") {
    return res.status(401).end("Not authorized 2"); // I honestly don't even know why i even made this check in the first place
  }

  const files = Object.values(req.files);

  if (files.length === 0) {
    return res.status(400).end("No files uploaded.");
  } else if (files.length > 1) {
    return res.status(400).end("Only 1 file can be uploaded per request!");
  }

  const file       = files[0];
  const fileFormat = path.extname(file.name).toLowerCase();

  const generatedName = randomstring.generate({
    length: FILE_NAME_LENGHT,
    charset: "alphanumeric",
  });

  const fileName = generatedName + fileFormat;

  // console.log(generatedName + fileFormat, fileName)

  const destinationPath = `${UPLOAD_PATH}${fileName}`;
  const urlDestination  = `${BASE_URL}${fileName}`;

  // console.log(destinationPath)
  
  file.mv(destinationPath, function(err){
    if (err) {
      console.log(`err : ${err}`);
      return res.status(500).end(`Error while saving file ${file.name}.`);
    }
  });

  return res.status(202).end(urlDestination);
})


app.listen(PORT, () => {
  console.log(`Share X file host is running on port ${PORT}`);

  if (AUTHORIZATION === "YOUR_AUTORIZATION") {
    console.warn("[WARNING] Please change the AUTHORIZATION Key. Leaving it as default could pose serious security risks.");
  }
});

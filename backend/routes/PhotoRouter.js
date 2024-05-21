const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const processFormBody = multer({ storage: multer.memoryStorage() }).single(
  "uploadedphoto"
);
const fs = require("fs");
router.post("/new/:userId", async (request, response) => {
  const userId = request.params.userId;
  console.log(userId + " new photo");
  processFormBody(request, response, function (err) {
    if (err || !request.file) {
      response.status(400).send(JSON.stringify(err));
      return;
    }
    var timestamp = new Date().valueOf();
    var filename = request.file.originalname;
    console.log(filename);
    fs.writeFile("./images/" + filename, request.file.buffer, function (err) {
      if (err) {
        response.status(400).send(JSON.stringify(err));
        console.log("loii1");
      } else {
        Photo.create({
          file_name: filename,
          date_time: timestamp,
          user_id: userId,
          comments: [],
        });
      }
    });
  });
});
router.get("/images/:filename", (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, "../images", filename);
  res.sendFile(imagePath);
});
router.get("/:id", async (req, res) => {
  var id = req.params.id;
  // console.log(id);
  Photo.find({ user_id: id })
    .then((photo) => {
      if (!photo) {
        console.log("User with _id:" + id + " not found.");
        return res.status(400).send("Not found");
      }

      return res.status(200).send(photo);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send("Internal server error");
    });
});
router.get("/", async (req, res) => {
  console.log("lay data : " + req.session.login_name);
  try {
    const photo = await Photo.find({});
    if (photo) {
      res.status(200).json(photo);
    } else {
      res.status(404).send("No users found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving users");
  }
});
module.exports = router;

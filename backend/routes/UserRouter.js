const express = require("express");
const User = require("../db/userModel"); // Assuming userModel defines the User model
const router = express.Router();

// Improved GET Route for Retrieving Users:
router.get("/list", async (request, response) => {
  try {
    const users = await User.find({});
    if (users) {
      response.status(200).json(users); // Send users data with appropriate status code
    } else {
      response.status(400).send("No users found"); // Send clear message if no users found
    }
  } catch (error) {
    // Handle errors gracefully
    console.error(error); // Log the error for debugging
    response.status(500).send("Error retrieving users"); // Send generic error message
  }
});
router.get("/name/:userid", (req, res) => {
  const userid = req.params.userid;
  User.findOne({ _id: userid })
    .then((user) => {
      if (!user) {
        return res.status(400).send("Not found");
      }

      return res.status(200).send(user.first_name);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send("Internal server error"); // Handle errors appropriately
    });
});
router.get("/:id", async (req, res) => {
  var id = req.params.id;
  // console.log(id);
  User.findOne({ _id: id })
    .then((user) => {
      if (!user) {
        console.log("User with _id:" + id + " not found.");
        return res.status(400).send("Not found");
      }

      const indUser_cleanUp = {
        _id: user._id,
        last_name: user.last_name,
        location: user.location,
        description: user.description,
        occupation: user.occupation,
      };
      return res.status(200).send(indUser_cleanUp);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send("Internal server error"); // Handle errors appropriately
    });
});

router.post("/", async (request, response) => {
  try {
    if (request.body.login_name) {
      const user = await User.findOne({ login_name: request.body.login_name });
      if (user === null) {
        if (
          request.body.first_name !== "" &&
          request.body.last_name !== "" &&
          request.body.password !== ""
        ) {
          await User.create({
            first_name: request.body.first_name,
            last_name: request.body.last_name,
            location: request.body.location,
            description: request.body.description,
            occupation: request.body.occupation,
            login_name: request.body.login_name,
            password: request.body.password,
            latest_act: "Registered as a user",
          });
          response.status(200).send("Create user success");
        } else {
          response.status(400).send("Missing information");
        }
      } else {
        response.status(400).send("Exist user name");
      }
    }
  } catch (err) {
    response.status(400).send(JSON.stringify(err));
  }
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs-react");
const User = require("../db/userModel");
const router = express.Router();
router.post("/login", async (request, response) => {
  try {
    const { login_name, password } = request.body;
    const user = await User.findOne({ login_name });
    if (!user) {
      console.log("ko thay user");
      return response.status(401).send("Invalid username or password");
    }

    // Compare hashed password instead of plain text
    const passwordMatch = await bcrypt.compareSync(password, user.password);
    console.log(passwordMatch);
    if (!passwordMatch) {
      console.log("ko dung mat khau");
      return response.status(401).send("Invalid username or password");
    }

    // request.session.user_id = user._id;
    // request.session.login_name = user.login_name;
    // console.log(request.session.login_name);
    response.status(200).send(user);
  } catch (error) {
    console.error("Login error:", error);
    response.status(500).send("Internal server error");
  }
});

router.post("/register", async function (request, response) {
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
router.post("/logout", async (request, response) => {
  if (request.session.login_name && request.session.user_id) {
    delete request.session["login_name"];
    delete request.session["user_id"];
    request.session.destroy(function (err) {
      response.status(400).send(JSON.stringify(err));
    });
    response.status(200).send("Successfully Logout");
  } else {
    response.status(400).send("Logout Failed");
  }
});
module.exports = router;

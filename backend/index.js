const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect.cjs");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
const CommentRouter = require("./routes/CommentRouter");
const LoginRouter = require("./routes/LoginRouter");

dbConnect();
app.use(cors());
// app.use(
//   session({
//     secret: "your_secret_key",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );
app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/photo", PhotoRouter);
app.use("/api/comment", CommentRouter);
app.use("/api/credential", LoginRouter);
app.get("/", (request, response) => {
  response.send({ message: "Hello from photo-sharing app API!" });
});
app.listen(8081, () => {
  console.log("server listening on port 8081");
});

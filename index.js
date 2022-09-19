const express = require("express");
// const multer = require('multer');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const articleRoute = require("./routes/article");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const cors = require("cors");
const path = require("path");

dotenv.config();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected  to db"))
  .catch((err) => console.log(err));

app.get("/* ", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/article", articleRoute);

app.use(express.static(path.join(__dirname, "/client/build")));

app.listen(process.env.PORT || 5000, () => {
  console.log(`server is running on port ${process.env.PORT || 5000}`);
});

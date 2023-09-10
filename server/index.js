const express = require("express");
const app = express();
const authRoutes = require("./routes/Auth");
const postRoutes = require("./routes/Post");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
app.use("/uploads", express.static(__dirname + "/uploads"));

const port = 3001;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Set the filename to be unique
  },
});
const uploadedimgs = multer({ storage: storage });

app.get("/test", (req, res) => {
  res.json("test ok");
});
app.use("/Auth", authRoutes);
app.use("/post", uploadedimgs.single("file"), postRoutes);
mongoose
  .connect(
    "mongodb://nabilelhady73:1952634875@ac-ihxua3p-shard-00-00.25wupk4.mongodb.net:27017,ac-ihxua3p-shard-00-01.25wupk4.mongodb.net:27017,ac-ihxua3p-shard-00-02.25wupk4.mongodb.net:27017/?ssl=true&replicaSet=atlas-wyz93w-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() =>
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    })
  )
  .catch((err) => {
    console.log("error", err);
  });

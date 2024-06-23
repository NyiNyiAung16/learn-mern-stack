const express = require('express')
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const recipesRoutes = require("./routes/Recipe");
const userRoutes = require("./routes/User");
const adminRoutes = require('./routes/admin');
const commentRoutes = require("./routes/Comment");
const AuthMiddleware = require("./middlewares/AuthMiddleware");
const uploadController = require("./controllers/uploadController");
const handleMiddleware = require("./middlewares/handleMiddleware");
const uploadValidation = require("./validation/uploadValidation");
const multer = require("multer");
const cron = require("node-cron");
const sendEmail = require("./helpers/sendEmail");
const path = require('path');
const AdminMiddleware = require('./middlewares/adminMiddleware');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("connected to db");
  app.listen(process.env.PORT, () => {
    console.log("server is running on port=" + process.env.PORT);
  });

  // cron.schedule('*/5 * * * * *', () => {
  //     console.log('running a task every 5 seconds');
  // });
});

//file upload api
app.post("/api/upload", uploadValidation, handleMiddleware, uploadController);
app.use("/api/recipes", recipesRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments",AuthMiddleware,commentRoutes);
app.use("/api/admin",AdminMiddleware,adminRoutes);
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res
      .status(500)
      .json({ errors: { photo_url: { msg: err.message } } });
  } else if (err) {
    return res
      .status(400)
      .json({ errors: { photo_url: { msg: err.message } } });
  }
});

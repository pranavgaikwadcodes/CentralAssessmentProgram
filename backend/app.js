const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const adminRoutes = require("./api/routes/admin");
const collegePortalRoutes = require("./api/routes/collegeportal");
const examinerPortalRoutes = require("./api/routes/examinersportal");

mongoose.connect(process.env.DATABASE_URL);

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false })); // parse url encoded values
app.use(bodyParser.json()); // parse json

// Handling CORS errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origins, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// routes to handle requests
app.use("/admin", adminRoutes);
app.use("/collegePortal", collegePortalRoutes);
app.use("/examinerPortal", examinerPortalRoutes);

// handling errors in routes
app.use((req, res, next) => {
  const error = Error("Not Found");
  error.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});

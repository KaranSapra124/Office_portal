const express = require("express");
const app = express();
const cors = require("cors");
const { mongodbConfig } = require("./Utils/MongoDbConfig");
const cookieParser = require("cookie-parser");
mongodbConfig();
app.use(cookieParser());

app.use(
  cors({
    origin: "https://office-portal-frontend.onrender.com",
    credentials: true,
  })
);

app.use(express.json());

app.use("/admin", require("./Routes/AdminRoutes"));

app.listen(3000, () => console.log("Server running"));

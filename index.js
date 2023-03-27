const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");

const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
}));
connectToMongoDB(process.env.MONGODB ?? "mongodb://localhost:27017/WebWarden").then(() =>
  console.log("Mongodb connected")
);



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/user", userRoute);


app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));

const express = require("express");
const path = require('path');
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
const ticketRouter = require("./routes/Tickets");
const workflowRouter = require("./routes/Workflow");
const userRouter = require("./routes/Users");
const FAQ = require("./routes/FAQ");
const Reports = require("./routes/Reports");
const Communication = require("./routes/Communication");

const authRouter = require("./routes/auth");

require('dotenv').config();

const authenticationMiddleware = require("./Middleware/authenticationMiddleware");
const authorizatonMiddleware = require("./Middleware/authorizationMiddleware");

const cors = require("cors");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/v1", authRouter);
//app.use(authenticationMiddleware);
app.use("/Tickets", authenticationMiddleware, ticketRouter);
app.use("/Workflow", authenticationMiddleware, workflowRouter);
app.use("/users", authenticationMiddleware, userRouter);
app.use("/FAQ", authenticationMiddleware, FAQ);
app.use("/Communication", authenticationMiddleware, Communication);
app.use("/Reports", authenticationMiddleware, Reports);
app.use("/api/v1/users", authenticationMiddleware, userRouter);


// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS,HEAD");
//   res.setHeader(
//     "Access-Control-Expose-Headers",
//     "*"
//   );

//   next();
// });

app.use(express.static(path.join(__dirname, '..', 'frontend', 'my-react-app', 'build')));

const excludeRoutes = ['/getAllTickets'];

// Middleware to serve 'index.html' only for specified routes
app.use((req, res, next) => {
  if (excludeRoutes.some(route => req.path.startsWith(route))) {
    // Skip serving 'index.html' for specified routes
    next();
  } else {
    // Serve 'index.html' for all other routes
    res.sendFile(path.join(__dirname, '..', 'frontend', 'my-react-app', 'build', 'index.html'));
  }
});



const db_name = process.env.DB_NAME;

const db_url = `${process.env.DB_URL}/${db_name}`; // if it gives error try to change the localhost to 127.0.0.1


const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose
  .connect(db_url, connectionOptions)
  .then(() => console.log("mongoDB connected"))
  .catch((e) => {
    console.log(e);
  });

app.use(function (req, res, next) {
  return res.status(404).send("404");
});
app.listen(process.env.PORT, () => console.log("server started"));



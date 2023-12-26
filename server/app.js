const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser=require('cookie-parser')
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
const Notification = require("./routes/Notifi");
//
const ChatMessage = require("./models/messageModel");
const socketio = require("socket.io");
const server = require("http").createServer(app);
const io = socketio(server);
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("chat message", async (newMessage) => {
    try {
      const { sender, receiver, message } = newMessage;

      // Save the chat message to the database
      const chatMessage = new ChatMessage({
        sender,
        receiver,
        message,
      });
      await chatMessage.save();

      // Emit the chat message to the sender and receiver
      socket.emit("chat message", chatMessage);
      socket.to(receiver).emit("chat message", chatMessage);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

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
    origin: [process.env.ORIGIN, 'http://localhost:3001'] ,// Add 'http://localhost:3001' to the list of allowed origins
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);


app.use("/api/v1", authRouter);
app.use(authenticationMiddleware);
app.use("/api/v1/Tickets", ticketRouter);
app.use("/api/v1/Workflow", workflowRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/FAQ", FAQ);
app.use("/api/v1/Communication", Communication);
app.use("/api/v1/Reports", Reports);
app.use("/api/v1/Notifi", Notification);
app.use("/api/v1/users", userRouter);


 app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS,HEAD");
   res.setHeader(
     "Access-Control-Expose-Headers",
     "*" 

   );

   next();
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












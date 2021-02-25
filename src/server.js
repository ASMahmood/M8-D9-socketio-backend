const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const {
  badRequestHandler,
  notFoundHandler,
  genericErrorHandler,
} = require("./utilities/errorHandling");
const createSocketServer = require("./socket");

const postsRoutes = require("./services/posts");
const commentsRouter = require("./services/comments");
const profileRouter = require("./services/profiles");
const experienceRouter = require("./services/experiences");

const server = express();
const httpServer = http.createServer(server);
createSocketServer(httpServer);
const port = process.env.PORT || 3002;
const chatPort = 8008;

server.use(cors());
server.use(express.json());

server.use("/post", postsRoutes);
server.use("/comment", commentsRouter);
server.use("/profile", profileRouter);
server.use("/experience", experienceRouter);

server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

mongoose
  .connect(process.env.MONGO_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log("The server's power level is over ", port);
    })
  )
  .then(
    httpServer.listen(chatPort, () => {
      console.log("Chatting on port", chatPort);
    })
  );

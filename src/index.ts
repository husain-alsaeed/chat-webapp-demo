import * as express from "express";
import { createServer } from "http";
import * as socketIO from "socket.io";
import { createAdapter } from "socket.io-redis";
import { RedisClient } from "redis";
const port = process.env.PORT || 4800;

const app = express();
const server = createServer(app);

const io = new socketIO.Server(server, {
  pingTimeout: 7000,
  pingInterval: 3000,
});
const pubClient = new RedisClient({
  host: process.env.REDIS_SERVER_HOST || "localhost",
  port: 6379,
});
const subClient = pubClient.duplicate();
io.adapter(createAdapter({ pubClient, subClient }));

app.use(express.static("public"));

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

import * as express from "express";
import { createServer } from "http";
import * as socketIO from "socket.io";
import { createAdapter } from "socket.io-redis";
import { RedisClient } from "redis";

const HOST = "0.0.0.0"
const PORT = 3000;

const app = express();
const server = createServer(app);

const io = new socketIO.Server(server, {
  pingTimeout: 7000,
  pingInterval: 3000,
});
const pubClient = new RedisClient({
  host: "localhost",
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

server.listen(PORT, HOST, () => console.info(`[PID:${process.pid}]Server running on http://${HOST}:${PORT} !`))

import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);

interface ServerToClientEvents {
  matchFound: (data: { roomId: string }) => void;
}

interface ClientToServerEvents {
  findMatch: () => void;
}

type InterServerEvents = {};
type SocketData = {};

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
  cors: { origin: "*" },
});

let waitingPlayer: Socket<ClientToServerEvents, ServerToClientEvents> | null = null;

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("findMatch", () => {
    if (waitingPlayer) {
      const roomId = `room_${waitingPlayer.id}_${socket.id}`;
      waitingPlayer.join(roomId);
      socket.join(roomId);
      io.to(roomId).emit("matchFound", { roomId });
      waitingPlayer = null;
    } else {
      waitingPlayer = socket;
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    if (waitingPlayer && waitingPlayer.id === socket.id) {
      waitingPlayer = null;
    }
  });
});

server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});

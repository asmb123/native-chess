import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import { login, signup } from "./controllers/auth.js";
import { dbInit } from "./config/db.config.js";

const app = express();
const server = http.createServer(app);

app.use(express.json())

dbInit();


interface ServerToClientEvents {
  matchFound: (data: { roomId: string, fen: string, pieceColor: string, name: string }) => void;
  opponentMove: ({ from, to }: { from: string, to: string }) => void;
  opponentLeft: () => void;
}

interface ClientToServerEvents {
  findMatch: (name: string) => void;
  makeMove: ({ roomId, move }: { roomId: string, move: any }) => void;
}

type InterServerEvents = {};
type SocketData = {};

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
  cors: { origin: "*" },
});

let waitingPlayer: Socket<ClientToServerEvents, ServerToClientEvents> | null = null;
// const waitingQueue: Socket<ClientToServerEvents, ServerToClientEvents>[] = [];
const waitingQueue: { socket: Socket<ClientToServerEvents, ServerToClientEvents>, name: string }[] = [];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  const fen1 = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2';
  const fen2 = 'RNBQKB1R/PPPP1PPP/5N2/4P3/2p5/8/pp1ppppp/rnbqkbnr b KQkq - 1 2';


  // socket.on("findMatch", () => {
  //   if (waitingPlayer) {
  //     const roomId = `room_${waitingPlayer.id}_${socket.id}`;
  //     waitingPlayer.join(roomId);
  //     socket.join(roomId);
  //     io.to(roomId).emit("matchFound", { roomId });
  //     waitingPlayer = null;
  //   } else {
  //     waitingPlayer = socket;
  //   }
  // });

  // socket.on("findMatch", (name) => {
  //   if (waitingQueue.length > 0) {
  //     const opponent = waitingQueue.shift()!; // take first in queue
  //     const roomId = `room_${opponent.id}_${socket.id}`;

  //     opponent.join(roomId);
  //     socket.join(roomId);

  //     opponent.emit("matchFound", { roomId, fen: fen1, pieceColor: "white"});
  //     socket.emit("matchFound", { roomId, fen: fen2, pieceColor: "black", name: name });
  //   } else {
  //     waitingQueue.push(socket, name);
  //   }
  // });

  socket.on("findMatch", (name) => {
    if (waitingQueue.length > 0) {
      const opponentData = waitingQueue.shift()!; // { socket, name }
      const roomId = `room_${opponentData.socket.id}_${socket.id}`;

      opponentData.socket.join(roomId);
      socket.join(roomId);

      // Send match info to opponent
      opponentData.socket.emit("matchFound", {
        roomId,
        fen: fen1,
        pieceColor: "white",
        name // opponent’s name 
      });

      // Send match info to current player
      socket.emit("matchFound", {
        roomId,
        fen: fen2,
        pieceColor: "black",
        name: opponentData.name
      });

    } else {
      waitingQueue.push({ socket, name }); // store both socket & name
    }
  });


  socket.on("makeMove", ({ roomId, move }) => {
    // Broadcast move to the other player in the room
    socket.to(roomId).emit("opponentMove", move);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    if (waitingPlayer && waitingPlayer.id === socket.id) {
      waitingPlayer = null;
    }
    io.to([...socket.rooms]).emit("opponentLeft");
  });
});

app.post('/login', login);
app.post('/signup', signup);

server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
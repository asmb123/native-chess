import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Board from "./components/Board";

interface ServerToClientEvents {
  matchFound: (data: { roomId: string }) => void;
}

interface ClientToServerEvents {
  findMatch: () => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:3000"
);

const Play: React.FC = () => {
  const [matched, setMatched] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);

  useEffect(() => {
    socket.emit("findMatch");
    socket.on("matchFound", ({ roomId }) => {
      setRoomId(roomId);
      setMatched(true);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View className="w-screen h-screen bg-black items-center justify-center">
      {!matched && <Text className="text-white">Looking for opponent...</Text>}
      {matched && (
        <>
          <Text className="text-white mb-4">Matched! Room: {roomId}</Text>
          <Board />
        </>
      )}
    </View>
  );
};

export default Play;

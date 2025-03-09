import { Server as NetServer } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

interface CustomNextApiResponse extends NextApiResponse {
  socket: NextApiResponse["socket"] & {
    server: NetServer & { io?: SocketIOServer };
  };
}

export default function GET(req: NextApiRequest, res: CustomNextApiResponse) {
  if (!res.socket.server.io) {
    console.log("Starting WebSocket server...");

    const io = new SocketIOServer(res.socket.server, {
      path: "/api/socket",
      addTrailingSlash: false,
      cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);

      socket.on("join", (userId) => {
        socket.join(userId); // User joins their own room for personal notifications
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("WebSocket server already running");
  }

  res.end();
}

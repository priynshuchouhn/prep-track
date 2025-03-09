import { Server as HttpServer } from "http";
import { Server as SocketServer, Socket } from "socket.io";

let io: SocketServer | null = null;

// Initialize WebSocket server
export const initializeWebSocket = (server: HttpServer) => {
    if (!io) {
        io = new SocketServer(server, {
            cors: { origin: "*" },
        });

        io.on("connection", (socket: Socket) => {
            console.log(`User Connected: ${socket.id}`);

            // Handle user joining their notification room
            socket.on("joinRoom", (userId: string) => {
                socket.join(userId);
                console.log(`User ${userId} joined notification room`);
            });

            socket.on("disconnect", () => {
                console.log(`User Disconnected: ${socket.id}`);
            });
        });
    }
    return io;
};

// Get WebSocket instance
export const getIO = () => {
    if (!io) throw new Error("WebSocket not initialized");
    return io;
};

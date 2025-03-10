import { Server as HttpServer } from "http";
import { Server as SocketServer, Socket } from "socket.io";

declare global {
    var _io: SocketServer | undefined; // Store globally to prevent multiple instances
}

export let io: SocketServer | null = global._io || null;

// ✅ Initialize WebSocket server
export const initializeWebSocket = (server: HttpServer) => {
    if (!io) {
        io = new SocketServer(server, {
            cors: { origin: "*" },
            transports: ["websocket", "polling"],
        });

        global._io = io; // Store in global variable
        console.log("✅ WebSocket Server Initialized");

        io.on("connection", (socket: Socket) => {
            console.log(`🔗 User Connected: ${socket.id}`);

            // Handle user joining their notification room
            socket.on("joinRoom", (userId: string) => {
                socket.join(userId);
                console.log(`📢 User ${userId} joined notification room`);
            });

            socket.on("disconnect", () => {
                console.log(`⚠️ User Disconnected: ${socket.id}`);
            });
        });
    } else {
        console.warn("⚠️ WebSocket already initialized!");
    }

    return io;
};

// ✅ Function to get WebSocket instance
export const getIO = () => {
    if (!global._io) {
        throw new Error("❌ WebSocket not initialized! Call initializeWebSocket(server) first.");
    }
    return global._io;
};

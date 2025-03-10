
import { auth } from "@/auth";
import { io as ClientIO, Socket } from "socket.io-client";

declare global {
    interface Window {
        _socket?: Socket; // Store WebSocket globally on window object
    }
}

let socket: Socket | null = null;
let reconnectAttempts = 0;

/**
 * Initialize WebSocket connection only once.
 * @param serverUrl The WebSocket server URL
 */
export const initializeWebSocket =  (serverUrl: string, userId:string) => {
    if (typeof window === "undefined") return; // Prevent running on server

    if (!window._socket) {
        socket = ClientIO(serverUrl, {
            query: {userId},
            transports: ["websocket", "polling"],
            reconnection: true, // Enable auto-reconnect
            reconnectionAttempts: Infinity, // Retry indefinitely
            reconnectionDelay: 5000, // Retry every 5 seconds
            timeout: 20000, // Increase connection timeout
        });

        window._socket = socket; // Store in global window object
        console.log("✅ Connected to WebSocket Server:", serverUrl);
        setInterval(() => {
            if (socket && socket.connected) {
                socket.emit("heartbeat"); // Prevent disconnection
            }
        }, 20000);

        socket.on("connect", () => console.log("🔗 WebSocket Connected:", socket?.id));
        socket.on("disconnect", (reason) => {
            console.log(`❌ WebSocket Disconnected. Reason: ${reason}`);
            if (reason === "transport close") {
                console.warn("⚠️ Possible network issue or server stopped.");
            } else if (reason === "ping timeout") {
                console.warn("⚠️ Server did not respond, connection lost.");
            }
             else {
                console.warn("⚠️ Unknown disconnection reason:", reason);
            }

            reconnectAttempts++;
            const retryDelay = Math.min(5000 * reconnectAttempts, 30000);
            console.log(`🔄 Reconnecting in ${retryDelay / 1000} seconds...`);

            setTimeout(() => {
                initializeWebSocket(serverUrl, userId); // Reinitialize WebSocket
            }, retryDelay);
        });
    } else {
        console.warn("⚠️ WebSocket is already initialized!");
    }
};

/**
 * Get the existing WebSocket instance.
 */
export const getSocket =  (): Socket => {
    if (!window._socket) {
        throw new Error("❌ WebSocket not initialized! Call initializeWebSocket(serverUrl) first.");
    }
    return window._socket;
};

"use client";
import { useEffect, useState } from "react";
import { initializeWebSocket, getSocket } from "@/lib/websocket";
import { WS_BASE_URL } from "@/lib/utils";


export const WakeUpServer = () => {
    const [isWebSocketReady, setIsWebSocketReady] = useState(false);

    useEffect(() => {
        const wakeUpAndConnect = async () => {
            try {
                console.log("🚀 Waking up WebSocket server...");

                console.log("🔌 Initializing WebSocket...");
                initializeWebSocket(`${WS_BASE_URL}`, "");

                const socket = getSocket();
                socket.on("connect", () => {
                    setIsWebSocketReady(true);
                });

                socket.on("disconnect", () => {
                    setIsWebSocketReady(false);
                });
            } catch (error) {
                console.error("⚠️ Failed to wake up WebSocket server:", error);
            }
        };

        wakeUpAndConnect();
    }, []);

    return null;
};
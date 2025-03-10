"use client";
import { useEffect, useState } from "react";
import { initializeWebSocket, getSocket } from "@/lib/websocket";
import { API_BASE_URL, WS_BASE_URL } from "@/lib/utils";
import { useSession } from "next-auth/react";


export const WakeUpServer = () => {
    const [isWebSocketReady, setIsWebSocketReady] = useState(false);
    // const session = useSession();

    useEffect(() => {
        const wakeUpAndConnect = async () => {
            try {
                console.log("🚀 Waking up WebSocket server...");
                await fetch(`${API_BASE_URL}/wakeup`);
                console.log("🔌 Initializing WebSocket...");
                initializeWebSocket(`${WS_BASE_URL}`, "no-id-recieved");

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
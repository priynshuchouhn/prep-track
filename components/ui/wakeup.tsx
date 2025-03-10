"use client";
import { useEffect, useState } from "react";
import { initializeWebSocket, getSocket } from "@/lib/websocket";
import { WS_BASE_URL } from "@/lib/utils";
import { useSession } from "next-auth/react";


export const WakeUpServer = () => {
    const [isWebSocketReady, setIsWebSocketReady] = useState(false);
    const session = useSession();

    useEffect(() => {
        const wakeUpAndConnect = async () => {
            if(session.data?.user.id){
                try {
                    console.log("🚀 Waking up WebSocket server...");
    
                    console.log("🔌 Initializing WebSocket...");
                    initializeWebSocket(`${WS_BASE_URL}`, session.data?.user.id);
    
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
            }
        };

        wakeUpAndConnect();
    }, [session.data?.user.id]);

    return null;
};
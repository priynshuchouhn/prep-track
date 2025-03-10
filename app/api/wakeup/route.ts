import { NextResponse } from "next/server";

export async function GET() {
    try {
        const WS_SERVER_URL = process.env.WS_BASE_URL || "";

        // Ping WebSocket server to wake it up
        await fetch(WS_SERVER_URL, { method: "GET" });

        return NextResponse.json({ success: true, message: "WebSocket server pinged successfully." });
    } catch (error) {
        console.error("Failed to wake up WebSocket server:", error);
        return NextResponse.json({ success: false, message: "Failed to wake up WebSocket server." }, { status: 500 });
    }
}

import { createServer } from "http";
import next from "next";
import { initializeWebSocket } from "./lib/websocket";

const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer((req, res) => handle(req, res));
    initializeWebSocket(server);

    server.listen(3000, () => console.log("Server running on http://localhost:3000"));
});

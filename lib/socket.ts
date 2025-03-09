import { io } from "socket.io-client";
import { API_BASE_URL } from "./utils";

const socket = io(`${API_BASE_URL}`, {
  path: "/api/socket",
});

export default socket;

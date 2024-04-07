import io from "socket.io-client";

const socket = io("https://sociosync-backend.onrender.com");

export default socket;

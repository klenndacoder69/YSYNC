import http from "http";
import { Server } from "socket.io";

export default function connectChat(app) {
    const corsOptions = {
        origin: "http://localhost:3001",
      };
      
    const server = http.createServer(app);
    const io = new Server(server, {
    cors: corsOptions
    });

    let activeUsers = 0;

    io.on('connection', (socket) => {
    activeUsers++;
    io.emit('user_count', activeUsers);

    console.log('A user connected:', socket.id);

    // Handle incoming messages
    socket.on('chat_message', (message) => {
        io.emit('chat_message', { id: socket.id, message });
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        activeUsers--;
        io.emit('user_count', activeUsers);
        console.log('A user disconnected:', socket.id);
    });
    });
    console.log("Successfully connected to socket.io server");
    return server;
}

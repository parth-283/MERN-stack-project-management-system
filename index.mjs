import express from "express";
import "colors"
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import http from 'http';
import webSocket from "./WebSockets/task-socket.mjs";
import { WebSocketServer } from "ws";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
/* Routes */
import authRoutes from "./Routes/auth.mjs"
import cookieParser from "cookie-parser";

configDotenv()

console.log(`Try to connect mongodb`.underline.yellow);
mongoose.connect(process.env.MONGOOSE_URI, {
    connectTimeoutMS: 60000,
    serverSelectionTimeoutMS: 60000,
}).then((response) => {
    console.log(`MongoDB successfully connected.`.underline.bgGreen);
}).catch((error) => {
    console.log(`Error occur when try to connect mongodb. Error: ${JSON.stringify(error)} `);
})

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const server = http.createServer(app);

// WebSocket Server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log("New WebSocket connection established.");

    ws.on("error", (error) => {
        console.error(`WebSocket error: ${error.message}`);
    });

    ws.on("close", () => {
        console.log("WebSocket connection closed.");
    });

    webSocket(ws);
});

app.use("/api/auth", authRoutes)

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

server.listen(process.env.PORT, (error) => {
    if (error) {
        console.log(`Error on listing project on port: ${process.env.PORT}. ERROR: ${error} `)
    } else {
        console.log(`Your project listen on http://localhost:${process.env.PORT}`.underline.cyan);
    }
})
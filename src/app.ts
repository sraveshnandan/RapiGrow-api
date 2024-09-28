import express from 'express';
import { connectToDB } from './database';
import { BASE_URL, PORT } from './config';
import { adminRouter } from './libs';
import healthRoutes from "./routes/health.routes";
import AuthRoutes from "./routes/auth.routes";
import ProductsRoutes from "./routes/product.routes";
import orderRoutes from "./routes/order.routes";
import categoryRoutes from "./routes/category.routes";
import session from 'express-session';
import http from "http";
import cors from "cors";
import { Server } from 'socket.io';

// Express server
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

// Middlewares 
app.use(express.json());
app.use(cors());

// Set up session
app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true,
}));

// Routes 
app.use("/admin", adminRouter);
app.use("/api/v1", healthRoutes, AuthRoutes, ProductsRoutes, orderRoutes, categoryRoutes);

// Create HTTP server

io.on("connection", (socket) => {
    console.log("hi")
})

// Server start function 
const start = async () => {
    await connectToDB();
    httpServer.listen(PORT, () => {
        console.log(`Server started on ${BASE_URL}:${PORT}`);
        console.log(`AdminJS started on ${BASE_URL}:${PORT}/admin`);
    });
}

start();


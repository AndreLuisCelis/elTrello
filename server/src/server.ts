import express from "express";
import { createServer } from "http";
import { Server} from "socket.io";
import mongoose from "mongoose";
import * as userController from './controllers/user';
import bodyParser from 'body-parser';
import authMiddleware from "./middlewares/auth";
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req, res) => {
    res.send("API is UP")
});

app.post("/api/users", userController.register);
app.post("/api/users/login", userController.login);
app.get("/api/user", authMiddleware, userController.currentUser )

io.on("connection", () => {
    console.log('connect');
})

mongoose.connect('mongodb://0.0.0.0:27017/eltrello').then(()=> {
    console.log('connected mongodb')
    httpServer.listen(4001,()=> {
        console.log('Api in Listening in port 4001')
    });
})


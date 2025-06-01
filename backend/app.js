import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

const app = express();
dotenv.config();

console.log('Frontend URL:', process.env.FRONTEND_URL); 

console.log('Mongo URI:', process.env.MONGO_URI);  // Debugging the loaded values
console.log('Frontend URL:', process.env.FRONTEND_URL);
console.log('Port:', process.env.PORT);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", 
    methods: ["GET","POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/reservation", reservationRouter);
app.get("/", (_req, res, _next)=>{return res.status(200).json({
  success: true,
  message: "HELLO WORLD AGAIN"
})})

dbConnection();

app.use(errorMiddleware);

export default app;

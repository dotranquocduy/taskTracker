import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import  authRoutes  from './routes/authRoutes';
import cookieParser from 'cookie-parser';
// import  taskRoutes  from './routes/taskRoutes';

const app = express();
app.use(express.json());
app.use(cookieParser());

// config server
require('dotenv').config()
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


// use api in routes map controller
app.use("/api/user",authRoutes);



export default app;

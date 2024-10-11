import express from "express";
import path from "path";
import cookieParser from "cookie-parser"
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRouter from "./routes/auth.router.js"
dotenv.config();

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();
 
app.use(express.json());

app.use(cookieParser());

app.listen(8000, () => {
    console.log(` is running at port : 8000`);
})


app.use('/api/auth', authRouter);

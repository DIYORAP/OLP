import express from "express";
import path from "path";
import cookieParser from "cookie-parser"
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRouter from "./routes/auth.router.js"
import courseRoute from "./routes/Course.route.js"
import cors from "cors"
import fileUpload from "express-fileupload";
import { cloudnairyconnect } from "./config/Cloudnary.js";



dotenv.config();
cloudnairyconnect
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
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

app.use(cors({
  origin: 'http://localhost:5173', // Allow only your frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  credentials: true // If you need to send cookies or authorization headers
}));
app.use(express.json());

app.use(cookieParser());

cloudnairyconnect();
app.listen(8000, () => {
    console.log(` is running at port : 8000`);
})


app.use('/api/auth', authRouter);
app.use('/api/courses',courseRoute)

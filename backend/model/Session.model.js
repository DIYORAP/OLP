import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true }, 
  date: { type: String, required: true }, 
  time: { type: String, required: true },  
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

const Session = mongoose.model("Session", sessionSchema);
export default Session;

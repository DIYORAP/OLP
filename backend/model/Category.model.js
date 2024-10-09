import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String, 
    required: true,
    unique: true
  },
  courses: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Course" 
  }]
});

module.exports = mongoose.model('Category', categorySchema);

import mongoose from mongoose;

const courseSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
    },
  description: { 
    type: String,
    required: true
    },
  category: {                                         //category: { 
    type: String,
   },                                              //     type: mongoose.Schema.Types.ObjectId,                                              //   }
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', required: true
    },
  imageUrl:{
    type:String,
    required:true
  },
  price: { 
    type: Number,
    required: true 
    },
  language: { 
    type: String,
    default: 'English'
    },
  isPublished:{
    type:Boolean,
    default:false
  },
  content: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module' }],
  ratings: [{ userId: mongoose.Schema.Types.ObjectId, rating: Number }],
  reviews: [{ userId: mongoose.Schema.Types.ObjectId, reviewText: String }],
  studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);

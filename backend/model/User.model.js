import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: { 
    type: String,
    required: true
    },
  email: {
       type: String,
       required: true,
       unique: true 
    },
  password: { 
     type: String,
     required: true
     },
  role: { 
     type: String,
      enum: ['student', 'instructor'],
      default: 'student'
     },
  profilePic: { 
    type: String ,
    default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
  bio: { 
    type: String
     },
  coursesEnrolled: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  coursesCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
export default User;
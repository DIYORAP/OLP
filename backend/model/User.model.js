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
      enum: ['Student', 'Instructor','Admin'],
      default: 'Student'
     },
  active:{
    type:Boolean,
    default:true,
  },
  approved: {
    type: Boolean,
    default: true,
  },
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: "Profile",
  },
  profilePic: { 
    type: String ,
    default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
  bio: { 
    type: String
     },
  token: {
			type: String,
		},
   courses: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Course",
			},
		],
  courseProgress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courseProgress",
    },
  ],
},{timestamps:true});

const User = mongoose.model('User', userSchema);
export default User;
import mongoose from "mongoose";

const courseProgressSchema = new mongoose.Schema({
	courseID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Course",
	},
	userID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	completedVideos: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "SubSection",
		},
	],
});

const courseProgress = mongoose.model("courseProgress", courseProgressSchema);

export default courseProgress;
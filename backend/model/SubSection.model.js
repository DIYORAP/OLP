import mongoose from "mongoose";

const SubSectionSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    timeDuration: {
        type: String,
    },
    description: {
        type: String,
    },
    videoUrl: {
        type: String,
    }
});

const SubSection = mongoose.model("SubSection", SubSectionSchema); // Ensure the name is "SubSection"
export default SubSection;

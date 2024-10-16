import cloudinary from 'cloudinary';

export const uploadVideoToCloudinary = async (video, folder) => {
    return await cloudinary.v2.uploader.upload(video.tempFilePath, {
        resource_type: "video", // Specify resource_type as video
        folder: folder,
    });
};

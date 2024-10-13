import cloudinary from 'cloudinary';

const uploadImageToCloudinary = async (file, folder, height, quality) => {
  const options = {
    folder,
    public_id: file.name,
    resource_type: 'auto',
  };
  if (height) options.height = height;
  if (quality) options.quality = quality;

  try {
    const uploadResponse = await cloudinary.uploader.upload(file.tempFilePath, options);
    return uploadResponse;
  } catch (err) {
    throw err;
  }
};

// Correct export syntax
export default uploadImageToCloudinary;

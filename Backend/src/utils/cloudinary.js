import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_SECRET,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export const uploadMedia = async (file) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });

    return uploadResponse;
  } catch (error) {
    console.log("Cloudinary Upload Error:", error);
  }
};

export const deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log("Delete Media from CLoudinary Error", error);
  }
};

export const deleteLectureFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
  } catch (error) {
    console.log("Error Deleting Lecture", error);
  }
};

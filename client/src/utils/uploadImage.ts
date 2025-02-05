import axiosClient from "@/constants/axiosClient";
import { API_PATHS } from "./apiPaths";

const uploadImage = async (imageFile: File) => {
  const formData = new FormData();
  formData.append("image", imageFile); // Ensure imageFile is a File object

  try {
    const response = await axiosClient.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error uploading image", error);
    throw error;
  }
};

export default uploadImage 
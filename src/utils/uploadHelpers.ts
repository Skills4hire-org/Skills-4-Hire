import { uploadToCloudinary } from "@/utils/cloudinary";

export const uploadIfFile = async (file?: File | null | string) => {
  if (!file || !(file instanceof File)) return undefined;

  return await uploadToCloudinary(file);
};

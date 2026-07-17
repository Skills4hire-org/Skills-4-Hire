import { uploadToCloudinary } from "@/utils/cloudinary";

export const uploadIfFile = async (file?: File | null | string) => {
  if (!file || !(file instanceof File)) return undefined;

  const results = await uploadToCloudinary([file]);
  return results && results.length > 0 ? results[0] : undefined;
};

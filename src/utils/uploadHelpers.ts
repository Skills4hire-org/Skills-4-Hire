import { uploadToR2 } from "@/utils/mediaUpload";

export const uploadIfFile = async (file?: File | null | string) => {
  if (!file || !(file instanceof File)) return undefined;

  const results = await uploadToR2([file]);
  return results && results.length > 0 ? results[0] : undefined;
};

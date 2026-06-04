import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { addPersonalInfo } from "@/features/registration/registrationSlice";
import AuthLogo from "@/components/global/AuthLogo";
import Container from "@/components/global/Container";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { uploadToCloudinary } from "@/utils/cloudinary";
import { api } from "@/utils/axiosConfig";

export default function UploadPhoto() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.registrationState.role);

  const profileIdFromStore = useSelector(
    (state: any) =>
      state.auth?.user?.base_profile_id ??
      state.auth?.user?.profileId ??
      state.auth?.user?.id ??
      state.authState?.user?.base_profile_id ??
      state.authState?.user?.profileId ??
      state.authState?.user?.id ??
      null,
  );

  const profileId =
    profileIdFromStore ??
    localStorage.getItem("base_profile_id") ??
    localStorage.getItem("profileId");

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const nextRoute =
    role === "professional"
      ? "/service-provider/application"
      : "/customer/home";

  const handleFile = (selected: File) => {
    dispatch(
      addPersonalInfo({
        personalInfo: { profileImage: selected },
      }),
    );

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!role) {
      toast.error("Please select a role before continuing.");
      return;
    }

    if (!file) {
      navigate(nextRoute);
      return;
    }

    if (!profileId) {
      toast.error("Profile ID not found. Please log in again.");
      return;
    }

    setLoading(true);

    try {
      const uploadResult = await uploadToCloudinary(file);

      await api.post("/api/v1/avatar/", {
        base_profile_id: profileId,
        avatar: uploadResult.url,
        avatar_public_id: uploadResult.public_id,
        description: "Customer profile avatar",
      });

      toast.success("Profile photo uploaded successfully.");
      navigate(nextRoute);
    } catch (error: any) {
      console.error(
        "Avatar upload failed:",
        error?.response?.data || error.message,
      );
      toast.error("Unable to upload photo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    if (!role) {
      toast.error("Please select a role before continuing.");
      return;
    }

    navigate(nextRoute);
  };

  return (
    <Container className="flex items-center justify-center min-h-screen py-20">
      <div className="w-full max-w-sm text-center">
        <div className="w-max mx-auto mb-4">
          <AuthLogo />
        </div>

        <h1 className="text-2xl font-bold">Upload Profile Photo</h1>

        <p className="text-sm text-gray-500 mt-2 mb-8">
          Add a profile picture (optional)
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center mb-6">
            <div
              onClick={() => fileRef.current?.click()}
              className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="w-8 h-8 text-gray-400" />
              )}
            </div>
          </div>

          <input
            ref={fileRef}
            type="file"
            hidden
            accept="image/*"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const selected = event.target.files?.[0];
              if (selected) handleFile(selected);
            }}
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Continue"}
          </button>

          <button
            type="button"
            onClick={handleSkip}
            className="w-full mt-3 text-sm text-gray-500 hover:text-primary hover:underline"
            disabled={loading}
          >
            Skip for now
          </button>
        </form>
      </div>
    </Container>
  );
}

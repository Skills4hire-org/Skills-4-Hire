import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { addPersonalInfo } from "@/features/registration/registrationSlice";
import AuthLogo from "@/components/global/AuthLogo";
import { Camera } from "lucide-react";

export default function UploadPhoto() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const role = useSelector((state: RootState) => state.registrationState.role);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (file: File) => {
    dispatch(
      addPersonalInfo({
        personalInfo: { profileImage: file },
      }),
    );

    setPreview(URL.createObjectURL(file));
  };

  const handleContinue = () => {
    if (role === "professional") {
      navigate("/professional/registration");
    } else {
      navigate("/customer/home");
    }
  };

  const handleSkip = () => {
    // Skip uploading photo and continue onboarding
    if (role === "professional") {
      navigate("/professional/registration");
    } else {
      navigate("/customer/home");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6 py-10">
      <div className="w-full max-w-sm text-center">
        <div className="w-max mx-auto mb-4">
          <AuthLogo />
        </div>

        <h1 className="text-2xl font-bold">Upload Profile Photo</h1>

        <p className="text-sm text-gray-500 mt-2 mb-8">
          Add a profile picture (optional)
        </p>

        <div className="flex justify-center mb-6">
          <div
            onClick={() => fileRef.current?.click()}
            className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden"
          >
            {preview ? (
              <img src={preview} className="w-full h-full object-cover" />
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
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        <button
          onClick={handleContinue}
          className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90"
        >
          Continue
        </button>

        <button
          type="button"
          onClick={handleSkip}
          className="mt-3 text-sm text-gray-500 hover:text-primary hover:underline"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}

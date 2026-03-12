import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { setRole } from "@/features/registration/registrationSlice";
import AuthLogo from "@/components/global/AuthLogo";
import { User, Wrench } from "lucide-react";

export default function OnboardingRole() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const role = useSelector((state: RootState) => state.registrationState.role);

  const handleContinue = () => {
    if (!role) return;
    navigate("/onboarding/upload-photo");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6 py-10">
      <div className="w-full max-w-sm text-center">
        <div className="w-max mx-auto mb-4">
          <AuthLogo />
        </div>

        <h1 className="text-2xl font-bold">Choose Your Role</h1>

        <p className="text-sm text-gray-500 mt-2 mb-8">
          Tell us how you want to use the platform
        </p>

        <div className="space-y-4">
          <button
            onClick={() => dispatch(setRole("customer"))}
            className={`w-full border rounded-xl p-4 flex items-center gap-3 text-left transition
            ${
              role === "customer"
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-primary"
            }`}
          >
            <User className="w-6 h-6 text-primary" />

            <div>
              <p className="font-semibold">Hire a Service</p>
              <p className="text-xs text-gray-500">
                Find skilled professionals
              </p>
            </div>
          </button>

          <button
            onClick={() => dispatch(setRole("professional"))}
            className={`w-full border rounded-xl p-4 flex items-center gap-3 text-left transition
            ${
              role === "professional"
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-primary"
            }`}
          >
            <Wrench className="w-6 h-6 text-primary" />

            <div>
              <p className="font-semibold">Skilled Professional</p>
              <p className="text-xs text-gray-500">Offer services and earn</p>
            </div>
          </button>
        </div>

        <button
          disabled={!role}
          onClick={handleContinue}
          className="w-full mt-8 bg-primary text-white py-3 rounded-lg font-medium disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

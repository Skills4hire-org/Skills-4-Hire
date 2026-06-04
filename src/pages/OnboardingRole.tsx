import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { setRole } from "@/features/registration/registrationSlice";
import AuthLogo from "@/components/global/AuthLogo";
import Container from "@/components/global/Container";
import { User, Wrench } from "lucide-react";
import { api } from "@/utils/axiosConfig";
import { toast } from "sonner";

export default function OnboardingRole() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const role = useSelector((state: RootState) => state.registrationState.role);

  const handleContinue = async () => {
    if (!role) {
      toast.error("Please select a role to continue.");
      return;
    }

    const mappedRole =
      role === "professional" ? "SERVICE_PROVIDER" : "CUSTOMER";

    setLoading(true);

    try {
      await api.post("/api/v1/onboard/", {
        service_to_perform: mappedRole,
      });

      if (role === "professional") {
        navigate("/service-provider/application");
      } else {
        navigate("/onboarding/upload-photo");
      }
    } catch (error: any) {
      console.error("Onboard error:", error?.response?.data || error.message);
      toast.error(
        error?.response?.data?.detail ||
          "Unable to continue onboarding. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="flex items-center justify-center min-h-screen">
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
            type="button"
            onClick={() => dispatch(setRole("customer"))}
            className={`w-full border rounded-xl p-4 flex items-center gap-3 text-left transition ${
              role === "customer"
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-primary"
            }`}
          >
            <User className="w-6 h-6 text-primary shrink-0" />

            <div>
              <p className="font-semibold">Hire a Service</p>
              <p className="text-xs text-gray-500">
                Find skilled professionals
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => dispatch(setRole("professional"))}
            className={`w-full border rounded-xl p-4 flex items-center gap-3 text-left transition ${
              role === "professional"
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-primary"
            }`}
          >
            <Wrench className="w-6 h-6 text-primary shrink-0" />

            <div>
              <p className="font-semibold">Skilled Professional</p>
              <p className="text-xs text-gray-500">Offer services and earn</p>
            </div>
          </button>
        </div>

        <button
          type="button"
          disabled={!role || loading}
          onClick={handleContinue}
          className="w-full mt-8 bg-primary text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition"
        >
          {loading ? "Processing..." : "Continue"}
        </button>
      </div>
    </Container>
  );
}

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
      role === "service_provider" ? "SERVICE_PROVIDER" : "CUSTOMER";

    setLoading(true);

    try {
      await api.post("/api/v1/onboard/", {
        service_to_perform: mappedRole,
      });

      if (role === "service_provider") {
        navigate("/service-provider/registration/personal-information");
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
        <AuthLogo />

        <h1 className="text-2xl font-bold">Choose Your Role</h1>

        <div className="space-y-4 mt-8">
          <button
            type="button"
            onClick={() => dispatch(setRole("customer"))}
            className={`w-full border rounded-xl p-4 flex gap-3 ${
              role === "customer" ? "border-primary bg-primary/5" : ""
            }`}
          >
            <User />
            <div>
              <p className="font-semibold">Customer</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => dispatch(setRole("service_provider"))}
            className={`w-full border rounded-xl p-4 flex gap-3 ${
              role === "service_provider" ? "border-primary bg-primary/5" : ""
            }`}
          >
            <Wrench />
            <div>
              <p className="font-semibold">Service Provider</p>
            </div>
          </button>
        </div>

        <button
          onClick={handleContinue}
          disabled={!role || loading}
          className="w-full mt-8 bg-primary text-white py-3 rounded-lg"
        >
          {loading ? "Processing..." : "Continue"}
        </button>
      </div>
    </Container>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import InputField from "../components/InputField";
import AuthLogo from "@/components/global/AuthLogo";
import { login } from "@/api/auth";

export default function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errors: Record<string, string> = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setLoading(true);

    try {
      const res = await login(formData);
      console.log("LOGIN RESPONSE:", res);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm text-center">
        <div className="w-max mx-auto mb-1">
          <AuthLogo />
        </div>

        <h1 className="text-2xl font-bold">Sign in</h1>

        <p className="text-sm text-gray-500 mb-6">
          Enter your email and password you created during registration
        </p>

        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

        <div className="space-y-2 mb-2">
          <InputField
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e: any) => handleChange("email", e.target.value)}
          />
          {formErrors.email && (
            <p className="text-xs text-red-500">{formErrors.email}</p>
          )}

          <InputField
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e: any) => handleChange("password", e.target.value)}
          />
          {formErrors.password && (
            <p className="text-xs text-red-500">{formErrors.password}</p>
          )}

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <p className="text-sm text-gray-600 mt-3">
          Don&apos;t have an account?{" "}
          <Link
            to="/sign-up"
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>

        <p className="text-xs text-gray-600 mt-3 leading-snug">
          By clicking the{" "}
          <span className="font-medium text-black">Sign in</span> button you
          accept the{" "}
          <Link
            to="/privacy-policy"
            className="text-primary font-medium hover:underline"
          >
            Terms of the Privacy Policy
          </Link>
        </p>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t-2 border-gray-400"></div>
          <span className="px-3 text-sm text-gray-400">or</span>
          <div className="flex-grow border-t-2 border-gray-400"></div>
        </div>

        <div className="flex justify-center gap-6">
          <button
            aria-label="Continue with Facebook"
            className="w-8 h-8 rounded-full bg-[#1877F2] grid place-items-center"
          >
            <FaFacebookF className="w-4 h-4" color="#FFFFFF" />
          </button>

          <img
            src="https://img.icons8.com/color/48/google-logo.png"
            alt="Google"
            className="w-8 h-8"
          />
          <img
            src="https://img.icons8.com/ios-filled/50/mac-os.png"
            alt="Apple"
            className="w-8 h-8"
          />
        </div>
      </form>
    </div>
  );
}

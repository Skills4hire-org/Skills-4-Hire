import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import InputField from "../components/InputField";
import AuthLogo from "@/components/global/AuthLogo";
import { register } from "@/api/auth";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errors: Record<string, string> = {};

    if (!formData.first_name.trim())
      errors.first_name = "First name is required";
    if (!formData.last_name.trim()) errors.last_name = "Last name is required";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (formData.confirm_password !== formData.password) {
      errors.confirm_password = "Passwords do not match";
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
      const res = await register(formData);
      console.log("REGISTER RESPONSE:", res);
      navigate("/sign-in");
    } catch (err: any) {
      setError(err.message || "Registration failed");
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

        <h1 className="text-2xl font-bold">Sign up</h1>

        <p className="text-sm text-gray-500 mb-6">
          Get Maximum <span className="text-primary">Satisfaction</span>
          <br />
          From Service Providers
        </p>

        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

        <div className="space-y-2 mb-6">
          <InputField
            placeholder="First Name"
            value={formData.first_name}
            onChange={(e) => handleChange("first_name", e.target.value)}
          />
          {formErrors.first_name && (
            <p className="text-xs text-red-500">{formErrors.first_name}</p>
          )}

          <InputField
            placeholder="Last Name"
            value={formData.last_name}
            onChange={(e) => handleChange("last_name", e.target.value)}
          />
          {formErrors.last_name && (
            <p className="text-xs text-red-500">{formErrors.last_name}</p>
          )}

          <InputField
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          {formErrors.phone && (
            <p className="text-xs text-red-500">{formErrors.phone}</p>
          )}

          <InputField
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {formErrors.email && (
            <p className="text-xs text-red-500">{formErrors.email}</p>
          )}

          <InputField
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          {formErrors.password && (
            <p className="text-xs text-red-500">{formErrors.password}</p>
          )}

          <InputField
            type="password"
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={(e) => handleChange("confirm_password", e.target.value)}
          />
          {formErrors.confirm_password && (
            <p className="text-xs text-red-500">
              {formErrors.confirm_password}
            </p>
          )}
        </div>

        <button
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>

        <p className="text-sm text-gray-600 mt-3">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="text-primary font-medium hover:underline"
          >
            Sign in
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

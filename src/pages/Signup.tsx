import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import AuthLogo from "@/components/global/AuthLogo";
import { register } from "@/api/auth";
import { useValidateSchema } from "@/hooks/useValidateSchema";
import { registerSchema } from "@/utils/schemas";
import FormInput from "@/components/form-fields/FormInput";

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

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validatedData = useValidateSchema(registerSchema, formData);
    if (!validatedData) return;

    setLoading(true);

    try {
      const res = await register(validatedData);
      console.log("REGISTER RESPONSE:", res);

      navigate("/sign-in");
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6 py-10">
      <form onSubmit={handleSubmit} className="w-full max-w-sm text-center">
        <div className="w-max mx-auto mb-3">
          <AuthLogo />
        </div>

        <h1 className="text-2xl font-bold">Sign up</h1>

        <p className="text-sm text-gray-500 mb-6">
          Get Maximum <span className="text-primary">Satisfaction</span>
          <br />
          From Service Providers
        </p>

        <div className="space-y-4 mb-6 text-left">
          <FormInput
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            handleInputChange={handleChange}
            type="text"
            required
          />

          <FormInput
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            handleInputChange={handleChange}
            type="text"
            required
          />

          <FormInput
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            handleInputChange={handleChange}
            type="tel"
            required
            maxLength={11}
          />

          <FormInput
            name="email"
            placeholder="Email Address"
            value={formData.email}
            handleInputChange={handleChange}
            type="email"
            required
          />

          <FormInput
            name="password"
            placeholder="Password"
            value={formData.password}
            handleInputChange={handleChange}
            type="password"
            required
          />

          <FormInput
            name="confirm_password"
            placeholder="Confirm Password"
            value={formData.confirm_password}
            handleInputChange={handleChange}
            type="password"
            required
          />
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
          <div className="flex-grow border-t-2 border-gray-300"></div>
          <span className="px-3 text-sm text-gray-400">or</span>
          <div className="flex-grow border-t-2 border-gray-300"></div>
        </div>

        <div className="flex justify-center gap-6">
          <button
            aria-label="Continue with Facebook"
            className="w-8 h-8 rounded-full bg-[#1877F2] grid place-items-center"
          >
            <FaFacebookF className="w-4 h-4 text-white" />
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

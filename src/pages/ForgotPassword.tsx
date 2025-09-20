import React from "react";
import { Link } from "react-router-dom";
import brandLogo from "../assets/brandName.png";
import InputField from "../components/InputField";

const ForgotPassword: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6">
      <div className="w-full max-w-sm text-center">
        {/* Logo */}
        <img
          src={brandLogo}
          alt="Brand Logo"
          className="mx-auto w-20 h-20 mb-4"
        />

        {/* Title */}
        <h1 className="text-2xl font-bold">Forgot Password?</h1>
        <p className="text-sm text-gray-500 mb-6">
          Enter your email and we’ll send you instructions to reset your
          password
        </p>

        {/* Form */}
        <div className="space-y-4 mb-6">
          <InputField type="email" placeholder="Email Address" />
        </div>

        {/* Submit */}
        <button className="w-full bg-[#222BDE] text-white py-3 rounded-lg font-medium hover:opacity-90">
          Send Reset Link
        </button>

        {/* Back to Signin */}
        <p className="text-sm text-gray-600 mt-3">
          Remember your password?{" "}
          <Link
            to="/signin"
            className="text-[#222BDE] font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

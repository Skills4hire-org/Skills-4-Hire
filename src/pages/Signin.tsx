import React from "react";
import { Link } from "react-router-dom";
import brandLogo from "../assets/BrandName.png";
import { FaFacebookF } from "react-icons/fa";
import InputField from "../components/InputField";

const Signin: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6">
      <div className="w-full max-w-sm text-center">
        {/* Logo */}
        <img
          src={brandLogo}
          alt="Brand Logo"
          className="mx-auto w-20 h-20 mb-4"
        />

        <h1 className="text-2xl font-bold">Sign in</h1>
        <p className="text-sm text-gray-500 mb-6">
          Enter your email and password you created during registration
        </p>

        {/* Form */}
        <div className="space-y-4 mb-2">
          <InputField type="email" placeholder="Email Address" />

          <InputField type="password" placeholder="Password" />

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-[#222BDE] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        {/* Signin Button */}
        <button className="w-full bg-[#222BDE] text-white py-3 rounded-lg font-medium hover:opacity-90">
          Sign in
        </button>

        <p className="text-sm text-gray-600 mt-3">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#222BDE] font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>

        <p className="text-xs text-gray-600 mt-3 leading-snug">
          By clicking the{" "}
          <span className="font-medium text-black">Sign in</span> button you
          accept the{" "}
          <span className="text-[#222BDE] font-medium hover:underline">
            Terms of the Privacy Policy
          </span>
        </p>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t-2 border-gray-400"></div>
          <span className="px-3 text-sm text-gray-400">or</span>
          <div className="flex-grow border-t-2 border-gray-400"></div>
        </div>

        {/* Social login icons */}
        <div className="flex justify-center gap-6">
          {/* Facebook */}
          <button
            aria-label="Continue with Facebook"
            className="w-8 h-8 rounded-full bg-[#1877F2] grid place-items-center"
          >
            <FaFacebookF className="w-4 h-4" color="#FFFFFF" />
          </button>

          {/* Google */}
          <img
            src="https://img.icons8.com/color/48/google-logo.png"
            alt="Google"
            className="w-8 h-8"
          />

          {/* Apple */}
          <img
            src="https://img.icons8.com/ios-filled/50/mac-os.png"
            alt="Apple"
            className="w-8 h-8"
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;

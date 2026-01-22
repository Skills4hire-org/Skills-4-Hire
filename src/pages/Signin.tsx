import { Link } from "react-router-dom";
import brandLogo from "@/assets/images/logo3.png";
import { FaFacebookF } from "react-icons/fa";
import InputField from "../components/InputField";

export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6">
      <div className="w-full max-w-sm text-center">
        <img
          src={brandLogo}
          alt="Brand Logo"
          className="
            mx-auto
            object-contain
            h-12
            sm:h-14
            md:h-16
            lg:h-16
            mb-2
          "
        />

        <h1 className="text-2xl font-bold">Sign in</h1>

        <p className="text-sm text-gray-500 mb-6">
          Enter your email and password you created during registration
        </p>

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

        <button className="w-full bg-[#222BDE] text-white py-3 rounded-lg font-medium hover:opacity-90">
          Sign in
        </button>

        <p className="text-sm text-gray-600 mt-3">
          Don&apos;t have an account?{" "}
          <Link
            to="/sign-up"
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
      </div>
    </div>
  );
}

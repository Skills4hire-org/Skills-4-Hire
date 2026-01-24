import { Link } from "react-router-dom";
import Logo3 from "@/components/global/Logo3";
import InputField from "../components/InputField";

export default function ForgotPassword() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6">
      <div className="w-full max-w-sm text-center">
        <div className="w-max mx-auto mb-1">
          <Logo3 size="h-[38px] md:h-[42px]" />
        </div>

        <h1 className="text-2xl font-bold">Forgot Password?</h1>

        <p className="text-sm text-gray-500 mb-6">
          Enter your email and we’ll send you instructions to reset your
          password
        </p>

        <div className="space-y-4 mb-6">
          <InputField type="email" placeholder="Email Address" />
        </div>

        <button className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90">
          Send Reset Link
        </button>

        <p className="text-sm text-gray-600 mt-3">
          Remember your password?{" "}
          <Link
            to="/sign-in"
            className="text-primary font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

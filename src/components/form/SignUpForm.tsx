import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "@/api/auth";
import { useValidateSchema } from "@/hooks/useValidateSchema";
import { registerSchema } from "@/utils/schemas";
import FormInput from "@/components/form-fields/FormInput";
import { toast } from "sonner";

export default function SignUpForm() {
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
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validatedData = useValidateSchema(registerSchema, formData);
    if (!validatedData) return;

    setLoading(true);

    try {
      const response = await register(validatedData);

      toast.success(response?.message || "Account created successfully");

      navigate("/verification", {
        state: { email: validatedData.email },
      });
    } catch (error: any) {
      toast.error(error?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6 text-left">
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

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-3 rounded-lg font-medium disabled:opacity-60"
      >
        {loading ? "Signing up..." : "Sign up"}
      </button>
    </form>
  );
}

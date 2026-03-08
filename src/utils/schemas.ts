import z from "zod";

export const personalInfoFormSchema = z.object({
  phone: z
    .string()
    .trim()
    .startsWith("0", { message: "Phone number must start with 0" })
    .length(11, {
      message: "Please enter a valid 11-digit phone number",
    }),
  nin: z.string().length(10, {
    message: "Please enter a valid 10-digit NIN",
  }),
});

export const applicationProfileFormSchema = z.object({
  headline: z
    .string()
    .min(25, "Headline must be at least 25 characters.")
    .max(90, "Headline not exceed 90 characters."),
});

// AUTH SCHEMAS

export const loginSchema = z.object({
  email: z.email({ message: "Enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const registerSchema = z
  .object({
    first_name: z.string().min(1, { message: "First name is required" }),
    last_name: z.string().min(1, { message: "Last name is required" }),

    phone: z
      .string()
      .trim()
      .min(1, { message: "Phone number is required" })
      .startsWith("0", { message: "Phone number must start with 0" })
      .length(11, { message: "Please enter a valid 11-digit phone number" }),

    email: z.email({ message: "Enter a valid email address" }),

    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),

    confirm_password: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

// Withdrawal Schema

export const withdrawSchema = z.object({
  accountName: z.string().min(2, "Full name is required"),

  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Amount must be a valid number",
    })
    .refine((val) => Number(val) >= 1000, {
      message: "Minimum withdrawal is ₦1000",
    }),

  accountNumber: z
    .string()
    .regex(/^\d+$/, "Account number must contain only digits")
    .length(10, "Account number must be exactly 10 digits"),

  bank: z.string().min(1, "Please select a bank"),
});

// Pin Verification Schema
export const withdrawPinSchema = z.object({
  pin: z
    .string()
    .min(4, "PIN must be 4 digits")
    .max(4, "PIN must be 4 digits")
    .regex(/^\d+$/, "PIN must contain only numbers"),
});

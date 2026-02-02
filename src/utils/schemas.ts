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

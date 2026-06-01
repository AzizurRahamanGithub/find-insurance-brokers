import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required"),
});

export const registerSchema = z.object({
  full_name: z.string().nonempty("Name is required"),
  email: z
    .string()
    .trim()
    .nonempty("Email is required")
    .email("Invalid email address"),
  category: z.string().optional(),
  image: z.any().optional(),
  licence_image: z.any().optional(),
  id_image: z.any().optional(),
  id_with_image: z.any().optional(),
  password: z
    .string()
    .min(1, "Password is required")
    .max(50, "Password too long"),
  confirm_password: z
    .string()
    .min(1, "Confirm password is required"),
  isAgree: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

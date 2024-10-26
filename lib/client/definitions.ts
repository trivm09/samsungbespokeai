import { z } from "zod";

// Define the validation schema
const emailValidation = z
  .string()
  .email({ message: "Please enter a valid email." })
  .trim();
const passwordValidation = z
  .string()
  .min(8, { message: "Be at least 8 characters long" })
  .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
  .regex(/[0-9]/, { message: "Contain at least one number." })
  .regex(/[^a-zA-Z0-9]/, { message: "Contain at least one special character." })
  .trim();

const nameValidation = z
  .string()
  .min(1, { message: "Tên không được để trống !" })
  .trim();

export const SignupFormSchema = z.object({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
});

export const LoginFormSchema = z.object({
  email: emailValidation,
  password: z
    .string()
    .min(1, { message: "Password must not be empty." })
    .trim(),
});

export const CustomerFormSchema = z.object({
  name: nameValidation,
  phone: z
    .string()
    .length(10, { message: "Số điện thoại không hợp lệ !" })
    .trim(),
});

export type LoginState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type SignupState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type CustomerState =
  | {
      errors?: {
        name?: string[];
        phone?: string[];
      };
      message?: string;
    }
  | undefined;

"use server";

import {
  SignupFormSchema,
  SignupState,
  LoginState,
  LoginFormSchema,
} from "@/lib/client/definitions";
import {
  createUser,
  getUserByEmail,
  getUsersCount,
} from "@/lib/server/db/user";
import bcrypt from "bcrypt";
import { createSession } from "../../lib/server/session";
import { redirect } from "next/navigation";

const handleRedirect = (role: string) => {
  if (role !== "admin") {
    redirect("/");
  }
  redirect("/admin");
};

export async function signup(_: SignupState, formData: FormData) {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  // 2. Prepare data for insertion into database
  const { name, email, password } = validatedFields.data;
  // Check if a user with the same email already exists
  const existingUser = await getUserByEmail(email);
  // If a user with the same email exists, return early
  if (existingUser) {
    return {
      message: "An account with this email already exists.",
    };
  }

  const code = formData.get("code");
  // Check if the code is correct
  if (code !== process.env.SIGNUP_CODE) {
    return {
      message: "Incorrect code.",
    };
  }
  // Check if the user database is empty
  const usersCount = await getUsersCount();
  // Assign role based on whether the database is empty
  const role = usersCount === 0 ? "admin" : "user";
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);
  // 3. Insert the user into the database or call an Auth Library's API
  const user = await createUser(name, email, hashedPassword, role);
  // 4. Create user session
  await createSession(user.id);

  // 5. Redirect user
  handleRedirect(role);
}

export async function login(state: LoginState, formData: FormData) {
  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  // 2. Prepare data for insertion into database
  const { email, password } = validatedFields.data;
  // 3. Check if the user exists in the database
  const existingUser = await getUserByEmail(email);
  // If a user with the same email exists, return early
  if (!existingUser) {
    return {
      message: "An account with this email does not exist.",
    };
  }

  // 4. Check if the password is correct
  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password,
  );

  // If the password is incorrect, return early
  if (!isPasswordCorrect) {
    return {
      message: "Incorrect password.",
    };
  }
  // 5. Create user session
  await createSession(existingUser.id);
  // 6. Redirect user
  handleRedirect(existingUser.role);
}

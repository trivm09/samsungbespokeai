import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserById } from "./db/user";
import { getCustomerById } from "./db/customer";
import { decrypt } from "./jwt";

// Verify the user's session
export const verifySession = async () => {
  const token = cookies().get("session")?.value;

  const payload = await decrypt(token);

  if (!payload) {
    redirect("/auth/login");
  }

  const userId = payload.userId as string;
  const user = await getUserById(userId);

  if (!user) {
    redirect("/auth/signup");
  }

  return user;
};

// Verify the user's token
export const verifyToken = async (token: string) => {
  const payload = await decrypt(token.split(" ")[1]);

  if (!payload) {
    return null;
  }

  const userId = payload.userId as string;
  const user = await getUserById(userId);

  if (!user) {
    return null;
  }

  return user;
};

// Verify the customer's session
export const verifyCustomer = async () => {
  const token = cookies().get("session")?.value;
  const payload = await decrypt(token);

  if (!payload) {
    redirect("/");
  }

  const customerId = payload.userId as string;
  const customer = await getCustomerById(customerId);

  if (!customer) {
    redirect("/");
  }
};

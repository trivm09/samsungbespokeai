"use server";

import { CustomerFormSchema, CustomerState } from "@/lib/client/definitions";
import {
  createCustomer,
  getCustomerById,
  getCustomerByPhone,
} from "@/lib/server/db/customer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// import axios from "axios";
import { createSession } from "@/lib/server/session";
import { decrypt } from "@/lib/server/jwt";

export async function customerRegistration(
  _: CustomerState,
  formData: FormData,
) {
  // Validate form fields using CustomerFormSchema
  const validatedFields = CustomerFormSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
  });
  // If validation fails, return the errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  // Extract validated fields
  const { name, phone } = validatedFields.data;
  const email = formData.get("email") as string;

  const customer = await getCustomerByPhone(phone);
  if (customer) {
    return {
      message: "Số điện thoại đã tồn tại",
    };
  }

  // Production
  // try {
  //   // Send OTP to the customer's phone number
  //   const res = await axios.post(
  //     "https://samsung-otp.codev.vn/api/send-otp",
  //     {
  //       token: process.env.OTP_TOKEN,
  //       phone: phone,
  //     },
  //     { headers: { "Content-Type": "application/json" } },
  //   );
  //   // If OTP sending fails, return an error message
  //   if (!res.data.status) {
  //     return {
  //       message: "Gửi mã OTP thất bại",
  //     };
  //   }
  //   // Extract OTP from the response
  //   const otp = res.data.otp;
  //   // Create a new customer with the provided details and OTP
  //   const newCustomer = await createCustomer(name, phone, email, otp);
  //   await createSession(newCustomer.id);
  // } catch (err) {
  //   console.error(err);
  //   return {
  //     message: "Đã có lỗi xảy ra, vui lòng thử lại sau",
  //   };
  // }

  // Development
  // Create a new customer with the provided details and OTP
  const newCustomer = await createCustomer(name, phone, email, "9999");
  await createSession(newCustomer.id);

  redirect("/customer");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function verifyOTP(_: any, formData: FormData) {
  const token = cookies().get("session")?.value;
  const payload = await decrypt(token);

  if (!payload) {
    redirect("/");
  }

  const otp = formData.get("otp");
  if (!otp) {
    return {
      message: "Vui lòng nhập mã OTP",
    };
  }

  const customerId = payload.userId as string;
  const customer = await getCustomerById(customerId);

  if (!customer) {
    redirect("/");
  }

  if (otp === "9999") {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    cookies().set("customerId", customer.id, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
    });
    redirect("/customer/journey");
  }

  if (customer.otp !== otp) {
    return {
      message: "Mã OTP không chính xác",
    };
  }
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookies().set("customerId", customer.id, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  redirect("/customer/journey");
}

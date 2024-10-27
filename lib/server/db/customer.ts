import { prisma } from "@/lib/server/db/db";
import { Customer } from "@prisma/client";

export const createCustomer = async (
  name: string,
  phone: string,
  email: string,
  otp: string,
): Promise<Customer> => {
  return await prisma.customer.create({
    data: {
      name: name,
      phone: phone,
      email: email,
      otp: otp,
    },
  });
};

export const getCustomerByPhone = async (
  phone: string,
): Promise<Customer | null> => {
  return await prisma.customer.findUnique({
    where: {
      phone: phone,
    },
  });
};

export const getCustomerById = async (id: string): Promise<Customer | null> => {
  return await prisma.customer.findUnique({
    where: {
      id: id,
    },
  });
};

export const updateCustomerJourney = async (
  id: string,
  journeyField: string,
  journeyValue: boolean,
): Promise<Customer | null> => {
  return await prisma.customer.update({
    where: {
      id: id,
    },
    data: {
      [journeyField]: journeyValue,
    },
  });
};

export const updateCustomerGift = async (
  id: string,
  giftField: string,
  giftValue: boolean,
): Promise<Customer | null> => {
  return await prisma.customer.update({
    where: {
      id: id,
    },
    data: {
      [giftField]: giftValue,
    },
  });
};

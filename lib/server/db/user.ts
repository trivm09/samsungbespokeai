import { v4 as uuidv4 } from "uuid";
import { prisma } from "./db";
import { User } from "@prisma/client";

export const createUser = async (
  name: string | undefined,
  email: string,
  password: string,
  role: string,
): Promise<User> => {
  return await prisma.user.create({
    data: {
      id: uuidv4(),
      name: name,
      email: email,
      password: password,
      role: role,
    },
  });
};

export const getUsersCount = async (): Promise<number> => {
  return await prisma.user.count();
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { email } });
};

export const getUserById = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { id } });
};

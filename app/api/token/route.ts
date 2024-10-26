import { getUserByEmail } from "@/lib/server/db/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { encrypt } from "@/lib/server/jwt";

export const POST = async (req: Request): Promise<NextResponse> => {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Invalid email or password !" },
      { status: 400 },
    );
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return NextResponse.json({ error: "User not found !" }, { status: 404 });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return NextResponse.json(
      { error: "Incorrect password !" },
      { status: 401 },
    );
  }

  if (user.role !== "admin") {
    return NextResponse.json({ error: "Access denied !" }, { status: 403 });
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const token = await encrypt({ userId: user.id, expiresAt });

  return NextResponse.json({ token: token }, { status: 200 });
};

import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/server/dal";
import { updateCustomerGift } from "@/lib/server/db/customer";

async function verifyAdminToken(req: Request): Promise<NextResponse | null> {
  const token = req.headers.get("Authorization");
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const isVerify = await verifyToken(token);
    if (isVerify?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

export const PUT = async (req: Request): Promise<NextResponse> => {
  const isAuth = await verifyAdminToken(req);
  if (isAuth) return isAuth;

  const { id, giftField, giftValue } = await req.json();

  try {
    switch (giftField) {
      case "gift1":
        await updateCustomerGift(id, giftField, giftValue);
        break;
      case "gift2":
        await updateCustomerGift(id, giftField, giftValue);
        break;

      default:
        break;
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }

  return NextResponse.json({ message: "Update success" }, { status: 200 });
};

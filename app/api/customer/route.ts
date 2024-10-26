import {
  getCustomerById,
  updateCustomerJourney,
} from "@/lib/server/db/customer";
import { verifyToken } from "@/lib/server/dal";
import { NextResponse } from "next/server";
import redis from "@/lib/redis";

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

export const POST = async (req: Request): Promise<NextResponse> => {
  const isAuth = await verifyAdminToken(req);
  if (isAuth) return isAuth;

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const customer = await getCustomerById(id);
    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(customer, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Get customer failed" }, { status: 400 });
  }
};

export const PUT = async (req: Request): Promise<NextResponse> => {
  const isAuth = await verifyAdminToken(req);
  if (isAuth) return isAuth;

  const { id, journeyField, journeyValue } = await req.json();
  console.log(id, journeyField, journeyValue);
  try {
    switch (journeyField) {
      case "journey1":
        await updateCustomerJourney(id, "journey1", journeyValue);
        break;
      case "journey2":
        await updateCustomerJourney(id, "journey2", journeyValue);
        break;
      case "journey3":
        await updateCustomerJourney(id, "journey3", journeyValue);
        break;
      case "journey4":
        await updateCustomerJourney(id, "journey4", journeyValue);
        break;
      default:
        break;
    }

    // Notify clients
    await redis.publish(
      id,
      JSON.stringify({ id, [journeyField]: journeyValue }),
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }

  return NextResponse.json({ message: "Update success" }, { status: 200 });
};

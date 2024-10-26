import { NextResponse } from "next/server";
import { addClient } from "@/lib/server/longpolling";

export const GET = async (req: Request): Promise<NextResponse> => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  console.log("Longpolling id:", id);

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  return new Promise((resolve) => {
    addClient(id, resolve);
  });
};

import { NextResponse } from "next/server";
import { clientManager } from "@/lib/server/longpolling";

export const GET = async (req: Request): Promise<NextResponse> => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  // return new Promise((resolve) => {
  //   addClient(id, resolve);
  // });

  return new Promise((resolve) => {
    clientManager.addClient(id, resolve);
  });
};

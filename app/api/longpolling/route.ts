// import { NextResponse } from "next/server";
// import { getCustomerById } from "@/lib/server/db/customer";

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// let clients: any[] = [];

// export const GET = async (req: Request): Promise<NextResponse> => {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");

//   if (!id) {
//     return NextResponse.json({ error: "Missing id" }, { status: 400 });
//   }

//   return new Promise((resolve) => {
//     clients.push({ id, resolve });

//     // Timeout after 30 seconds
//     setTimeout(() => {
//       clients = clients.filter((client) => client.id !== id);
//       resolve(new NextResponse(null, { status: 204 })); // Return empty response with status 204
//     }, 30000);
//   });
// };

// export const notifyClients = async (id: string) => {
//   const customer = await getCustomerById(id);
//   clients.forEach((client) => {
//     if (client.id === id) {
//       client.resolve(NextResponse.json(customer, { status: 200 }));
//     }
//   });
//   clients = clients.filter((client) => client.id !== id);
// };

// app/api/longpolling/route.ts
import { NextResponse } from "next/server";
import { addClient } from "@/lib/server/longpolling";

export const GET = async (req: Request): Promise<NextResponse> => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  return new Promise((resolve) => {
    addClient(id, resolve);
  });
};

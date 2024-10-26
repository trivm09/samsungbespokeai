// import { NextResponse } from "next/server";
// import { getCustomerById } from "@/lib/server/db/customer";

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// let clients: any[] = [];

// export const addClient = (
//   id: string,
//   resolve: (value: NextResponse) => void,
// ) => {
//   console.log("Adding client", id);
//   clients.push({ id, resolve });
//   console.log("Current clients:", clients);
//   // Timeout after 10 seconds
//   setTimeout(() => {
//     console.log("Timing out client", id);
//     clients = clients.filter((client) => client.id !== id);
//     console.log("Clients after timeout:", clients);
//     resolve(new NextResponse(null, { status: 204 })); // Return empty response with status 204
//   }, 10000);
// };

// export const notifyClients = async (id: string) => {
//   console.log("Notifying clients", id);
//   const customer = await getCustomerById(id);
//   console.log("Customer", customer);
//   console.log("Clients before notification:", clients);
//   clients.forEach((client) => {
//     if (client.id === id) {
//       console.log("Resolving client", id);
//       client.resolve(NextResponse.json(customer, { status: 200 }));
//     }
//   });
//   clients = clients.filter((client) => client.id !== id);
//   console.log("Clients after notification:", clients);
// };

import { NextResponse } from "next/server";
import { getCustomerById } from "@/lib/server/db/customer";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "");
const resolveMap = new Map<string, (value: NextResponse) => void>();

export const addClient = async (
  id: string,
  resolve: (value: NextResponse) => void,
) => {
  console.log("Adding client", id);
  const clientKey = `client:${id}`;
  await redis.set(clientKey, id, "EX", 10); // Set with expiration of 10 seconds
  resolveMap.set(id, resolve);
  console.log("Current clients:", await redis.keys("client:*"));
};

export const notifyClients = async (id: string) => {
  console.log("Notifying clients", id);
  const customer = await getCustomerById(id);
  console.log("Customer", customer);
  const clientKey = `client:${id}`;
  const clientId = await redis.get(clientKey);
  console.log("Retrieved client ID:", clientId);
  if (clientId) {
    const resolve = resolveMap.get(clientId);
    if (resolve) {
      console.log("Resolving client", clientId);
      resolve(NextResponse.json(customer, { status: 200 }));
      resolveMap.delete(clientId);
    }
    await redis.del(clientKey);
  } else {
    console.log("No client data found for key:", clientKey);
  }
  console.log("Clients after notification:", await redis.keys("client:*"));
};

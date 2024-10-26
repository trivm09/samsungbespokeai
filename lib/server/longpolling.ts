import { NextResponse } from "next/server";
import { getCustomerById } from "@/lib/server/db/customer";
import Redis from "ioredis";
import { EventEmitter } from "events";

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

const redis = new Redis(process.env.REDIS_URL || "");
const eventEmitter = new EventEmitter();

export const addClient = async (
  id: string,
  resolve: (value: NextResponse) => void,
) => {
  console.log("Adding client", id);
  await redis.set(`client:${id}`, JSON.stringify({ id }));
  eventEmitter.once(`notify:${id}`, resolve);
  console.log("Current clients:", await redis.keys("client:*"));

  // Timeout after 10 seconds
  setTimeout(async () => {
    console.log("Timing out client", id);
    await redis.del(`client:${id}`);
    console.log("Clients after timeout:", await redis.keys("client:*"));
    eventEmitter.emit(`notify:${id}`, new NextResponse(null, { status: 204 })); // Return empty response with status 204
  }, 10000);
};

export const notifyClients = async (id: string) => {
  console.log("Notifying clients", id);
  const customer = await getCustomerById(id);
  console.log("Customer", customer);
  const clientKeys = await redis.keys(`client:${id}`);
  console.log("Clients before notification:", clientKeys);

  for (const key of clientKeys) {
    const clientData = await redis.get(key);
    if (clientData) {
      JSON.parse(clientData);
      console.log("Resolving client", id);
      eventEmitter.emit(
        `notify:${id}`,
        NextResponse.json(customer, { status: 200 }),
      );
    }
  }

  await redis.del(`client:${id}`);
  console.log("Clients after notification:", await redis.keys("client:*"));
};

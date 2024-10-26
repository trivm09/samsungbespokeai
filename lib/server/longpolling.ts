// import { NextResponse } from "next/server";
// import { getCustomerById } from "@/lib/server/db/customer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let clients: any[] = [];

// Simple in-memory cache
const cache = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set: (key: string, value: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any)[key] = value;
  },
  get: (key: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (global as any)[key];
  },
};

export const addClient = (
  id: string,
  resolve: (value: NextResponse) => void,
) => {
  console.log("Adding client", id);

  clients.push({ id, resolve });
  cache.set("clients", clients);
  console.log("Current clients:", clients);
  // Timeout after 10 seconds
  setTimeout(() => {
    console.log("Timing out client", id);
    clients = clients.filter((client) => client.id !== id);
    cache.set("clients", clients);
    console.log("Clients after timeout:", clients);
    resolve(new NextResponse(null, { status: 204 })); // Return empty response with status 204
  }, 10000);
};

export const notifyClients = async (id: string) => {
  console.log("Notifying clients", id);
  const customer = await getCustomerById(id);
  console.log("Customer", customer);
  clients = cache.get("clients") || [];
  console.log("Clients before notification:", clients);
  clients.forEach((client) => {
    if (client.id === id) {
      console.log("Resolving client", id);
      client.resolve(NextResponse.json(customer, { status: 200 }));
    }
  });
  clients = clients.filter((client) => client.id !== id);
  cache.set("clients", clients);
  console.log("Clients after notification:", clients);
};

import { NextResponse } from "next/server";
import { getCustomerById } from "@/lib/server/db/customer";

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

let client: { id: string; resolve: (value: NextResponse) => void } = {
  id: "",
  resolve: () => {},
};

export const addClient = (
  id: string,
  resolve: (value: NextResponse) => void,
) => {
  client = { id, resolve };
  // Timeout after 10 seconds
  setTimeout(() => {
    resolve(new NextResponse(null, { status: 204 })); // Return empty response with status 204
  }, 10000);
};

export const notifyClients = async (id: string) => {
  const customer = await getCustomerById(id);
  client.resolve(NextResponse.json(customer, { status: 200 }));
};

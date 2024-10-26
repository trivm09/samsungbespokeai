import { NextResponse } from "next/server";
import { getCustomerById } from "@/lib/server/db/customer";
import redis from "../redis";
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

export const addClient = async (
  id: string,
  resolve: (value: NextResponse) => void,
) => {
  console.log("Adding client", id);

  // Lưu client vào Redis với expiration
  await redis.setex(`client:${id}`, 10, JSON.stringify({ id }));

  // Timeout sau 10 giây
  setTimeout(async () => {
    console.log("Timing out client", id);
    await redis.del(`client:${id}`);
    resolve(new NextResponse(null, { status: 204 })); // Trả về response 204
  }, 10000);
};

export const notifyClients = async (id: string) => {
  console.log("Notifying clients", id);
  const customer = await getCustomerById(id);
  console.log("Customer", customer);

  // Lấy dữ liệu client từ Redis
  const clientData = await redis.get(`client:${id}`);

  if (clientData) {
    console.log("Resolving client", id);
    // Trả về dữ liệu cho client
    await redis.del(`client:${id}`); // Xóa client khỏi Redis sau khi thông báo
    return NextResponse.json(customer, { status: 200 });
  } else {
    console.log("Client not found or timed out");
  }
};

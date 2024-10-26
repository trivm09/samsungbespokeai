import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export const GET = async (req: Request): Promise<NextResponse> => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  return new Promise((resolve) => {
    const customer = redis.duplicate(); // Create a new connection for each long polling

    customer.on("error", (err) => {
      console.error("Redis error:", err);
      resolve(NextResponse.json({ error: "Redis error" }, { status: 500 }));
      if (customer.status !== "end") {
        customer.quit();
      }
    });

    customer.subscribe(id, (err) => {
      if (err) {
        console.error("Subscription failed:", err);
        resolve(
          NextResponse.json({ error: "Subscription failed" }, { status: 500 }),
        );
        if (customer.status !== "end") {
          customer.quit();
        }
        return;
      }
    });

    customer.on("message", (channel, message) => {
      if (channel === id) {
        console.log("Message received:", message);
        resolve(NextResponse.json(JSON.parse(message), { status: 200 }));
        if (customer.status !== "end") {
          customer.unsubscribe(id, (err) => {
            if (err) {
              console.error("Unsubscription error:", err);
            }
            customer.quit();
          });
        }
      }
    });

    const timeoutId = setTimeout(() => {
      if (customer.status !== "end") {
        customer.unsubscribe(id, (err) => {
          if (err) {
            console.error("Unsubscription error:", err);
          }
          customer.quit();
          resolve(NextResponse.json({ error: "Timeout" }, { status: 408 }));
        });
      }
    }, 10000);

    // Cleanup on request abort
    req.signal.addEventListener("abort", () => {
      clearTimeout(timeoutId);
      if (customer.status !== "end") {
        customer.unsubscribe(id, (err) => {
          if (err) {
            console.error("Unsubscription error:", err);
          }
          customer.quit();
        });
      }
    });
  });
};

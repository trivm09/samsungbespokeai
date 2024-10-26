import { verifySession } from "@/lib/server/dal";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await verifySession();
  const role = session?.role;

  if (role !== "user" && role !== "admin") {
    redirect("/");
  }

  return <main className="flex items-center justify-center">{children}</main>;
}

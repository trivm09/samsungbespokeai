import { verifySession } from "@/lib/server/dal";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await verifySession();
    const userRole = session?.role;

    if (userRole !== "admin") {
        redirect("/auth/login");
    }

    return;
}

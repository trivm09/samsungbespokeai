import { verifyCustomer } from "@/lib/server/dal";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await verifyCustomer();
  return <main className="flex items-center justify-center">{children}</main>;
}

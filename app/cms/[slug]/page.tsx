import { Staff } from "@/components/custom-ui/staff";
import { redirect } from "next/navigation";

type SlugType = "journey1" | "journey2" | "journey3" | "journey4";

export default function Page({ params }: { params: { slug: SlugType } }) {
  const { slug } = params;

  if (!["journey1", "journey2", "journey3", "journey4"].includes(slug)) {
    redirect("/cms");
  }

  return <Staff journey={slug} />;
}

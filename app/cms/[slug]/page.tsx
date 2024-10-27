import Gift from "@/components/custom-ui/gift";
import { Staff } from "@/components/custom-ui/staff";
import { redirect } from "next/navigation";

type SlugType = "journey1" | "journey2" | "journey3" | "journey4" | "gift";

export default function Page({ params }: { params: { slug: SlugType } }) {
  const { slug } = params;

  if (
    !["journey1", "journey2", "journey3", "journey4", "gift"].includes(slug)
  ) {
    redirect("/cms");
  }

  if (slug === "gift") {
    return <Gift />;
  }

  return <Staff journey={slug} />;
}

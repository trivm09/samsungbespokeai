import { JourneySection } from "@/components/custom-ui/journey-section";
import { cookies } from "next/headers";

export default function Page() {
  const id = cookies().get("customerId")?.value || "";
  return <JourneySection id={id} />;
}

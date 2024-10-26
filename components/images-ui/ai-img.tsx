import Image from "next/image";
import ai from "@/assets/images/ai.png";

export default function AiImg() {
  return <Image src={ai} alt="ai" height={80} className="select-none" draggable={false} />;
}

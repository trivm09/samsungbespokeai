import Image from "next/image";
import smartHome from "@/assets/images/smart-home.png";

export default function SmartHome() {
  return <Image src={smartHome} alt="smartHome" height={80} className="select-none" draggable={false} />;
}

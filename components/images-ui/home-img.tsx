import Image from "next/image";
import home from "@/assets/images/home.png";

export default function HomeImg() {
  return <Image src={home} alt="home" height={80} className="select-none" draggable={false} />;
}

import Image from "next/image";
import logo from "@/assets/images/logo.png";

export const Logo = () => {
  return <Image src={logo} alt="logo" priority={true} loading="eager" className="w-1/2" draggable={false} />;
};

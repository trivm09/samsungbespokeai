import Image from "next/image";
import button from "@/assets/images/button.png";

export const SSButton = () => {
  return <Image src={button} alt="button" priority={true} loading="eager" className="w-1/3 drop-shadow-md" draggable={false} />;
};

import Image from "next/image";
import wellcomeText from "@/assets/images/welcome-text.png";

export const WelcomeText = () => {
  return <Image src={wellcomeText} alt="wellcomeText" priority={true} loading="eager" className="w-2/3" draggable={false} />;
};

import Image from "next/image";
import gift from "@/assets/images/gift.png";

export const Gift = () => {
  return <Image src={gift} alt="gift" priority={true} loading="eager" className="" draggable={false} />;
};

import Image from "next/image";

import bgContainer from "@/assets/images/bg-container.png";

export const BackgroundContainer = () => {
  return <Image src={bgContainer} alt="bgContainer" priority={true} loading="eager" className="absolute left-0 top-0 -z-40 h-full w-full" draggable={false} />;
};

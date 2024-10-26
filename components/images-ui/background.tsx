import Image from "next/image";

import loginSceneBg from "@/assets/images/login-scene-bg.png";

export const Background = () => {
  return (
    <Image
      src={loginSceneBg}
      alt="loginSceneBg"
      priority={true}
      loading="eager"
      className="fixed left-1/2 top-1/2 -z-50 h-screen w-full max-w-[425px] -translate-x-2/4 -translate-y-2/4"
      draggable={false}
    />
  );
};

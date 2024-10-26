import { Background } from "@/components/images-ui/background";
import { WelcomeText } from "@/components/images-ui/welcome-text";
import Image from "next/image";

import logo from "@/assets/images/logo.png";
import SmartHome from "@/components/images-ui/smart-home";
import QueenChallenge from "@/components/images-ui/queen-challenge";
import AiImg from "@/components/images-ui/ai-img";
import HomeImg from "@/components/images-ui/home-img";
import { BackgroundContainer } from "@/components/images-ui/background-container";
import Link from "next/link";

export default function Page() {
  return (
    <section className="flex w-full max-w-[425px] flex-col items-center justify-center">
      <Background />
      <div className="flex h-[13vh] w-full max-w-[425px] items-center justify-between px-12">
        <div className="flex-grow">
          <Image
            src={logo}
            alt="logo"
            priority={true}
            loading="eager"
            className="w-full"
            draggable={false}
          />
        </div>
        <div className="flex justify-end">
          <WelcomeText />
        </div>
      </div>
      <div className="flex w-full max-w-[425px] flex-grow flex-col items-center gap-2 px-9 pt-10">
        <h1 className="text-4xl text-black">KHU VỰC ​</h1>
        <h1 className="text-4xl text-black">CỦA BẠN</h1>

        <div className="grid grid-flow-row grid-cols-2 gap-2">
          <Link href="/cms/journey1">
            <div className="relative flex h-32 flex-col items-center justify-around overflow-hidden rounded-xl border-[1px] border-white p-2 drop-shadow-md active:scale-95">
              <BackgroundContainer />
              <h1 className="select-none text-xs text-black">
                Triển lãm nhà đẹp​
              </h1>
              <SmartHome />
            </div>
          </Link>

          <Link href="/cms/journey2">
            <div className="relative flex h-32 flex-col items-center justify-around overflow-hidden rounded-xl border-[1px] border-white p-2 drop-shadow-md active:scale-95">
              <BackgroundContainer />
              <h1 className="select-none text-xs text-black">
                Triển lãm nhà đẹp​
              </h1>
              <QueenChallenge />
            </div>
          </Link>
          <Link href="/cms/journey3">
            <div className="relative flex h-32 flex-col items-center justify-around overflow-hidden rounded-xl border-[1px] border-white p-2 drop-shadow-md active:scale-95">
              <BackgroundContainer />
              <h1 className="select-none text-xs text-black">
                Triển lãm nhà đẹp​
              </h1>
              <AiImg />
            </div>
          </Link>

          <Link href="/cms/journey4">
            <div className="relative flex h-32 flex-col items-center justify-around overflow-hidden rounded-xl border-[1px] border-white p-2 drop-shadow-md active:scale-95">
              <BackgroundContainer />
              <h1 className="select-none text-xs text-black">
                Triển lãm nhà đẹp​
              </h1>
              <HomeImg />
            </div>
          </Link>
          {/* 5th item */}
          <div className="col-span-2 flex justify-center">
            <div className="relative flex h-32 w-44 flex-col items-center justify-around overflow-hidden rounded-xl border-[1px] border-white p-2 drop-shadow-md active:scale-95">
              <BackgroundContainer />
              <h1 className="select-none text-xs text-black">
                Triển lãm nhà đẹp​
              </h1>
              <HomeImg />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

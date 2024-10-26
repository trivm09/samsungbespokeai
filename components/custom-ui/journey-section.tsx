"use client";
import { Background } from "@/components/images-ui/background";
import { Logo } from "@/components/images-ui/logo";
import { WelcomeText } from "@/components/images-ui/welcome-text";
import { Gift } from "@/components/images-ui/gift";
import { CustomerJourney } from "@/components/custom-ui/customer-journey";
import { CustomerQrCode } from "@/components/custom-ui/customer-qrcode";
import { useState } from "react";

export const JourneySection = ({ id }: { id: string }) => {
  const [modal, setModal] = useState(false);

  return (
    <section className="flex w-full max-w-[425px] flex-col items-center justify-center">
      <div onClick={() => setModal(!modal)}>
        <Background />
        <div className="flex h-[15vh] w-full max-w-[425px] items-center p-12">
          <div className="flex flex-col justify-center">
            <Logo />
            <div className="w-3/4">
              <WelcomeText />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="box-content h-14 w-14 rounded-md bg-white p-1">
              <CustomerQrCode id={id} />
            </div>
            <h1 className="text-nowrap text-[.4rem] text-black">
              Bespoke QR của bạn​
            </h1>
          </div>
        </div>
        <div className="flex w-full max-w-[425px] flex-grow flex-col items-center justify-between gap-4 px-10 pt-10">
          <CustomerJourney id={id} />
          <Gift />
        </div>
      </div>

      {modal && (
        <>
          <div className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-white opacity-50"></div>
          <div className="h-full w-full">
            <div className="fixed left-1/2 top-1/2 z-50 w-3/4 max-w-[425px] -translate-x-2/4 -translate-y-2/4 rounded-md bg-white p-4">
              <div className="py-1">
                <h1 className="text-nowrap text-center text-xl text-black">
                  Bespoke QR của bạn
                </h1>
              </div>
              <CustomerQrCode id={id} />
              <div className="flex w-full justify-between gap-2 py-4">
                <button
                  className="w-1/2 rounded-sm bg-red-300 py-1 active:scale-95"
                  onClick={() => setModal(!modal)}
                >
                  Quay lại
                </button>
                <button
                  className="w-1/2 rounded-sm bg-blue-300 py-1 active:scale-95"
                  onClick={() => (window.location.href = "/")}
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

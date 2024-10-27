"use client";

import { useEffect, useState } from "react";
import { Background } from "../images-ui/background";
import { WelcomeText } from "../images-ui/welcome-text";
import logo from "@/assets/images/logo.png";

import Image from "next/image";
import axios from "axios";
import Camera from "./camera";
import { BackgroundContainer } from "../images-ui/background-container";

export const Staff = ({ journey }: { journey: string }) => {
  const [id, setId] = useState("");

  useEffect(() => {
    const Scan = async () => {
      const urlEndpoint = "/api/customer/";

      try {
        const response = await axios.put(
          urlEndpoint,
          { id: id, journeyField: journey, journeyValue: true },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + process.env.ADMIN_TOKEN,
            },
          },
        );
        alert("Quét mã thành công");
        console.log(response.data);
      } catch (err) {
        alert("Quét mã thất bại");
        console.log(err);
      }
    };

    if (id) {
      Scan();
    }
  }, [id, journey]);

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

      <div className="relative flex w-full max-w-[425px] flex-grow flex-col items-center gap-2 px-9 pt-10">
        <h1 className="text-nowrap text-4xl text-black">QUÉT QR ​</h1>
        <h1 className="text-nowrap text-xl text-black">
          ĐỂ HOÀN THÀNH KHU VỰC
        </h1>
        <div className="relative p-2">
          <BackgroundContainer />
          <Camera setQrcode={setId} />
        </div>
      </div>
    </section>
  );
};

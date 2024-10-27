"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Camera from "./camera";
import Image from "next/image";
import { WelcomeText } from "../images-ui/welcome-text";
import { Background } from "../images-ui/background";
import logo from "@/assets/images/logo.png";

import { BackgroundContainer } from "../images-ui/background-container";
import gift1 from "@/assets/images/gift-1.png";
import gift2 from "@/assets/images/gift-2.png";
import { Customer } from "@prisma/client";
export default function Gift() {
  const [id, setId] = useState("");
  const [customer, setCustomer] = useState<Customer>({
    id: "",
    name: "",
    phone: "",
    email: "",
    otp: "",
    journey1: false,
    journey2: false,
    journey3: false,
    journey4: false,
    gift1: false,
    gift2: false,
    createAt: new Date(),
  });

  const handleGift1 = async () => {
    const urlEndpoint = "/api/customer/gift";
    if (id) {
      try {
        const response = await axios.put(
          urlEndpoint,
          { id: id, giftField: "gift1", giftValue: true },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + process.env.ADMIN_TOKEN,
            },
          },
        );
        alert("Đổi quà thành công");
        setCustomer({ ...customer, gift1: true });
        console.log(response.data);
      } catch (err) {
        alert("Đổi quà thất bại");
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          "/api/customer",
          { id: id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bear ${process.env.ADMIN_TOKEN}`,
            },
          },
        );
        if (res.status === 200) {
          setCustomer(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleGift2 = async () => {
    const urlEndpoint = "/api/customer/gift";
    if (id) {
      try {
        const response = await axios.put(
          urlEndpoint,
          { id: id, giftField: "gift2", giftValue: true },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + process.env.ADMIN_TOKEN,
            },
          },
        );
        alert("Đổi quà thành công");
        setCustomer({ ...customer, gift2: true });
        console.log(response.data);
      } catch (err) {
        alert("Đổi quà thất bại");
        console.log(err);
      }
    }
  };

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
        {id && (
          <h1 className="text-center text-green-500">
            Quét mã thành công hãy chọn quà
          </h1>
        )}

        <div className="flex w-full flex-col items-center justify-center">
          {!customer.gift1 && id ? (
            <Image
              src={gift1}
              alt="gift1"
              className="w-4/5 active:scale-95"
              onClick={handleGift1}
            />
          ) : (
            <Image src={gift1} alt="gift1" className="w-4/5 brightness-50" />
          )}

          {!customer.gift2 && id ? (
            <Image
              src={gift2}
              alt="gift2"
              className="w-4/5 active:scale-95"
              onClick={handleGift2}
            />
          ) : (
            <Image src={gift2} alt="gift2" className="w-4/5 brightness-50" />
          )}
        </div>
      </div>
    </section>
  );
}

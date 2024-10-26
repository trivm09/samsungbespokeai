"use client";

import { BackgroundContainer } from "@/components/images-ui/background-container";

import HomeImg from "@/components/images-ui/home-img";
import QueenChallenge from "@/components/images-ui/queen-challenge";
import AiImg from "@/components/images-ui/ai-img";
import SmartHome from "@/components/images-ui/smart-home";
import Image from "next/image";

import star from "@/assets/images/star.png";

import { useEffect, useState } from "react";
import axios from "axios";
import { Customer } from "@prisma/client";
import { headers } from "next/headers";

export const CustomerJourney = ({ id }: { id: string }) => {
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

  console.log("run");

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

    fetchData();
  }, [id]);

  // useEffect(() => {
  //   console.log("Polling effect");
  //   const poll = async () => {
  //     console.log("Polling...");
  //     try {
  //       const response = await fetch(`/api/longpolling?id=${id}`);
  //       if (response.status === 200) {
  //         const data = await response.json();
  //         console.log(data);
  //         setCustomer(data);
  //       }
  //     } catch (error) {
  //       console.error("Polling error:", error);
  //     } finally {
  //       // poll(); // Continue polling
  //       setTimeout(poll, 5000);
  //     }
  //   };

  //   poll();
  // }, [id]);

  useEffect(() => {
    const poll = async () => {
      try {
        const response = await axios.get(`/api/longpolling`, {
          params: { id },
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          setCustomer(data);
        }
      } catch (error) {
        console.error("Polling error:", error);
      } finally {
        poll(); // Continue polling after 5 seconds
      }
    };

    poll();
  }, [id]);

  return (
    <>
      <div className="grid grid-flow-row grid-cols-2 gap-2">
        <div className="relative flex h-32 flex-col justify-between overflow-hidden rounded-xl border-[1px] border-white p-2 drop-shadow-md">
          <BackgroundContainer />
          <div className="flex items-start gap-1">
            <div className="aspect-square h-4 w-4 rounded-sm border-[1px] border-black p-[.1rem]">
              {customer?.journey1 && (
                <Image
                  src={star}
                  alt="star"
                  priority={true}
                  loading="eager"
                  className="h-full w-full"
                  draggable={false}
                />
              )}
            </div>
            <h1 className="select-none text-xs text-black">
              Nhà thông minh SmartThings
            </h1>
          </div>
          <div className="flex w-full flex-grow items-center justify-center">
            <SmartHome />
          </div>
        </div>
        <div className="relative flex h-32 flex-col justify-between overflow-hidden rounded-xl border-[1px] border-white p-2 drop-shadow-md">
          <BackgroundContainer />
          <div className="flex items-start gap-1">
            <div className="aspect-square h-4 w-4 rounded-sm border-[1px] border-black p-[.1rem]">
              {customer?.journey2 && (
                <Image
                  src={star}
                  alt="star"
                  priority={true}
                  loading="eager"
                  className="h-full w-full"
                  draggable={false}
                />
              )}
            </div>
            <h1 className="select-none text-xs text-black">
              Nữ hoàng thách đố
            </h1>
          </div>

          <div className="flex w-full flex-grow items-center justify-center">
            <QueenChallenge />
          </div>
        </div>

        <div className="relative flex h-32 flex-col justify-between overflow-hidden rounded-xl border-[1px] border-white p-2 drop-shadow-md">
          <BackgroundContainer />
          <div className="flex items-start gap-1">
            <div className="aspect-square h-4 w-4 rounded-sm border-[1px] border-black p-[.1rem]">
              {customer?.journey3 && (
                <Image
                  src={star}
                  alt="star"
                  priority={true}
                  loading="eager"
                  className="h-full w-full"
                  draggable={false}
                />
              )}
            </div>
            <h1 className="select-none text-xs text-black">
              Truy tìm ​ công nghệ AI​
            </h1>
          </div>

          <div className="flex w-full flex-grow items-center justify-center p-2">
            <AiImg />
          </div>
        </div>

        <div className="relative flex h-32 flex-col justify-between overflow-hidden rounded-xl border-[1px] border-white p-2 drop-shadow-md">
          <BackgroundContainer />
          <div className="flex items-start gap-1">
            <div className="aspect-square h-4 w-4 rounded-sm border-[1px] border-black p-[.1rem]">
              {customer?.journey4 && (
                <Image
                  src={star}
                  alt="star"
                  priority={true}
                  loading="eager"
                  className="h-full w-full"
                  draggable={false}
                />
              )}
            </div>
            <h1 className="select-none text-xs text-black">
              Triển lãm nhà đẹp​
            </h1>
          </div>

          <div className="box-border flex w-full flex-grow items-center justify-center">
            <HomeImg />
          </div>
        </div>
      </div>
    </>
  );
};

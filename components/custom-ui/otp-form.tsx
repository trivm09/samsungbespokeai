"use client";

import Image from "next/image";
import { verifyOTP } from "@/app/actions/customer";
import { useFormState } from "react-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import button from "@/assets/images/button.png";
import { BackgroundContainer } from "../images-ui/background-container";

export const OTPForm = () => {
  const [state, action] = useFormState(verifyOTP, undefined);

  return (
    <div className="w-full">
      <form
        action={action}
        className="flex flex-col gap-1 text-nowrap p-1 text-center text-xs text-black"
      >
        <div className="relative flex h-56 flex-col items-center justify-center">
          <BackgroundContainer />
          <h1 className="text-xl">Xác nhận OTP</h1>
          <div className="flex w-full justify-center">
            <InputOTP maxLength={4} name="otp" id="otp">
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {state?.message && <p className="text-red-500">{state?.message}</p>}
        </div>
        <button
          type="submit"
          className="flex w-full justify-center active:scale-95"
        >
          <Image
            src={button}
            alt="button"
            priority={true}
            loading="eager"
            className="w-1/3 drop-shadow-md"
            draggable={false}
          />
        </button>
      </form>
    </div>
  );
};

"use client";
import { customerRegistration } from "@/app/actions/customer";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { SSButton } from "../images-ui/ss-button";
import { BackgroundContainer } from "../images-ui/background-container";

interface InputFieldProps {
  id: string;
  type: string;
  placeholder: string;
  className?: string;
}

interface CheckboxFieldProps {
  id: string;
  checked?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  link?: { href: string; text: string };
}

const InputField = ({ id, type, placeholder, className }: InputFieldProps) => (
  <div
    className={`w-full rounded-md border-[1px] border-black bg-white p-2 ${className}`}
  >
    <input
      id={id}
      type={type}
      name={id}
      placeholder={placeholder}
      className="w-full bg-transparent outline-none"
      autoComplete=" "
    />
  </div>
);

const CheckboxField = ({
  id,
  checked,
  onChange,
  label,
  link,
}: CheckboxFieldProps) => (
  <div className="flex w-full items-center justify-start">
    <input
      id={id}
      type="checkbox"
      className="mr-2"
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={id} className="text-wrap text-left text-xs">
      {label}{" "}
      {link && (
        <span className="text-[#0d81bf]">
          <a href={link.href}>{link.text}</a>
        </span>
      )}
    </label>
  </div>
);

export const CustomerForm = () => {
  const [isChecked, setIsChecked] = useState(true);
  const [isChecked2, setIsChecked2] = useState(true);
  const [state, action] = useFormState(customerRegistration, undefined);

  return (
    <>
      <div className="w-full p-2">
        <form
          action={action}
          className="flex flex-col gap-1 text-nowrap p-1 text-center text-xs text-black"
        >
          <div className="relative flex flex-col gap-1 p-2">
            <BackgroundContainer />
            <h1>Nhập thông tin để đăng ký trải nghiệm</h1>
            <InputField
              id="name"
              type="text"
              placeholder="Tên"
              className={`${state?.errors?.name && "dark:border-red-500"}`}
            />
            {state?.errors?.name && (
              <p className="text-left text-[.5rem] text-red-500">
                {state.errors.name}
              </p>
            )}
            <InputField
              id="phone"
              type="number"
              placeholder="Số điện thoại"
              className={`${state?.errors?.name && "dark:border-red-500"}`}
            />
            {state?.errors?.phone && (
              <p className="text-left text-[.5rem] text-red-500">
                {state.errors.phone}
              </p>
            )}
            <h1 className="text-[0.5rem]">
              * Mỗi số điện thoại chỉ sử dụng 1 lần
            </h1>
            <InputField id="email" type="email" placeholder="Email" />
            <CheckboxField
              id="agree"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              label="Tôi đồng ý với các"
              link={{
                href: "https://v3.account.samsung.com/policies/terms-conditions/latest",
                text: "chính sách bảo mật quyền riêng tư của Samsung",
              }}
            />
            <CheckboxField
              id="agree2"
              checked={isChecked2}
              onChange={(e) => setIsChecked2(e.target.checked)}
              label="Tôi đồng ý nhận thông tin từ Samsung"
            />
            {state?.message && <p className="text-red-500">{state.message}</p>}
          </div>
          <button
            type="submit"
            disabled={!isChecked}
            className="flex w-full justify-center active:scale-95"
          >
            <SSButton />
          </button>
        </form>
      </div>
    </>
  );
};

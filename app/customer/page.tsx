import { OTPForm } from "@/components/custom-ui/otp-form";
import { WelcomeText } from "@/components/images-ui/welcome-text";
import { Logo } from "@/components/images-ui/logo";
import { Background } from "@/components/images-ui/background";
import { Gift } from "@/components/images-ui/gift";

export default function Page() {
  return (
    <section className="flex w-full max-w-[425px] flex-col items-center justify-center">
      <Background />
      <div className="flex h-[10vh] w-full max-w-[425px] items-center pl-12">
        <div className="w-3/4">
          <Logo />
        </div>
      </div>
      <div className="flex w-full max-w-[425px] flex-grow flex-col items-center px-9 pt-10">
        <WelcomeText />
        <OTPForm />
        <Gift />
      </div>
    </section>
  );
}

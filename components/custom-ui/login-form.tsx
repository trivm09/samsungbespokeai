"use client";
import { useFormState, useFormStatus } from "react-dom";
import { login } from "@/app/actions/auth";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [state, action] = useFormState(login, undefined);

  return (
    <main className="flex h-screen w-screen items-center justify-center overflow-hidden">
      <section className="flex w-full justify-center">
        <form action={action} className="w-10/12 sm:w-80">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" placeholder="@example.com" className={`${state?.errors?.email && "dark:border-red-500"}`} />
          </div>
          {state?.errors?.email && <p className="text-red-500">{state.errors.email}</p>}

          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" className={`${state?.errors?.password && "dark:border-red-500"}`} />
          </div>

          {state?.errors?.password && <p className="text-red-500">{state.errors.password}</p>}
          {state?.message && <p className="text-red-500">{state.message}</p>}
          <SubmitButton />
        </form>
      </section>
    </main>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <div className="py-4">
      <Button disabled={pending} type="submit" className="w-full">
        Sign Up
      </Button>
    </div>
  );
}

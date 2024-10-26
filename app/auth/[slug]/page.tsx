import { LoginForm } from "@/components/custom-ui/login-form";
import { SignupForm } from "@/components/custom-ui/signup-form";

export default function Page({ params }: { params: { slug: string } }) {
    const { slug } = params || "login";
    return slug === "login" ? <LoginForm /> : <SignupForm />;
}

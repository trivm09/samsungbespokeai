import { Sidebar } from "@/components/custom-ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <Sidebar />
            {children}
        </main>
    );
}

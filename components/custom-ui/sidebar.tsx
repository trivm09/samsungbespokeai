import { LayoutDashboard, PanelLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle, DialogDescription } from "../ui/dialog";

export const Sidebar = () => {
    return (
        <>
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r-2 border-neutral-800 bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                    <Link
                        href="/admin"
                        className="bg-primary text-primary-foreground group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base"
                    >
                        <LayoutDashboard />
                    </Link>
                </nav>
            </aside>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b-2 border-neutral-800 bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden">
                                <PanelLeft className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <VisuallyHidden>
                                <DialogTitle>Menu</DialogTitle>
                            </VisuallyHidden>
                            <VisuallyHidden>
                                <DialogDescription>This is the menu dialog</DialogDescription>
                            </VisuallyHidden>
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link href="#" className="text-muted-foreground flex items-center gap-4 px-2.5 hover:text-foreground">
                                    <LayoutDashboard className="h-5 w-5" />
                                    Dashboard
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </header>
            </div>
        </>
    );
};

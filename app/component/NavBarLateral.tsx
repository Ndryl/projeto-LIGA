"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { usePathname } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface NavBarLateralProps {
  children: React.ReactNode;
}

export default function NavBarLateral({ children }: NavBarLateralProps) {
  const pathname = usePathname();
  const formattedPath =
    pathname === "/"
      ? "Início"
      : pathname.replace("/", "").charAt(0).toUpperCase() + pathname.slice(2);

  return (
    <SidebarProvider className="flex flex-1">
      <AppSidebar />
      <main
        className="flex flex-1 flex-col  min-h-screen overflow-auto relative"
        style={{
          backgroundImage: "url('backGround.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-red-500/60" />
        <SidebarTrigger className="z-10" />
        <div className="flex justify-center p-4">
          <Card className="w-full max-w-7xl flex flex-col gap-4 z-10">
            <CardHeader>
              <CardTitle>Área de {formattedPath}</CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto">{children}</CardContent>
          </Card>
        </div>
      </main>
    </SidebarProvider>
  );
}

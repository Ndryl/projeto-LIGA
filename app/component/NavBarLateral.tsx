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
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 bg-zinc-200">
        <SidebarTrigger />
        <div className="flex flex-1 h-screen justify-center items-center">
          <Card className="w-11/12 h-11/12 ">
            <CardHeader>
              <CardTitle>Área de {formattedPath}</CardTitle>
            </CardHeader>
            <CardContent>{children}</CardContent>
          </Card>
        </div>
      </main>
    </SidebarProvider>
  );
}

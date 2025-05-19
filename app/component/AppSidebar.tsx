"use client";
import Link from "next/link";
import { Calendar, Home, ClipboardPen, FileClock } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Menu",
    url: "/",
    icon: Home,
  },
  {
    title: "Área de convênios",
    url: "/convenios",
    icon: ClipboardPen,
  },
  {
    title: "Área de especialidades",
    url: "/especialidades",
    icon: Calendar,
  },
  {
    title: "Área de disponibilidade",
    url: "/disponibilidades",
    icon: FileClock,
  },
  {
    title: "Área de consulta",
    url: "/consultas",
    icon: Calendar,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

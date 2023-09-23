import { Role } from "@/db/schema/user";

type Navigation = {
  name: string;
  href: string;
  icon: string;
  clearance: Role[];
};
export const dashboardNav: Navigation[] = [
  {
    name: "profile",
    href: "/d",
    icon: "i-lucide-fingerprint",
    clearance: ["customer", "owner", "admin"],
  },
  {
    name: "business",
    href: "/d/business",
    icon: "i-lucide-layout-dashboard",
    clearance: ["owner", "admin"],
  },
  {
    name: "tags",
    href: "/d/tag",
    icon: "i-lucide-tag",
    clearance: ["admin"],
  },
  {
    name: "users",
    href: "/d/user",
    icon: "i-lucide-users",
    clearance: ["admin"],
  },
];

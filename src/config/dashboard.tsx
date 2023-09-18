import { Role } from "@/db/schema/user";

type Navigation = {
  name: string;
  href: string;
  icon: string;
  clearance: Role[];
};
export const dashboardNav: Navigation[] = [
  {
    name: "Profile",
    href: "/d",
    icon: "i-lucide-fingerprint",
    clearance: ["customer", "owner", "admin"],
  },
  {
    name: "Business",
    href: "/d/business",
    icon: "i-lucide-layout-dashboard",
    clearance: ["owner", "admin"],
  },
  {
    name: "Tags",
    href: "/d/tag",
    icon: "i-lucide-tag",
    clearance: ["admin"],
  },
];

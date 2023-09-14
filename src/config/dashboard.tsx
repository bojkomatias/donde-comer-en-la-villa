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
    href: "/dashboard",
    icon: "i-lucide-fingerprint",
    clearance: ["customer", "owner", "admin"],
  },
  {
    name: "Business",
    href: "/dashboard/business",
    icon: "i-lucide-box",
    clearance: ["owner", "admin"],
  },
  {
    name: "Tags",
    href: "/dashboard/tag",
    icon: "i-lucide-tag",
    clearance: ["admin"],
  },
];

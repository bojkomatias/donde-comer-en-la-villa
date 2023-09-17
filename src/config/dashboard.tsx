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
    icon: "i-lucide-settings",
    clearance: ["customer", "owner", "admin"],
  },
  {
    name: "Business",
    href: "/dashboard/business",
    icon: "i-lucide-layout-dashboard",
    clearance: ["owner", "admin"],
  },
  {
    name: "Tags",
    href: "/dashboard/tag",
    icon: "i-lucide-tag",
    clearance: ["admin"],
  },
];

import type { LucideIcon } from "lucide-react";

export type UserRole =
  | "tenant"
  | "property-holder"
  | "admin";

export interface NavbarUser {
  name: string;
  email: string;
  role: UserRole;
  image?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}
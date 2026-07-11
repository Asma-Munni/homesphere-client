import {
  Building2,
  CircleHelp,
  Contact,
  Heart,
  Home,
  HousePlus,
  LayoutDashboard,
  ListChecks,
  Search,
  Settings,
  Users,
} from "lucide-react";

import type {
  NavItem,
  UserRole,
} from "./navbar.types";

export const publicNavItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Explore",
    href: "/properties",
    icon: Search,
  },
  {
    label: "About",
    href: "/about",
    icon: CircleHelp,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Contact,
  },
];

export const roleNavItems: Record<
  UserRole,
  NavItem[]
> = {
  tenant: [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Favorites",
      href: "/dashboard/favorites",
      icon: Heart,
    },
  ],

  "property-holder": [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Add Property",
      href: "/items/add",
      icon: HousePlus,
    },
    {
      label: "Manage",
      href: "/items/manage",
      icon: ListChecks,
    },
  ],

  admin: [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Users",
      href: "/dashboard/users",
      icon: Users,
    },
    {
      label: "Properties",
      href: "/dashboard/properties",
      icon: Building2,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ],
};
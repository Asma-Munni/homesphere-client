import {
  BarChart3,
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
      href: "/dashboard/tenant",
      icon: LayoutDashboard,
    },
    {
      label: "Favorites",
      href: "/dashboard/tenant/favorites",
      icon: Heart,
    },
  ],

  "property-holder": [
    {
      label: "Dashboard",
      href: "/dashboard/holder",
      icon: LayoutDashboard,
    },
    {
      label: "Add Property",
      href: "/properties/add",
      icon: HousePlus,
    },
    {
      label: "Manage Properties",
      href: "/dashboard/holder/properties",
      icon: ListChecks,
    },
  ],

  admin: [
    {
      label: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Users",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      label: "Properties",
      href: "/dashboard/admin/properties",
      icon: Building2,
    },
    {
      label: "Statistics",
      href: "/dashboard/admin/statistics",
      icon: BarChart3,
    },
    {
      label: "Settings",
      href: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
};
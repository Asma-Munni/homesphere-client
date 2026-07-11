"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  Building2,
  ChevronDown,
  LogIn,
  LogOut,
  Menu,
  User,
  UserPlus,
  X,
} from "lucide-react";

import {
  publicNavItems,
  roleNavItems,
} from "./nav-links";

import type {
  NavbarUser,
  NavItem,
} from "./navbar.types";

interface AppNavbarProps {
  user?: NavbarUser | null;
}

export function AppNavbar({
  user = null,
}: AppNavbarProps) {
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const [isProfileMenuOpen, setIsProfileMenuOpen] =
    useState(false);

  const profileMenuRef =
    useRef<HTMLDivElement | null>(null);

  const loggedInNavItems = user
    ? roleNavItems[user.role]
    : [];

  const desktopNavItems = user
    ? [
        publicNavItems[0],
        publicNavItems[1],
        ...loggedInNavItems,
      ].filter(
        (item): item is NavItem =>
          item !== undefined,
      )
    : publicNavItems;

  const isActiveRoute = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  const closeMenus = (): void => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const handleLogout = async (): Promise<void> => {
    /*
     * পরে এখানে Better Auth signOut বসবে:
     *
     * await authClient.signOut();
     * router.push("/login");
     * router.refresh();
     */

    console.log("Logout clicked");
    closeMenus();
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent,
    ): void => {
      const clickedElement = event.target as Node;

      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(clickedElement)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
      <Link
  href="/"
  onClick={closeMenus}
  className="group flex items-center gap-3"
  aria-label="HomeSphere home"
>
  <div className="relative h-12 w-12 transition-transform duration-300 group-hover:scale-105">
    <Image
      src="/Images/logo-homesphere.png"
      alt="HomeSphere Logo"
      fill
      priority
      className="object-contain"
    />
  </div>

  <div className="leading-tight">
    <h1 className="text-xl font-bold tracking-tight text-slate-900">
      Home<span className="text-emerald-600">Sphere</span>
    </h1>

    <p className="text-xs text-slate-500">
      Find Your Perfect Home
    </p>
  </div>
</Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {desktopNavItems.map((item) => {
            const active = isActiveRoute(item.href);

            return (
              <NavLink
                key={item.href}
                item={item}
                active={active}
              />
            );
          })}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          {!user ? (
            <>
              <Link
                href="/login"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <LogIn className="size-4" />
                Login
              </Link>

              <Link
                href="/register"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                <UserPlus className="size-4" />
                Register
              </Link>
            </>
          ) : (
            <div
              ref={profileMenuRef}
              className="relative"
            >
              <button
                type="button"
                onClick={() =>
                  setIsProfileMenuOpen(
                    (currentValue) =>
                      !currentValue,
                  )
                }
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-left shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                aria-expanded={isProfileMenuOpen}
                aria-haspopup="menu"
              >
                <UserAvatar user={user} />

                <span className="hidden xl:block">
                  <span className="block max-w-32 truncate text-sm font-semibold text-slate-900">
                    {user.name}
                  </span>

                  <span className="block text-xs capitalize text-slate-500">
                    {formatRole(user.role)}
                  </span>
                </span>

                <ChevronDown
                  className={`size-4 text-slate-500 transition-transform ${
                    isProfileMenuOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                      scale: 0.98,
                    }}
                    transition={{ duration: 0.18 }}
                    role="menu"
                    className="absolute right-0 top-[calc(100%+0.75rem)] w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
                  >
                    <div className="border-b border-slate-100 px-3 py-3">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {user.name}
                      </p>

                      <p className="truncate text-xs text-slate-500">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-2">
                      <Link
                        href="/dashboard/profile"
                        role="menuitem"
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950"
                      >
                        <User className="size-4" />
                        My Profile
                      </Link>

                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                      >
                        <LogOut className="size-4" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() =>
            setIsMobileMenuOpen(
              (currentValue) => !currentValue,
            )
          }
          className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 lg:hidden"
          aria-label={
            isMobileMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMobileMenuOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </button>
      </nav>

      {/* Mobile navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              onClick={() =>
                setIsMobileMenuOpen(false)
              }
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-16 z-40 bg-slate-950/30 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              id="mobile-navigation"
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{ duration: 0.25 }}
              className="absolute left-0 right-0 top-16 z-50 overflow-hidden border-b border-slate-200 bg-white shadow-xl lg:hidden"
            >
              <div className="mx-auto max-w-7xl space-y-2 px-4 py-5 sm:px-6">
                {user && (
                  <div className="mb-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                    <UserAvatar user={user} />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {user.name}
                      </p>

                      <p className="truncate text-xs text-slate-500">
                        {user.email}
                      </p>

                      <p className="mt-0.5 text-xs font-medium capitalize text-emerald-700">
                        {formatRole(user.role)}
                      </p>
                    </div>
                  </div>
                )}

                {desktopNavItems.map((item) => (
                  <MobileNavLink
                    key={item.href}
                    item={item}
                    active={isActiveRoute(item.href)}
                    onNavigate={closeMenus}
                  />
                ))}

                {user && (
                  <MobileNavLink
                    item={{
                      label: "Profile",
                      href: "/dashboard/profile",
                      icon: User,
                    }}
                    active={isActiveRoute(
                      "/dashboard/profile",
                    )}
                    onNavigate={closeMenus}
                  />
                )}

                <div className="mt-4 border-t border-slate-200 pt-4">
                  {!user ? (
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href="/login"
                        onClick={closeMenus}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                      >
                        <LogIn className="size-4" />
                        Login
                      </Link>

                      <Link
                        href="/register"
                        onClick={closeMenus}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                      >
                        <UserPlus className="size-4" />
                        Register
                      </Link>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-red-50 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
                    >
                      <LogOut className="size-4" />
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

interface NavLinkProps {
  item: NavItem;
  active: boolean;
}

function NavLink({
  item,
  active,
}: NavLinkProps) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`relative rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? "text-emerald-700"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
      }`}
    >
      {item.label}

      {active && (
        <motion.span
          layoutId="desktop-active-nav"
          className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-emerald-600"
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 30,
          }}
        />
      )}
    </Link>
  );
}

interface MobileNavLinkProps {
  item: NavItem;
  active: boolean;
  onNavigate: () => void;
}

function MobileNavLink({
  item,
  active,
  onNavigate,
}: MobileNavLinkProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${
        active
          ? "bg-emerald-50 text-emerald-700"
          : "text-slate-700 hover:bg-slate-100"
      }`}
    >
      {Icon && <Icon className="size-5" />}

      {item.label}
    </Link>
  );
}

interface UserAvatarProps {
  user: NavbarUser;
}

function UserAvatar({
  user,
}: UserAvatarProps) {
  if (user.image) {
    return (
      // Normal img is used because external image domains
      // may not yet be configured in next.config.ts.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.image}
        alt={`${user.name}'s profile`}
        className="size-9 rounded-xl object-cover"
      />
    );
  }

  const initial =
    user.name.trim().charAt(0).toUpperCase() || "U";

  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-sm font-bold text-emerald-700">
      {initial}
    </span>
  );
}

function formatRole(
  role: NavbarUser["role"],
): string {
  if (role === "property-holder") {
    return "Property Holder";
  }

  return (
    role.charAt(0).toUpperCase() +
    role.slice(1)
  );
}
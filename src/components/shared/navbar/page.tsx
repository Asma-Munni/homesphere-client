"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  LogIn,
  LogOut,
  Menu,
  UserPlus,
  X,
} from "lucide-react";

import {
  signOut,
  useSession,
} from "@/lib/auth-client";

import {
  publicNavItems,
  roleNavItems,
} from "./nav-links";

import type {
  UserRole,
} from "./navbar.types";

interface NavbarUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: UserRole;
}

function isUserRole(
  role: unknown
): role is UserRole {
  return (
    role === "tenant" ||
    role ===
      "property-holder" ||
    role === "admin"
  );
}

export function AppNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] =
    useState(false);

  const {
    data: session,
    isPending,
  } = useSession();

  const user =
    session?.user as
      | NavbarUser
      | undefined;

  const role: UserRole =
    isUserRole(user?.role)
      ? user.role
      : "tenant";

  const links = isPending
    ? []
    : user
      ? [
          ...publicNavItems.slice(
            0,
            2
          ),
          ...roleNavItems[role],
        ]
      : publicNavItems;

  const matchedLinks =
    links.filter((link) => {
      if (link.href === "/") {
        return pathname === "/";
      }

      return (
        pathname === link.href ||
        pathname.startsWith(
          `${link.href}/`
        )
      );
    });

  const activeHref =
    [...matchedLinks].sort(
      (first, second) =>
        second.href.length -
        first.href.length
    )[0]?.href;

  const closeMobileMenu = () => {
    setOpen(false);
  };

  const toggleMobileMenu = () => {
    setOpen(
      (previousOpen) =>
        !previousOpen
    );
  };

  const handleLogout =
    async () => {
      try {
        closeMobileMenu();

        await signOut();

        window.localStorage.removeItem(
          "token"
        );

        router.replace("/login");
        router.refresh();
      } catch (error) {
        console.error(
          "LOGOUT ERROR:",
          error
        );
      }
    };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}

        <Link
          href="/"
          onClick={
            closeMobileMenu
          }
          aria-label="HomeSphere Home"
          className="flex items-center gap-3"
        >
          <div className="relative size-10 overflow-hidden rounded-xl">
            <Image
              src="/Images/logo-homesphere.png"
              alt="HomeSphere Logo"
              fill
              sizes="40px"
              priority
              className="object-contain"
            />
          </div>

          <div className="hidden sm:block">
            <p className="text-xl font-bold text-slate-900">
              Home
              <span className="text-teal-700">
                Sphere
              </span>
            </p>
          </div>
        </Link>

        {/* Desktop navigation */}

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {links.map((link) => {
            const isActive =
              activeHref ===
              link.href;

            return (
              <Link
                key={
                  link.href
                }
                href={
                  link.href
                }
                aria-current={
                  isActive
                    ? "page"
                    : undefined
                }
                className={`text-sm font-medium transition ${
                  isActive
                    ? "text-teal-700"
                    : "text-slate-600 hover:text-teal-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop account section */}

        <div className="hidden items-center gap-4 lg:flex">
          {isPending ? (
            <div className="h-10 w-28 animate-pulse rounded-xl bg-slate-100" />
          ) : user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-1.5 transition hover:border-teal-300 hover:bg-teal-50"
              >
                {user.image ? (
                  <Image
                    src={
                      user.image
                    }
                    alt={
                      user.name ??
                      "User"
                    }
                    width={32}
                    height={32}
                    className="size-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-8 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-700">
                    {user.name
                      ?.charAt(0)
                      .toUpperCase() ??
                      "U"}
                  </div>
                )}

                <div className="max-w-32">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {user.name ??
                      "User"}
                  </p>

                  <p className="truncate text-[11px] capitalize text-slate-500">
                    {role.replace(
                      "-",
                      " "
                    )}
                  </p>
                </div>
              </Link>

              <button
                type="button"
                onClick={() =>
                  void handleLogout()
                }
                className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <LogOut
                  size={16}
                />

                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="font-semibold text-slate-700 transition hover:text-teal-700"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-teal-700 px-4 py-2 font-semibold text-white transition hover:bg-teal-800"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}

        <button
          type="button"
          onClick={
            toggleMobileMenu
          }
          aria-label={
            open
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
        >
          {open ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* Mobile navigation */}

      {open && (
        <div
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white px-4 py-5 lg:hidden"
        >
          {/* Mobile user profile */}

          {user && (
            <Link
              href="/profile"
              onClick={
                closeMobileMenu
              }
              className="mb-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3"
            >
              {user.image ? (
                <Image
                  src={
                    user.image
                  }
                  alt={
                    user.name ??
                    "User"
                  }
                  width={44}
                  height={44}
                  className="size-11 rounded-full object-cover"
                />
              ) : (
                <div className="flex size-11 items-center justify-center rounded-full bg-teal-100 text-lg font-bold text-teal-700">
                  {user.name
                    ?.charAt(0)
                    .toUpperCase() ??
                    "U"}
                </div>
              )}

              <div className="min-w-0">
                <p className="truncate font-semibold text-slate-900">
                  {user.name ??
                    "User"}
                </p>

                <p className="text-xs capitalize text-slate-500">
                  {role.replace(
                    "-",
                    " "
                  )}
                </p>
              </div>
            </Link>
          )}

          {/* Mobile links */}

          <nav
            aria-label="Mobile navigation"
            className="flex flex-col gap-2"
          >
            {links.map((link) => {
              const Icon =
                link.icon;

              const isActive =
                activeHref ===
                link.href;

              return (
                <Link
                  key={
                    link.href
                  }
                  href={
                    link.href
                  }
                  onClick={
                    closeMobileMenu
                  }
                  aria-current={
                    isActive
                      ? "page"
                      : undefined
                  }
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-teal-50 text-teal-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Icon
                    size={18}
                  />

                  {link.label}
                </Link>
              );
            })}

            {/* Mobile authentication */}

            {user ? (
              <button
                type="button"
                onClick={() =>
                  void handleLogout()
                }
                className="mt-3 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-100"
              >
                <LogOut
                  size={18}
                />

                Logout
              </button>
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
                <Link
                  href="/login"
                  onClick={
                    closeMobileMenu
                  }
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <LogIn
                    size={17}
                  />

                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={
                    closeMobileMenu
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
                >
                  <UserPlus
                    size={17}
                  />

                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
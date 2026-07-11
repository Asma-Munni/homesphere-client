import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";

const footerLinks = {
  explore: [
    {
      label: "Browse Properties",
      href: "/properties",
    },
    {
      label: "Apartments",
      href: "/properties?category=apartment",
    },
    {
      label: "Houses",
      href: "/properties?category=house",
    },
    {
      label: "Studios",
      href: "/properties?category=studio",
    },
  ],

  company: [
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Help & Support",
      href: "/support",
    },
  ],

  legal: [
    {
      label: "Privacy Policy",
      href: "/privacy",
    },
    {
      label: "Terms & Conditions",
      href: "/terms",
    },
  ],
};

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: FaLinkedinIn,
  },
];
export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      {/* Main footer */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8 lg:py-16">
        {/* Brand information */}
        <div className="md:col-span-2 lg:col-span-2">
          <Link
            href="/"
            className="inline-flex items-center gap-3"
            aria-label="HomeSphere home"
          >
            <div className="relative size-12 overflow-hidden rounded-xl bg-white">
              <Image
                src="/Images/logo-homesphere.png"
                alt="HomeSphere logo"
                fill
                priority
                sizes="48px"
                className="object-contain p-1"
              />
            </div>

            <div className="leading-tight">
              <p className="text-xl font-bold tracking-tight text-white">
                Home
                <span className="text-teal-400">
                  Sphere
                </span>
              </p>

              <p className="text-[10px] font-semibold tracking-[0.18em] text-slate-400">
                FIND YOUR PERFECT SPACE
              </p>
            </div>
          </Link>

          <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
            HomeSphere connects tenants with trusted property
            holders, making property discovery and management
            simple, secure, and transparent.
          </p>

          {/* Contact information */}
          <div className="mt-6 space-y-3">
            <a
              href="mailto:support@homesphere.com"
              className="group flex w-fit items-center gap-3 text-sm text-slate-400 transition-colors hover:text-teal-400"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-slate-900">
                <Mail className="size-4" />
              </span>

              support@homesphere.com
            </a>

            <a
              href="tel:+8801700000000"
              className="group flex w-fit items-center gap-3 text-sm text-slate-400 transition-colors hover:text-teal-400"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-slate-900">
                <Phone className="size-4" />
              </span>

              +880 1700-000000
            </a>

            <div className="flex items-center gap-3 text-sm text-slate-400">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-900">
                <MapPin className="size-4" />
              </span>

              <span>Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>

        {/* Explore links */}
        <FooterLinkGroup
          title="Explore"
          links={footerLinks.explore}
        />

        {/* Company links */}
        <FooterLinkGroup
          title="Company"
          links={footerLinks.company}
        />

        {/* Legal and social */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Legal
          </h3>

          <ul className="mt-5 space-y-3">
            {footerLinks.legal.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-400 transition-colors hover:text-teal-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-sm font-bold uppercase tracking-wider text-white">
            Follow Us
          </h3>

          <div className="mt-4 flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex size-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-600 hover:bg-teal-700 hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-center text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between md:text-left lg:px-8">
          <p>
            © {currentYear} HomeSphere. All rights reserved.
          </p>

          <p>
            Built for smarter property discovery and management.
          </p>
        </div>
      </div>
    </footer>
  );
}

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinkGroupProps {
  title: string;
  links: FooterLink[];
}

function FooterLinkGroup({
  title,
  links,
}: FooterLinkGroupProps) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wider text-white">
        {title}
      </h3>

      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-slate-400 transition-colors hover:text-teal-400"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
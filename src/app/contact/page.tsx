"use client";

import Link from "next/link";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  
  Globe,
  Headphones,
  Link2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Share2,
} from "lucide-react";

import {
  type ChangeEvent,
  type ComponentType,
  type FormEvent,
  useState,
} from "react";

const contactDetails = {
  email: "support@homesphere.com",
  phone: "+880 1234-567890",
  address: "Dhaka, Bangladesh",
  workingHours:
    "Saturday–Thursday, 10:00 AM–7:00 PM",
};

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [formData, setFormData] =
    useState<ContactFormData>(
      initialFormData
    );

  const [error, setError] =
    useState("");

  const [
    submitted,
    setSubmitted,
  ] = useState(false);

  const handleChange = (
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
    >
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );

    setError("");
    setSubmitted(false);
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSubmitted(false);

    const {
      name,
      email,
      subject,
      message,
    } = formData;

    if (
      !name.trim() ||
      !email.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      setError(
        "Please complete all required fields."
      );

      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(
        email.trim()
      )
    ) {
      setError(
        "Please enter a valid email address."
      );

      return;
    }

    const mailSubject =
      encodeURIComponent(
        `[HomeSphere Contact] ${subject}`
      );

    const mailBody =
      encodeURIComponent(
        `Name: ${name}\n` +
          `Email: ${email}\n\n` +
          `Message:\n${message}`
      );

    setSubmitted(true);

    window.location.href =
      `mailto:${contactDetails.email}` +
      `?subject=${mailSubject}` +
      `&body=${mailBody}`;
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}

      <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-slate-950 px-4 py-20 text-white sm:py-24">
        <div className="absolute -left-20 -top-20 size-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-24 right-0 size-96 rounded-full bg-teal-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-teal-50">
              <MessageSquare
                size={16}
              />

              Contact HomeSphere
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              We are here to help
              with your property
              journey
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              Contact our team for
              assistance with
              property listings,
              account access, rental
              questions or platform
              support.
            </p>
          </div>
        </div>
      </section>

      {/* Contact information */}

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <ContactCard
            icon={Mail}
            title="Email us"
            description={
              contactDetails.email
            }
            href={`mailto:${contactDetails.email}`}
          />

          <ContactCard
            icon={Phone}
            title="Call us"
            description={
              contactDetails.phone
            }
            href={`tel:${contactDetails.phone.replace(
              /[\s-]/g,
              ""
            )}`}
          />

          <ContactCard
            icon={MapPin}
            title="Our location"
            description={
              contactDetails.address
            }
            href="https://maps.google.com/?q=Dhaka,Bangladesh"
            external
          />

          <ContactCard
            icon={Clock3}
            title="Working hours"
            description={
              contactDetails.workingHours
            }
          />
        </div>
      </section>

      {/* Main contact area */}

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Support information */}

          <aside className="overflow-hidden rounded-3xl bg-gradient-to-br from-teal-700 to-slate-950 p-7 text-white shadow-xl sm:p-9">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white/10">
              <Headphones
                size={28}
              />
            </div>

            <h2 className="mt-7 text-3xl font-bold">
              Let us know how we
              can help
            </h2>

            <p className="mt-4 leading-7 text-slate-200">
              Send us your question
              and include enough
              details so our team can
              understand the issue
              and provide the right
              assistance.
            </p>

            <div className="mt-8 space-y-5">
              <InformationItem
                title="Property support"
                description="Get help with property details, listings, search and availability."
              />

              <InformationItem
                title="Account support"
                description="Receive assistance with registration, login, profile and dashboard access."
              />

              <InformationItem
                title="Property-holder support"
                description="Get help adding, updating or managing your property listings."
              />
            </div>

            <div className="mt-9 border-t border-white/10 pt-7">
              <p className="text-sm font-semibold text-slate-200">
                HomeSphere links
              </p>

              <div className="mt-4 flex items-center gap-3">
                <SocialLink
                  href="https://github.com/Asma-Munni/homesphere-client"
                  label="Frontend GitHub repository"
                  icon={Link2}
                />

                <SocialLink
                  href="https://github.com/Asma-Munni/homesphere-server"
                  label="Backend GitHub repository"
                  icon={Link2}
                />

                <SocialLink
                  href="/properties"
                  label="Explore properties"
                  icon={Globe}
                  internal
                />

                <SocialLink
                  href={`mailto:${contactDetails.email}`}
                  label="Email HomeSphere"
                  icon={Share2}
                />
              </div>
            </div>
          </aside>

          {/* Contact form */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <Send size={21} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Send a message
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Complete the form
                  and contact our
                  support team.
                </p>
              </div>
            </div>

            <form
              onSubmit={
                handleSubmit
              }
              className="mt-8 space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="Full name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                />

                <FormField
                  label="Email address"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              <FormField
                label="Subject"
                name="subject"
                type="text"
                placeholder="What do you need help with?"
                value={
                  formData.subject
                }
                onChange={
                  handleChange
                }
              />

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={
                    formData.message
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Describe your question or issue"
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              {error && (
                <p className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm font-medium text-red-600">
                  {error}
                </p>
              )}

              {submitted && (
                <p className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm font-medium text-emerald-700">
                  <CheckCircle2
                    size={18}
                  />

                  Your email
                  application is
                  opening with the
                  message details.
                </p>
              )}

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 font-semibold text-white transition hover:bg-teal-800 sm:w-auto"
              >
                <Send size={18} />

                Send Message
              </button>
            </form>
          </section>
        </div>
      </section>

      {/* CTA */}

      <section className="border-t border-slate-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-7 rounded-3xl bg-slate-900 px-6 py-10 text-center text-white md:flex-row md:px-10 md:text-left">
          <div className="flex items-start gap-4">
            <div className="hidden size-14 shrink-0 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-400 sm:flex">
              <Building2
                size={28}
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Looking for a
                suitable property?
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                Browse available
                properties and use
                HomeSphere filters
                to find the right
                location, category
                and price.
              </p>
            </div>
          </div>

          <Link
            href="/properties"
            className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 font-semibold text-white transition hover:bg-teal-500"
          >
            Explore Properties

            <ArrowRight
              size={18}
            />
          </Link>
        </div>
      </section>
    </main>
  );
}

interface IconProps {
  size?: number;
  className?: string;
}

interface ContactCardProps {
  icon: ComponentType<IconProps>;
  title: string;
  description: string;
  href?: string;
  external?: boolean;
}

function ContactCard({
  icon: Icon,
  title,
  description,
  href,
  external = false,
}: ContactCardProps) {
  const content = (
    <>
      <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 transition group-hover:bg-teal-700 group-hover:text-white">
        <Icon size={23} />
      </div>

      <h2 className="mt-5 text-lg font-bold text-slate-900">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {description}
      </p>
    </>
  );

  if (!href) {
    return (
      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {content}
      </article>
    );
  }

  return (
    <a
      href={href}
      target={
        external
          ? "_blank"
          : undefined
      }
      rel={
        external
          ? "noreferrer"
          : undefined
      }
      className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg"
    >
      {content}
    </a>
  );
}

interface InformationItemProps {
  title: string;
  description: string;
}

function InformationItem({
  title,
  description,
}: InformationItemProps) {
  return (
    <div className="flex gap-3">
      <CheckCircle2
        size={20}
        className="mt-1 shrink-0 text-teal-400"
      />

      <div>
        <h3 className="font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-300">
          {description}
        </p>
      </div>
    </div>
  );
}

interface SocialLinkProps {
  href: string;
  label: string;
  icon: ComponentType<IconProps>;
  internal?: boolean;
}

function SocialLink({
  href,
  label,
  icon: Icon,
  internal = false,
}: SocialLinkProps) {
  const className =
    "flex size-10 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-teal-600";

  if (internal) {
    return (
      <Link
        href={href}
        aria-label={label}
        className={className}
      >
        <Icon size={18} />
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={
        href.startsWith(
          "http"
        )
          ? "_blank"
          : undefined
      }
      rel={
        href.startsWith(
          "http"
        )
          ? "noreferrer"
          : undefined
      }
      aria-label={label}
      className={className}
    >
      <Icon size={18} />
    </a>
  );
}

interface FormFieldProps {
  label: string;
  name: keyof ContactFormData;
  type: string;
  placeholder: string;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;
}

function FormField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={
          placeholder
        }
        className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
      />
    </div>
  );
}
"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import Link from "next/link";

import {
  ArrowLeft,
  Bell,
  LayoutDashboard,
  Mail,
  RotateCcw,
  Save,
  Settings,
  ShieldCheck,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  authClient,
} from "@/lib/auth-client";

const SETTINGS_KEY =
  "homesphere-admin-settings";

interface AdminSettings {
  displayName: string;
  supportEmail: string;
  emailNotifications: boolean;
  propertyNotifications: boolean;
  compactDashboard: boolean;
  itemsPerPage: string;
}

const defaultSettings: AdminSettings = {
  displayName: "",
  supportEmail: "",
  emailNotifications: true,
  propertyNotifications: true,
  compactDashboard: false,
  itemsPerPage: "10",
};

export default function AdminSettingsPage() {
  const {
    data: session,
    isPending,
  } =
    authClient.useSession();

  const [
    settings,
    setSettings,
  ] =
    useState<AdminSettings>(
      defaultSettings
    );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  useEffect(() => {
  if (isPending) {
    return;
  }

  const timeoutId = window.setTimeout(() => {
    const sessionSettings: AdminSettings = {
      ...defaultSettings,

      displayName:
        session?.user?.name ?? "",

      supportEmail:
        session?.user?.email ?? "",
    };

    try {
      const savedSettings =
        window.localStorage.getItem(
          SETTINGS_KEY
        );

      if (savedSettings) {
        const parsedSettings =
          JSON.parse(
            savedSettings
          ) as Partial<AdminSettings>;

        setSettings({
          ...sessionSettings,
          ...parsedSettings,
        });
      } else {
        setSettings(
          sessionSettings
        );
      }
    } catch (error) {
      console.error(
        "LOAD ADMIN SETTINGS ERROR:",
        error
      );

      setSettings(
        sessionSettings
      );
    } finally {
      setLoading(false);
    }
  }, 0);

  return () => {
    window.clearTimeout(
      timeoutId
    );
  };
}, [
  isPending,
  session?.user?.email,
  session?.user?.name,
]);

  const handleInputChange = (
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
    >
  ) => {
    const {
      name,
      value,
      type,
    } = event.target;

    const checked =
      event.target instanceof
      HTMLInputElement
        ? event.target.checked
        : false;

    setSettings(
      (previousSettings) => ({
        ...previousSettings,

        [name]:
          type === "checkbox"
            ? checked
            : value,
      })
    );
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !settings.displayName.trim()
    ) {
      toast.error(
        "Display name is required."
      );

      return;
    }

    if (
      !settings.supportEmail.trim()
    ) {
      toast.error(
        "Support email is required."
      );

      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(
        settings.supportEmail
      )
    ) {
      toast.error(
        "Please enter a valid email address."
      );

      return;
    }

    try {
      setSaving(true);

      localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(
          settings
        )
      );

      toast.success(
        "Settings saved successfully."
      );
    } catch (error) {
      console.error(
        "SAVE ADMIN SETTINGS ERROR:",
        error
      );

      toast.error(
        "Failed to save settings."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    const resetSettings = {
      ...defaultSettings,

      displayName:
        session?.user?.name ??
        "",

      supportEmail:
        session?.user?.email ??
        "",
    };

    setSettings(
      resetSettings
    );

    localStorage.removeItem(
      SETTINGS_KEY
    );

    toast.success(
      "Settings reset successfully."
    );
  };

  if (
    isPending ||
    loading
  ) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto size-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-700" />

          <p className="mt-4 font-medium text-slate-600">
            Loading settings...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-5 sm:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Page heading */}

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-700">
              <Settings
                size={24}
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Admin Settings
              </h1>

              <p className="mt-1 text-slate-600">
                Manage your dashboard
                preferences and
                notification settings.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/admin"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
          >
            <ArrowLeft
              size={18}
            />

            Back to Dashboard
          </Link>
        </div>

        {/* Account information */}

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
              <ShieldCheck
                size={24}
              />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Administrator Account
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                You are currently
                signed in with an
                administrator account.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  {session?.user?.name ??
                    "Administrator"}
                </span>

                <span className="rounded-full bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700">
                  {session?.user?.email ??
                    "No email available"}
                </span>
              </div>
            </div>
          </div>
        </section>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-8"
        >
          {/* General settings */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <LayoutDashboard
                  size={21}
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  General Preferences
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Configure your
                  personal admin
                  dashboard preferences.
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="displayName"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Display Name
                </label>

                <input
                  id="displayName"
                  name="displayName"
                  type="text"
                  value={
                    settings.displayName
                  }
                  onChange={
                    handleInputChange
                  }
                  placeholder="Administrator name"
                  className="h-12 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div>
                <label
                  htmlFor="supportEmail"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Support Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="supportEmail"
                    name="supportEmail"
                    type="email"
                    value={
                      settings.supportEmail
                    }
                    onChange={
                      handleInputChange
                    }
                    placeholder="support@homesphere.com"
                    className="h-12 w-full rounded-xl border border-slate-300 pl-11 pr-4 text-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="itemsPerPage"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Items Per Page
                </label>

                <select
                  id="itemsPerPage"
                  name="itemsPerPage"
                  value={
                    settings.itemsPerPage
                  }
                  onChange={
                    handleInputChange
                  }
                  className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
                >
                  <option value="10">
                    10 items
                  </option>

                  <option value="20">
                    20 items
                  </option>

                  <option value="50">
                    50 items
                  </option>

                  <option value="100">
                    100 items
                  </option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <SettingToggle
                name="compactDashboard"
                title="Compact Dashboard"
                description="Use smaller cards and reduced spacing in the admin dashboard."
                checked={
                  settings.compactDashboard
                }
                onChange={
                  handleInputChange
                }
              />
            </div>
          </section>

          {/* Notification settings */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Bell size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Notifications
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Select the dashboard
                  notifications you want
                  to receive.
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-4">
              <SettingToggle
                name="emailNotifications"
                title="Email Notifications"
                description="Receive general HomeSphere administration notifications."
                checked={
                  settings.emailNotifications
                }
                onChange={
                  handleInputChange
                }
              />

              <SettingToggle
                name="propertyNotifications"
                title="Property Notifications"
                description="Receive notifications when new properties are added."
                checked={
                  settings.propertyNotifications
                }
                onChange={
                  handleInputChange
                }
              />
            </div>
          </section>

          {/* Actions */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={
                handleReset
              }
              disabled={saving}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RotateCcw
                size={18}
              />

              Reset Settings
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={18} />

              {saving
                ? "Saving..."
                : "Save Settings"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs leading-5 text-slate-400">
          These preferences are saved
          in this browser for the
          current administrator.
        </p>
      </div>
    </main>
  );
}

interface SettingToggleProps {
  name:
    | "emailNotifications"
    | "propertyNotifications"
    | "compactDashboard";
  title: string;
  description: string;
  checked: boolean;
  onChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;
}

function SettingToggle({
  name,
  title,
  description,
  checked,
  onChange,
}: SettingToggleProps) {
  return (
    <label
      htmlFor={name}
      className="flex cursor-pointer items-center justify-between gap-5 rounded-2xl border border-slate-200 p-5 transition hover:border-teal-200 hover:bg-teal-50/30"
    >
      <div>
        <p className="font-semibold text-slate-900">
          {title}
        </p>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>

      <div className="relative shrink-0">
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />

        <div className="h-7 w-12 rounded-full bg-slate-300 transition peer-checked:bg-teal-700" />

        <div className="absolute left-1 top-1 size-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
      </div>
    </label>
  );
}
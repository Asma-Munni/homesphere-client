"use client";

/* eslint-disable @next/next/no-img-element */

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowLeft,
  Building2,
  Eye,
  MapPin,
  RefreshCcw,
} from "lucide-react";

import { API_URL } from "@/lib/api";

interface Property {
  _id: string;
  title: string;
  shortDescription?: string;
  description?: string;
  price: number | string;
  location?: string;
  category?: string;
  image?: string;
  images?: string[];
  status?: string;
  ownerId?: string;
}

interface PropertyResponse {
  success?: boolean;
  message?: string;
  data?: Property[];
}

export default function AdminPropertiesPage() {
  const [
    properties,
    setProperties,
  ] = useState<Property[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const loadProperties =
    async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(
            `${API_URL}/properties?page=1&limit=100&sort=newest`,
            {
              cache: "no-store",
            }
          );

        const result =
          (await response.json()) as
            PropertyResponse;

        if (
          !response.ok ||
          !result.success
        ) {
          throw new Error(
            result.message ??
              "Failed to load properties"
          );
        }

        setProperties(
          Array.isArray(
            result.data
          )
            ? result.data
            : []
        );
      } catch (error) {
        console.error(
          "ADMIN PROPERTIES ERROR:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load properties"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    void loadProperties();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 p-5 sm:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-700">
              <Building2
                size={24}
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Manage Properties
              </h1>

              <p className="mt-1 text-slate-600">
                Review all property
                listings available on
                HomeSphere.
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

        {/* Summary */}

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Total Properties
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {properties.length}
          </p>
        </div>

        {/* Loading */}

        {loading && (
          <div className="mt-8 flex min-h-72 items-center justify-center rounded-3xl border border-slate-200 bg-white">
            <div className="text-center">
              <div className="mx-auto size-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-700" />

              <p className="mt-4 font-medium text-slate-600">
                Loading properties...
              </p>
            </div>
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="mt-8 flex min-h-72 flex-col items-center justify-center rounded-3xl border border-red-200 bg-white px-6 text-center">
            <RefreshCcw
              size={35}
              className="text-red-500"
            />

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              Could not load
              properties
            </h2>

            <p className="mt-2 text-slate-600">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                void loadProperties()
              }
              className="mt-5 rounded-xl bg-teal-700 px-5 py-2.5 font-semibold text-white transition hover:bg-teal-800"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}

        {!loading &&
          !error &&
          properties.length ===
            0 && (
            <div className="mt-8 flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 text-center">
              <Building2
                size={44}
                className="text-slate-400"
              />

              <h2 className="mt-4 text-xl font-bold text-slate-900">
                No properties found
              </h2>

              <p className="mt-2 text-slate-500">
                Property listings will
                appear here after they
                are added.
              </p>
            </div>
          )}

        {/* Property table */}

        {!loading &&
          !error &&
          properties.length >
            0 && (
            <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px]">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                        Property
                      </th>

                      <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                        Category
                      </th>

                      <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                        Location
                      </th>

                      <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                        Price
                      </th>

                      <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                        Status
                      </th>

                      <th className="px-5 py-4 text-right text-sm font-semibold text-slate-700">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {properties.map(
                      (property) => {
                        const image =
                          property
                            .images?.[0] ??
                          property.image;

                        return (
                          <tr
                            key={
                              property._id
                            }
                            className="transition hover:bg-slate-50"
                          >
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className="size-14 shrink-0 overflow-hidden rounded-xl bg-slate-200">
                                  {image ? (
                                    <img
                                      src={
                                        image
                                      }
                                      alt={
                                        property.title
                                      }
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-full items-center justify-center text-slate-400">
                                      <Building2
                                        size={
                                          22
                                        }
                                      />
                                    </div>
                                  )}
                                </div>

                                <div>
                                  <p className="max-w-60 truncate font-semibold text-slate-900">
                                    {
                                      property.title
                                    }
                                  </p>

                                  <p className="mt-1 max-w-60 truncate text-xs text-slate-500">
                                    {property.shortDescription ??
                                      property.description ??
                                      "No description"}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-5 py-4 text-sm text-slate-600">
                              {property.category ??
                                "N/A"}
                            </td>

                            <td className="px-5 py-4">
                              <span className="flex items-center gap-2 text-sm text-slate-600">
                                <MapPin
                                  size={
                                    15
                                  }
                                  className="text-teal-700"
                                />

                                {property.location ??
                                  "N/A"}
                              </span>
                            </td>

                            <td className="px-5 py-4 font-semibold text-teal-700">
                              ৳{" "}
                              {Number(
                                property.price
                              ).toLocaleString(
                                "en-BD"
                              )}
                            </td>

                            <td className="px-5 py-4">
                              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold capitalize text-emerald-700">
                                {property.status ??
                                  "available"}
                              </span>
                            </td>

                            <td className="px-5 py-4 text-right">
                              <Link
                                href={`/properties/${property._id}`}
                                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
                              >
                                <Eye
                                  size={
                                    16
                                  }
                                />

                                View
                              </Link>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
      </div>
    </main>
  );
}
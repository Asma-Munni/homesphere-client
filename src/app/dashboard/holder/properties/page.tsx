"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Building2,
  Eye,
  MapPin,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  useSession,
} from "@/lib/auth-client";

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
  bedrooms?: number;
  bathrooms?: number;
  status?: string;
}

interface PropertyListResponse {
  success?: boolean;
  message?: string;
  data?: Property[];
}

interface DeletePropertyResponse {
  success?: boolean;
  message?: string;
}

async function fetchMyProperties(
  token: string
): Promise<Property[]> {
  const response = await fetch(
    `${API_URL}/properties/my-properties`,
    {
      method: "GET",

      headers: {
        Authorization:
          `Bearer ${token}`,
      },

      cache: "no-store",
    }
  );

  const result =
    (await response.json()) as
      PropertyListResponse;

  if (
    !response.ok ||
    !result.success
  ) {
    throw new Error(
      result.message ??
        "Failed to load properties."
    );
  }

  return Array.isArray(result.data)
    ? result.data
    : [];
}

export default function HolderPropertiesPage() {
  const router =
    useRouter();

  const {
    data: session,
    isPending,
  } = useSession();

  const userId =
    session?.session?.userId;

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

  const [
    deletingId,
    setDeletingId,
  ] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (isPending) {
      return;
    }

    if (!userId) {
      router.replace("/login");
      return;
    }

    const token =
      window.localStorage.getItem(
        "token"
      );

    if (!token) {
      router.replace("/login");
      return;
    }

    let ignoreResult = false;

    fetchMyProperties(token)
      .then(
        (
          propertyList
        ) => {
          if (ignoreResult) {
            return;
          }

          setProperties(
            propertyList
          );

          setError("");
        }
      )
      .catch(
        (
          fetchError: unknown
        ) => {
          if (ignoreResult) {
            return;
          }

          console.error(
            "FETCH PROPERTIES ERROR:",
            fetchError
          );

          setProperties([]);

          setError(
            fetchError instanceof Error
              ? fetchError.message
              : "Failed to load properties."
          );
        }
      )
      .finally(() => {
        if (!ignoreResult) {
          setLoading(false);
        }
      });

    return () => {
      ignoreResult = true;
    };
  }, [
    isPending,
    router,
    userId,
  ]);

  const handleDelete =
    async (
      propertyId: string
    ) => {
      const confirmed =
        window.confirm(
          "Are you sure you want to delete this property?"
        );

      if (!confirmed) {
        return;
      }

      const token =
        window.localStorage.getItem(
          "token"
        );

      if (!token) {
        toast.error(
          "Please login again."
        );

        router.replace("/login");

        return;
      }

      try {
        setDeletingId(
          propertyId
        );

        const response =
          await fetch(
            `${API_URL}/properties/${propertyId}`,
            {
              method: "DELETE",

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const result =
          (await response.json()) as
            DeletePropertyResponse;

        if (
          !response.ok ||
          !result.success
        ) {
          throw new Error(
            result.message ??
              "Failed to delete property."
          );
        }

        setProperties(
          (
            currentProperties
          ) =>
            currentProperties.filter(
              (property) =>
                property._id !==
                propertyId
            )
        );

        toast.success(
          "Property deleted successfully."
        );
      } catch (deleteError) {
        console.error(
          "DELETE PROPERTY ERROR:",
          deleteError
        );

        toast.error(
          deleteError instanceof Error
            ? deleteError.message
            : "Failed to delete property."
        );
      } finally {
        setDeletingId(null);
      }
    };

  if (
    isPending ||
    loading
  ) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto size-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-700" />

          <p className="mt-4 font-medium text-slate-600">
            Loading your
            properties...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-5 sm:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              My Properties
            </h1>

            <p className="mt-2 text-slate-600">
              View, edit and manage
              your property listings.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              router.push(
                "/properties/add"
              )
            }
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 font-semibold text-white transition hover:bg-teal-800"
          >
            <Plus size={18} />

            Add Property
          </button>
        </div>

        {error && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
            <p className="font-semibold">
              Could not load your
              properties
            </p>

            <p className="mt-1 text-sm">
              {error}
            </p>
          </div>
        )}

        {!error &&
          properties.length ===
            0 && (
            <div className="mt-8 flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                <Building2
                  size={32}
                />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                No property found
              </h2>

              <p className="mt-2 max-w-md leading-7 text-slate-600">
                Add your first
                property listing and
                manage it from this
                page.
              </p>

              <button
                type="button"
                onClick={() =>
                  router.push(
                    "/properties/add"
                  )
                }
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 font-semibold text-white transition hover:bg-teal-800"
              >
                <Plus size={18} />

                Add Property
              </button>
            </div>
          )}

        {!error &&
          properties.length >
            0 && (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {properties.map(
                (
                  property
                ) => {
                  const image =
                    property
                      .images?.[0] ??
                    property.image;

                  const isDeleting =
                    deletingId ===
                    property._id;

                  return (
                    <article
                      key={
                        property._id
                      }
                      className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="relative h-52 overflow-hidden bg-slate-200">
                        {image ? (
                          <Image
                            src={
                              image
                            }
                            alt={
                              property.title
                            }
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-slate-400">
                            <Building2
                              size={48}
                            />
                          </div>
                        )}

                        {property.category && (
                          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-teal-700">
                            {
                              property.category
                            }
                          </span>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <h2 className="line-clamp-1 text-xl font-bold text-slate-900">
                          {property.title}
                        </h2>

                        {property.location && (
                          <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                            <MapPin
                              size={16}
                              className="text-teal-700"
                            />

                            <span className="line-clamp-1">
                              {
                                property.location
                              }
                            </span>
                          </p>
                        )}

                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                          {property.shortDescription ??
                            property.description ??
                            "No description available."}
                        </p>

                        <p className="mt-4 text-2xl font-bold text-teal-700">
                          ৳{" "}
                          {Number(
                            property.price
                          ).toLocaleString(
                            "en-BD"
                          )}
                        </p>

                        <div className="mt-5 grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              router.push(
                                `/properties/${property._id}`
                              )
                            }
                            className="inline-flex items-center justify-center gap-1 rounded-xl bg-slate-900 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                          >
                            <Eye
                              size={16}
                            />

                            View
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              router.push(
                                `/dashboard/holder/properties/edit/${property._id}`
                              )
                            }
                            className="inline-flex items-center justify-center gap-1 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                          >
                            <Pencil
                              size={16}
                            />

                            Edit
                          </button>

                          <button
                            type="button"
                            disabled={
                              isDeleting
                            }
                            onClick={() =>
                              void handleDelete(
                                property._id
                              )
                            }
                            className="inline-flex items-center justify-center gap-1 rounded-xl bg-red-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Trash2
                              size={16}
                            />

                            {isDeleting
                              ? "..."
                              : "Delete"}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                }
              )}
            </div>
          )}
      </div>
    </main>
  );
}
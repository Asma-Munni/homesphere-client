"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  ArrowRight,
  Building2,
  Heart,
  MapPin,
  RefreshCcw,
  Trash2,
} from "lucide-react";

import { API_URL } from "@/lib/api";

const FAVORITES_KEY = "homesphere-favorites";

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
}

interface PropertyResponse {
  success?: boolean;
  message?: string;
  data?: Property | null;
}

function getFavoriteIds(): string[] {
  try {
    const savedFavorites =
      window.localStorage.getItem(
        FAVORITES_KEY
      );

    if (!savedFavorites) {
      return [];
    }

    const parsedFavorites: unknown =
      JSON.parse(savedFavorites);

    if (!Array.isArray(parsedFavorites)) {
      return [];
    }

    return parsedFavorites.filter(
      (item): item is string =>
        typeof item === "string"
    );
  } catch (error) {
    console.error(
      "READ FAVORITES ERROR:",
      error
    );

    return [];
  }
}

function saveFavoriteIds(
  properties: Property[]
) {
  const propertyIds =
    properties.map(
      (property) =>
        property._id
    );

  window.localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(propertyIds)
  );
}

async function fetchFavoriteProperties(): Promise<
  Property[]
> {
  const favoriteIds =
    getFavoriteIds();

  if (favoriteIds.length === 0) {
    return [];
  }

  const requests =
    favoriteIds.map(
      async (
        propertyId
      ): Promise<Property | null> => {
        try {
          const response =
            await fetch(
              `${API_URL}/properties/${propertyId}`,
              {
                cache: "no-store",
              }
            );

          if (!response.ok) {
            return null;
          }

          const result =
            (await response.json()) as
              PropertyResponse;

          if (
            !result.success ||
            !result.data
          ) {
            return null;
          }

          return result.data;
        } catch (error) {
          console.error(
            `FAVORITE PROPERTY ${propertyId} ERROR:`,
            error
          );

          return null;
        }
      }
    );

  const results =
    await Promise.all(requests);

  return results.filter(
    (
      property
    ): property is Property =>
      property !== null
  );
}

function formatPrice(
  price: number | string
): string {
  const numericPrice =
    Number(price);

  if (
    Number.isNaN(numericPrice)
  ) {
    return `৳ ${price}`;
  }

  return `৳ ${numericPrice.toLocaleString(
    "en-BD"
  )}`;
}

export default function TenantFavoritesPage() {
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

  useEffect(() => {
    let ignoreResult = false;

    fetchFavoriteProperties()
      .then(
        (
          favoriteProperties
        ) => {
          if (ignoreResult) {
            return;
          }

          setProperties(
            favoriteProperties
          );

          saveFavoriteIds(
            favoriteProperties
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
            "LOAD FAVORITES ERROR:",
            fetchError
          );

          setProperties([]);

          setError(
            "Could not load your favorite properties."
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
  }, []);

  const handleRetry =
    async () => {
      try {
        setLoading(true);
        setError("");

        const favoriteProperties =
          await fetchFavoriteProperties();

        setProperties(
          favoriteProperties
        );

        saveFavoriteIds(
          favoriteProperties
        );
      } catch (retryError) {
        console.error(
          "RETRY FAVORITES ERROR:",
          retryError
        );

        setProperties([]);

        setError(
          "Could not load your favorite properties."
        );
      } finally {
        setLoading(false);
      }
    };

  const removeFavorite = (
    propertyId: string
  ) => {
    setProperties(
      (
        currentProperties
      ) => {
        const updatedProperties =
          currentProperties.filter(
            (property) =>
              property._id !==
              propertyId
          );

        saveFavoriteIds(
          updatedProperties
        );

        return updatedProperties;
      }
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 p-5 sm:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
              <Heart
                size={24}
                className="fill-current"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Favorite Properties
              </h1>

              <p className="mt-1 text-slate-600">
                View and manage the
                properties you saved.
              </p>
            </div>
          </div>

          <Link
            href="/properties"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 font-semibold text-white transition hover:bg-teal-800"
          >
            Explore Properties

            <ArrowRight
              size={18}
            />
          </Link>
        </div>

        {/* Summary */}

        {!loading &&
          !error && (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Saved Properties
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {properties.length}
              </p>
            </div>
          )}

        {/* Loading */}

        {loading && (
          <div className="mt-8 flex min-h-72 items-center justify-center rounded-3xl border border-slate-200 bg-white">
            <div className="text-center">
              <div className="mx-auto size-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-700" />

              <p className="mt-4 font-medium text-slate-600">
                Loading favorite
                properties...
              </p>
            </div>
          </div>
        )}

        {/* Error */}

        {!loading &&
          error && (
            <div className="mt-8 flex min-h-72 flex-col items-center justify-center rounded-3xl border border-red-200 bg-white px-6 text-center">
              <RefreshCcw
                size={36}
                className="text-red-500"
              />

              <h2 className="mt-4 text-xl font-bold text-slate-900">
                Could not load
                favorites
              </h2>

              <p className="mt-2 text-slate-600">
                {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  void handleRetry()
                }
                className="mt-5 rounded-xl bg-teal-700 px-5 py-2.5 font-semibold text-white transition hover:bg-teal-800"
              >
                Try Again
              </button>
            </div>
          )}

        {/* Empty state */}

        {!loading &&
          !error &&
          properties.length ===
            0 && (
            <div className="mt-8 flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 text-center">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
                <Heart
                  size={31}
                />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                No favorite
                properties yet
              </h2>

              <p className="mt-3 max-w-md leading-7 text-slate-600">
                Save properties while
                exploring HomeSphere
                and they will appear
                here.
              </p>

              <Link
                href="/properties"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 font-semibold text-white transition hover:bg-teal-800"
              >
                Browse Properties

                <ArrowRight
                  size={18}
                />
              </Link>
            </div>
          )}

        {/* Favorite cards */}

        {!loading &&
          !error &&
          properties.length >
            0 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {properties.map(
                (
                  property
                ) => {
                  const image =
                    property
                      .images?.[0] ??
                    property.image;

                  return (
                    <article
                      key={
                        property._id
                      }
                      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="relative h-56 overflow-hidden bg-slate-200">
                        {image ? (
                          <img
                            src={
                              image
                            }
                            alt={
                              property.title
                            }
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
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

                        <button
                          type="button"
                          onClick={() =>
                            removeFavorite(
                              property._id
                            )
                          }
                          aria-label={`Remove ${property.title} from favorites`}
                          className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white text-red-600 shadow transition hover:bg-red-50"
                        >
                          <Trash2
                            size={18}
                          />
                        </button>
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <h2 className="line-clamp-1 text-xl font-bold text-slate-900">
                          {
                            property.title
                          }
                        </h2>

                        {property.location && (
                          <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                            <MapPin
                              size={16}
                              className="shrink-0 text-teal-700"
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
                            "View the complete property details."}
                        </p>

                        <p className="mt-5 text-2xl font-bold text-teal-700">
                          {formatPrice(
                            property.price
                          )}
                        </p>

                        <Link
                          href={`/properties/${property._id}`}
                          className="mt-5 flex h-11 items-center justify-center rounded-xl bg-slate-900 font-semibold text-white transition hover:bg-teal-700"
                        >
                          View Details
                        </Link>
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
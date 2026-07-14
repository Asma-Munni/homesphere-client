import Link from "next/link";

import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  MapPin,
} from "lucide-react";

const API_URL =
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:5000/api";

interface Property {
  _id: string;
  title: string;
  shortDescription?: string;
  description?: string;
  price: number | string;
  location?: string;
  category?: string;
  bedrooms?: number;
  bathrooms?: number;
  images?: string[];
  image?: string;
  status?: string;
}

interface PropertyResponse {
  success: boolean;
  data: Property[];
}

async function getFeaturedProperties(): Promise<
  Property[]
> {
  try {
    const response = await fetch(
      `${API_URL}/properties?sort=newest&page=1&limit=4`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!response.ok) {
      return [];
    }

    const result =
      (await response.json()) as PropertyResponse;

    return Array.isArray(result.data)
      ? result.data
      : [];
  } catch (error) {
    console.error(
      "FEATURED PROPERTY ERROR:",
      error
    );

    return [];
  }
}

function getPropertyImage(
  property: Property
): string | null {
  if (
    property.images &&
    property.images.length > 0
  ) {
    return property.images[0];
  }

  return property.image ?? null;
}

function formatPrice(
  price: number | string
): string {
  const numericPrice =
    Number(price);

  if (
    Number.isNaN(numericPrice)
  ) {
    return String(price);
  }

  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }
  ).format(numericPrice);
}

export default async function FeaturedProperties() {
  const properties =
    await getFeaturedProperties();

  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex rounded-full bg-teal-50 px-4 py-1.5 text-sm font-semibold text-teal-700">
              Featured Listings
            </span>

            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Discover recently added
              properties
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Explore some of the latest
              homes and rental properties
              available on HomeSphere.
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-2 font-semibold text-teal-700 transition hover:text-teal-800"
          >
            View all properties

            <ArrowRight size={18} />
          </Link>
        </div>

        {properties.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.map(
              (property) => {
                const imageUrl =
                  getPropertyImage(
                    property
                  );

                return (
                  <article
                    key={property._id}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Image */}

                    <div
                      className="relative h-52 overflow-hidden bg-slate-200 bg-cover bg-center"
                      style={
                        imageUrl
                          ? {
                              backgroundImage:
                                `url("${imageUrl}")`,
                            }
                          : undefined
                      }
                    >
                      {!imageUrl && (
                        <div className="flex h-full items-center justify-center text-slate-400">
                          <Building2
                            size={48}
                          />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                      {property.category && (
                        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-teal-700">
                          {
                            property.category
                          }
                        </span>
                      )}

                      {property.status && (
                        <span className="absolute right-4 top-4 rounded-full bg-teal-700 px-3 py-1 text-xs font-semibold capitalize text-white">
                          {
                            property.status
                          }
                        </span>
                      )}

                      <p className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                        {formatPrice(
                          property.price
                        )}
                      </p>
                    </div>

                    {/* Content */}

                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="line-clamp-1 text-xl font-bold text-slate-900 transition group-hover:text-teal-700">
                        {property.title}
                      </h3>

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
                          "View the complete property information and available features."}
                      </p>

                      <div className="mt-4 flex items-center gap-4 border-y border-slate-100 py-3 text-sm text-slate-600">
                        {property.bedrooms !==
                          undefined && (
                          <span className="flex items-center gap-1.5">
                            <BedDouble
                              size={17}
                              className="text-teal-700"
                            />

                            {
                              property.bedrooms
                            }{" "}
                            Beds
                          </span>
                        )}

                        {property.bathrooms !==
                          undefined && (
                          <span className="flex items-center gap-1.5">
                            <Bath
                              size={17}
                              className="text-teal-700"
                            />

                            {
                              property.bathrooms
                            }{" "}
                            Baths
                          </span>
                        )}
                      </div>

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
        ) : (
          <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
              <Building2 size={30} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              No properties available yet
            </h3>

            <p className="mt-2 max-w-md text-slate-600">
              New property listings will
              appear here after they are
              added to HomeSphere.
            </p>

            <Link
              href="/properties"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 font-semibold text-white transition hover:bg-teal-800"
            >
              Explore Properties

              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
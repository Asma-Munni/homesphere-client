/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

import { notFound } from "next/navigation";
import { API_URL } from "@/lib/api";

import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  CheckCircle2,
  MapPin,
  MessageSquare,
  Ruler,
  ShieldCheck,
  Star,
} from "lucide-react";



interface PropertyReview {
  _id?: string;
  userName?: string;
  rating?: number;
  comment?: string;
  createdAt?: string;
}

interface Property {
  _id: string;
  title: string;
  shortDescription?: string;
  description?: string;
  price: number | string;
  location?: string;
  category?: string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  image?: string;
  images?: string[];
  amenities?: string[] | string;
  status?: string;
  area?: number | string;
  squareFeet?: number | string;
  propertyType?: string;
  ownerId?: string;
  ownerName?: string;
  ownerEmail?: string;
  ownerPhone?: string;
  createdAt?: string;
  updatedAt?: string;
  reviews?: PropertyReview[];
}

interface SinglePropertyResponse {
  success?: boolean;
  message?: string;
  data?: Property;
}

interface PropertyListResponse {
  success?: boolean;
  data?: Property[];
}

async function getProperty(
  id: string
): Promise<Property | null> {
  const response = await fetch(
    `${API_URL}/properties/${id}`,
    {
      cache: "no-store",
    }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      "Failed to fetch property details."
    );
  }

  const result =
    (await response.json()) as
      | SinglePropertyResponse
      | Property;

  if (
    "data" in result &&
    result.data
  ) {
    return result.data;
  }

  return result as Property;
}

async function getRelatedProperties(
  property: Property
): Promise<Property[]> {
  if (!property.category) {
    return [];
  }

  try {
    const response = await fetch(
      `${API_URL}/properties?category=${encodeURIComponent(
        property.category
      )}&page=1&limit=5`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return [];
    }

    const result =
      (await response.json()) as PropertyListResponse;

    if (!Array.isArray(result.data)) {
      return [];
    }

    return result.data
      .filter(
        (item) =>
          item._id !== property._id
      )
      .slice(0, 4);
  } catch (error) {
    console.error(
      "RELATED PROPERTY ERROR:",
      error
    );

    return [];
  }
}

function getPropertyImages(
  property: Property
): string[] {
  const images = Array.isArray(
    property.images
  )
    ? property.images.filter(Boolean)
    : [];

  if (
    property.image &&
    !images.includes(property.image)
  ) {
    images.unshift(property.image);
  }

  return images;
}

function getAmenities(
  property: Property
): string[] {
  if (
    Array.isArray(property.amenities)
  ) {
    return property.amenities.filter(
      Boolean
    );
  }

  if (
    typeof property.amenities ===
    "string"
  ) {
    return property.amenities
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function formatPrice(
  price: number | string
): string {
  const numericPrice = Number(price);

  if (
    Number.isNaN(numericPrice)
  ) {
    return `৳ ${price}`;
  }

  return `৳ ${numericPrice.toLocaleString(
    "en-BD"
  )}`;
}

function formatDate(
  date?: string
): string {
  if (!date) {
    return "Not specified";
  }

  const parsedDate = new Date(date);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return "Not specified";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  ).format(parsedDate);
}

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const property =
    await getProperty(id);

  if (!property) {
    notFound();
  }

  const [
    relatedProperties,
  ] = await Promise.all([
    getRelatedProperties(property),
  ]);

  const images =
    getPropertyImages(property);

  const amenities =
    getAmenities(property);

  const reviews = Array.isArray(
    property.reviews
  )
    ? property.reviews
    : [];

  const propertyArea =
    property.area ??
    property.squareFeet;

  const contactHref =
    property.ownerEmail
      ? `mailto:${
          property.ownerEmail
        }?subject=${encodeURIComponent(
          `Interested in ${property.title}`
        )}`
      : `/contact?propertyId=${encodeURIComponent(
          property._id
        )}&subject=${encodeURIComponent(
          property.title
        )}`;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}

      <section className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link
            href="/"
            className="transition hover:text-teal-700"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/properties"
            className="transition hover:text-teal-700"
          >
            Properties
          </Link>

          <span>/</span>

          <span className="line-clamp-1 font-medium text-slate-700">
            {property.title}
          </span>
        </div>
      </section>

      {/* Property gallery */}

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {images.length > 0 ? (
            <div className="grid h-[460px] gap-3 overflow-hidden rounded-3xl md:grid-cols-2">
              <div className="relative h-full overflow-hidden bg-slate-200">
                <img
                  src={images[0]}
                  alt={property.title}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              {images.length > 1 ? (
                <div className="hidden grid-cols-2 gap-3 md:grid">
                  {images
                    .slice(1, 5)
                    .map(
                      (
                        image,
                        index
                      ) => (
                        <div
                          key={`${image}-${index}`}
                          className="relative overflow-hidden bg-slate-200"
                        >
                          <img
                            src={image}
                            alt={`${property.title} image ${
                              index + 2
                            }`}
                            className="h-full w-full object-cover transition duration-500 hover:scale-105"
                          />

                          {index ===
                            3 &&
                            images.length >
                              5 && (
                              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/65 text-lg font-bold text-white">
                                +
                                {images.length -
                                  5}{" "}
                                more
                              </div>
                            )}
                        </div>
                      )
                    )}
                </div>
              ) : (
                <div className="hidden items-center justify-center bg-slate-100 text-slate-400 md:flex">
                  <Building2
                    size={72}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-[420px] items-center justify-center rounded-3xl bg-slate-200 text-slate-400">
              <div className="text-center">
                <Building2
                  size={72}
                  className="mx-auto"
                />

                <p className="mt-4 font-medium">
                  No property image
                  available
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main property information */}

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            {/* Header */}

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                {property.category && (
                  <span className="rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
                    {
                      property.category
                    }
                  </span>
                )}

                {property.status && (
                  <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold capitalize text-emerald-700">
                    {property.status}
                  </span>
                )}
              </div>

              <h1 className="mt-5 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {property.title}
              </h1>

              {property.location && (
                <p className="mt-4 flex items-center gap-2 text-slate-600">
                  <MapPin
                    size={20}
                    className="shrink-0 text-teal-700"
                  />

                  {property.location}
                </p>
              )}

              {property.shortDescription && (
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  {
                    property.shortDescription
                  }
                </p>
              )}

              <div className="mt-7 grid gap-4 border-t border-slate-200 pt-7 sm:grid-cols-2 lg:grid-cols-4">
                <SpecificationCard
                  icon={BedDouble}
                  label="Bedrooms"
                  value={
                    property.bedrooms ??
                    "N/A"
                  }
                />

                <SpecificationCard
                  icon={Bath}
                  label="Bathrooms"
                  value={
                    property.bathrooms ??
                    "N/A"
                  }
                />

                <SpecificationCard
                  icon={Ruler}
                  label="Property Area"
                  value={
                    propertyArea
                      ? `${propertyArea} sq ft`
                      : "N/A"
                  }
                />

                <SpecificationCard
                  icon={Building2}
                  label="Property Type"
                  value={
                    property.propertyType ??
                    property.category ??
                    "N/A"
                  }
                />
              </div>
            </article>

            {/* Overview */}

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Property Overview
              </h2>

              <div className="mt-5 whitespace-pre-line leading-8 text-slate-600">
                {property.description ??
                  property.shortDescription ??
                  "No detailed description is available for this property."}
              </div>
            </article>

            {/* Amenities */}

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Amenities
              </h2>

              {amenities.length >
              0 ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {amenities.map(
                    (
                      amenity,
                      index
                    ) => (
                      <div
                        key={`${amenity}-${index}`}
                        className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 text-sm font-medium text-slate-700"
                      >
                        <CheckCircle2
                          size={19}
                          className="shrink-0 text-teal-700"
                        />

                        {amenity}
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="mt-4 text-slate-500">
                  No amenities have
                  been listed for this
                  property.
                </p>
              )}
            </article>

            {/* Reviews */}

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Property Reviews
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Reviews submitted
                    for this property.
                  </p>
                </div>

                <div className="flex size-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Star size={21} />
                </div>
              </div>

              {reviews.length > 0 ? (
                <div className="mt-6 space-y-4">
                  {reviews.map(
                    (
                      review,
                      index
                    ) => (
                      <div
                        key={
                          review._id ??
                          index
                        }
                        className="rounded-2xl border border-slate-200 p-5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="font-semibold text-slate-900">
                              {review.userName ??
                                "HomeSphere User"}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {formatDate(
                                review.createdAt
                              )}
                            </p>
                          </div>

                          {review.rating !==
                            undefined && (
                            <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
                              <Star
                                size={15}
                                className="fill-current"
                              />

                              {
                                review.rating
                              }
                            </div>
                          )}
                        </div>

                        {review.comment && (
                          <p className="mt-4 leading-7 text-slate-600">
                            {
                              review.comment
                            }
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
                  <MessageSquare
                    size={34}
                    className="mx-auto text-slate-400"
                  />

                  <p className="mt-4 font-semibold text-slate-700">
                    No reviews yet
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Reviews will appear
                    here after users
                    share their
                    experience.
                  </p>
                </div>
              )}
            </article>
          </div>

          {/* Right sidebar */}

          <aside className="space-y-6">
            <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Monthly rent
              </p>

              <p className="mt-2 text-3xl font-black text-teal-700">
                {formatPrice(
                  property.price
                )}
              </p>

              <div className="mt-6 space-y-4 border-y border-slate-200 py-6 text-sm">
                <SidebarItem
                  icon={MapPin}
                  label="Location"
                  value={
                    property.location ??
                    "Not specified"
                  }
                />

                <SidebarItem
                  icon={CalendarDays}
                  label="Listed on"
                  value={formatDate(
                    property.createdAt
                  )}
                />

                <SidebarItem
                  icon={ShieldCheck}
                  label="Listing status"
                  value={
                    property.status ??
                    "Available"
                  }
                />
              </div>

              <div className="mt-6">
                <h3 className="font-bold text-slate-900">
                  Property Owner
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  {property.ownerName ??
                    "HomeSphere Property Holder"}
                </p>

                {property.ownerPhone && (
                  <p className="mt-1 text-sm text-slate-500">
                    {
                      property.ownerPhone
                    }
                  </p>
                )}
              </div>

              <a
                href={contactHref}
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 font-semibold text-white transition hover:bg-teal-800"
              >
                <MessageSquare
                  size={18}
                />

                Contact Owner
              </a>

              <Link
                href="/properties"
                className="mt-3 flex h-12 w-full items-center justify-center rounded-xl border border-slate-300 px-5 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Back to Properties
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Related properties */}

      {relatedProperties.length >
        0 && (
        <section className="border-t border-slate-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <span className="inline-flex rounded-full bg-teal-50 px-4 py-1.5 text-sm font-semibold text-teal-700">
                  Similar Listings
                </span>

                <h2 className="mt-4 text-3xl font-bold text-slate-900">
                  Related Properties
                </h2>

                <p className="mt-2 text-slate-600">
                  Explore other
                  properties from the
                  same category.
                </p>
              </div>

              <Link
                href={`/properties?category=${encodeURIComponent(
                  property.category ??
                    ""
                )}`}
                className="inline-flex items-center gap-2 font-semibold text-teal-700 transition hover:text-teal-800"
              >
                View all

                <ArrowRight
                  size={18}
                />
              </Link>
            </div>

            <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProperties.map(
                (
                  relatedProperty
                ) => (
                  <RelatedPropertyCard
                    key={
                      relatedProperty._id
                    }
                    property={
                      relatedProperty
                    }
                  />
                )
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

interface IconProps {
  size?: number;
  className?: string;
}

interface SpecificationCardProps {
  icon: React.ComponentType<IconProps>;
  label: string;
  value: number | string;
}

function SpecificationCard({
  icon: Icon,
  label,
  value,
}: SpecificationCardProps) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <Icon
        size={22}
        className="text-teal-700"
      />

      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-bold capitalize text-slate-900">
        {value}
      </p>
    </div>
  );
}

interface SidebarItemProps {
  icon: React.ComponentType<IconProps>;
  label: string;
  value: string;
}

function SidebarItem({
  icon: Icon,
  label,
  value,
}: SidebarItemProps) {
  return (
    <div className="flex gap-3">
      <Icon
        size={19}
        className="mt-0.5 shrink-0 text-teal-700"
      />

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-1 font-medium capitalize text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}

function RelatedPropertyCard({
  property,
}: {
  property: Property;
}) {
  const images =
    getPropertyImages(property);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden bg-slate-200">
        {images[0] ? (
          <img
            src={images[0]}
            alt={property.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            <Building2
              size={42}
            />
          </div>
        )}

        {property.category && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-teal-700">
            {property.category}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-lg font-bold text-slate-900 transition group-hover:text-teal-700">
          {property.title}
        </h3>

        {property.location && (
          <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <MapPin
              size={15}
              className="shrink-0 text-teal-700"
            />

            <span className="line-clamp-1">
              {property.location}
            </span>
          </p>
        )}

        <p className="mt-4 text-xl font-bold text-teal-700">
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
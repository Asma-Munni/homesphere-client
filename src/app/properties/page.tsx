import Link from "next/link";
import { API_URL } from "@/lib/api";

import {
  Bath,
  BedDouble,
  Building2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";

export const dynamic = "force-dynamic";



const PAGE_LIMIT = 9;

const categories = [
  "Apartment",
  "House",
  "Condo",
  "Studio",
  "Commercial",
];

interface Property {
  _id?: string;
  id?: string;

  title: string;
  shortDescription?: string;
  description?: string;

  price: number | string;
  category?: string;
  location?: string;

  bedrooms?: number;
  bathrooms?: number;

  images?: string[];
  image?: string;

  status?: string;
  rating?: number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface NestedPropertyData {
  properties?: Property[];
  pagination?: Pagination;
}

interface PropertyApiResponse {
  success?: boolean;

  data?:
    | Property[]
    | NestedPropertyData;

  properties?: Property[];

  pagination?: Pagination;

  total?: number;
  totalPages?: number;
}

type PropertiesSearchParams = Promise<{
  search?: string | string[];
  category?: string | string[];
  location?: string | string[];
  minPrice?: string | string[];
  maxPrice?: string | string[];
  sort?: string | string[];
  page?: string | string[];
}>;

interface PropertiesPageProps {
  searchParams: PropertiesSearchParams;
}

interface PropertyResult {
  properties: Property[];
  pagination: Pagination;
}

function getParamValue(
  value: string | string[] | undefined
): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

function createQueryString({
  search,
  category,
  location,
  minPrice,
  maxPrice,
  sort,
  page,
}: {
  search: string;
  category: string;
  location: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
  page: number;
}): string {
  const params =
    new URLSearchParams();

  if (search) {
    params.set(
      "search",
      search
    );
  }

  if (category) {
    params.set(
      "category",
      category
    );
  }

  if (location) {
    params.set(
      "location",
      location
    );
  }

  if (minPrice) {
    params.set(
      "minPrice",
      minPrice
    );
  }

  if (maxPrice) {
    params.set(
      "maxPrice",
      maxPrice
    );
  }

  if (sort) {
    params.set(
      "sort",
      sort
    );
  }

  params.set(
    "page",
    String(page)
  );

  params.set(
    "limit",
    String(PAGE_LIMIT)
  );

  return params.toString();
}

async function getProperties(
  queryString: string,
  requestedPage: number
): Promise<PropertyResult> {
  const response =
    await fetch(
      `${API_URL}/properties?${queryString}`,
      {
        cache: "no-store",
      }
    );

  if (!response.ok) {
    throw new Error(
      "Could not load properties"
    );
  }

  const payload =
    (await response.json()) as
      | PropertyApiResponse
      | Property[];

  
  if (Array.isArray(payload)) {
    return {
      properties: payload,

      pagination: {
        page: requestedPage,
        limit: PAGE_LIMIT,
        total: payload.length,
        totalPages:
          payload.length > 0
            ? 1
            : 0,
      },
    };
  }

  
  const nestedData =
    payload.data &&
    !Array.isArray(payload.data)
      ? payload.data
      : undefined;

  const properties =
    Array.isArray(payload.data)
      ? payload.data
      : payload.properties ??
        nestedData?.properties ??
        [];

  const receivedPagination =
    payload.pagination ??
    nestedData?.pagination;

  const total =
    Number(
      receivedPagination?.total ??
        payload.total ??
        properties.length
    ) || 0;

  const totalPages =
    Number(
      receivedPagination
        ?.totalPages ??
        payload.totalPages ??
        (
          total > 0
            ? Math.ceil(
                total /
                  PAGE_LIMIT
              )
            : 0
        )
    ) || 0;

  return {
    properties,

    pagination: {
      page:
        Number(
          receivedPagination
            ?.page
        ) ||
        requestedPage,

      limit:
        Number(
          receivedPagination
            ?.limit
        ) ||
        PAGE_LIMIT,

      total,

      totalPages,
    },
  };
}

function formatPrice(
  price: number | string
): string {
  const numericPrice =
    Number(price);

  if (
    Number.isNaN(
      numericPrice
    )
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

function getVisiblePages(
  currentPage: number,
  totalPages: number
): number[] {
  if (totalPages <= 5) {
    return Array.from(
      {
        length: totalPages,
      },
      (_, index) =>
        index + 1
    );
  }

  const startPage =
    Math.max(
      1,
      Math.min(
        currentPage - 2,
        totalPages - 4
      )
    );

  return Array.from(
    {
      length: 5,
    },
    (_, index) =>
      startPage + index
  );
}

export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  const params =
    await searchParams;

  const search =
    getParamValue(
      params.search
    ).trim();

  const category =
    getParamValue(
      params.category
    );

  const location =
    getParamValue(
      params.location
    ).trim();

  const minPrice =
    getParamValue(
      params.minPrice
    );

  const maxPrice =
    getParamValue(
      params.maxPrice
    );

  const sort =
    getParamValue(
      params.sort
    ) || "newest";

  const requestedPage =
    Math.max(
      1,
      Number(
        getParamValue(
          params.page
        )
      ) || 1
    );

  const queryString =
    createQueryString({
      search,
      category,
      location,
      minPrice,
      maxPrice,
      sort,
      page: requestedPage,
    });

  let result: PropertyResult;

  try {
    result =
      await getProperties(
        queryString,
        requestedPage
      );
  } catch (error) {
    console.error(
      "PROPERTY FETCH ERROR:",
      error
    );

    return (
      <main className="min-h-screen bg-slate-50 px-4 py-16">
        <section className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <Building2
              size={30}
            />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Could not load
            properties
          </h1>

          <p className="mt-2 text-slate-600">
            Something went wrong
            while loading the
            property listings.
          </p>

          <Link
            href="/properties"
            className="mt-6 rounded-xl bg-teal-700 px-5 py-2.5 font-semibold text-white transition hover:bg-teal-800"
          >
            Try Again
          </Link>
        </section>
      </main>
    );
  }

  const {
    properties,
    pagination,
  } = result;

  const currentPage =
    pagination.page;

  const visiblePages =
    getVisiblePages(
      currentPage,
      pagination.totalPages
    );

  const createPageHref = (
    pageNumber: number
  ): string => {
    const query =
      createQueryString({
        search,
        category,
        location,
        minPrice,
        maxPrice,
        sort,
        page: pageNumber,
      });

    return `/properties?${query}`;
  };

  const startResult =
    pagination.total === 0
      ? 0
      : (
          currentPage - 1
        ) *
          pagination.limit +
        1;

  const endResult =
    Math.min(
      currentPage *
        pagination.limit,
      pagination.total
    );

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Page header */}

      <section className="border-b border-slate-200 bg-gradient-to-br from-teal-700 to-slate-950 px-4 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-teal-50">
            Find your next home
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Explore Properties
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
            Search and compare
            available homes based
            on location, category,
            price and your personal
            preferences.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Filter section */}

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-2">
            <SlidersHorizontal
              size={20}
              className="text-teal-700"
            />

            <h2 className="text-lg font-bold text-slate-900">
              Search and Filters
            </h2>
          </div>

          <form
            action="/properties"
            method="GET"
          >
            <input
              type="hidden"
              name="page"
              value="1"
            />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Search */}

              <div className="lg:col-span-2">
                <label
                  htmlFor="search"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Search property
                </label>

                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="search"
                    name="search"
                    type="search"
                    defaultValue={
                      search
                    }
                    placeholder="Search by title or description"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </div>

              {/* Category */}

              <div>
                <label
                  htmlFor="category"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Category
                </label>

                <select
                  id="category"
                  name="category"
                  defaultValue={
                    category
                  }
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                >
                  <option value="">
                    All categories
                  </option>

                  {categories.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Location */}

              <div>
                <label
                  htmlFor="location"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Location
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="location"
                    name="location"
                    type="text"
                    defaultValue={
                      location
                    }
                    placeholder="City or area"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </div>

              {/* Minimum price */}

              <div>
                <label
                  htmlFor="minPrice"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Minimum price
                </label>

                <input
                  id="minPrice"
                  name="minPrice"
                  type="number"
                  min="0"
                  defaultValue={
                    minPrice
                  }
                  placeholder="Minimum"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              {/* Maximum price */}

              <div>
                <label
                  htmlFor="maxPrice"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Maximum price
                </label>

                <input
                  id="maxPrice"
                  name="maxPrice"
                  type="number"
                  min="0"
                  defaultValue={
                    maxPrice
                  }
                  placeholder="Maximum"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              {/* Sorting */}

              <div>
                <label
                  htmlFor="sort"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Sort properties
                </label>

                <select
                  id="sort"
                  name="sort"
                  defaultValue={
                    sort
                  }
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                >
                  <option value="newest">
                    Newest first
                  </option>

                  <option value="oldest">
                    Oldest first
                  </option>

                  <option value="price-asc">
                    Price: low to high
                  </option>

                  <option value="price-desc">
                    Price: high to low
                  </option>

                  <option value="title-asc">
                    Title: A to Z
                  </option>
                </select>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 font-semibold text-white transition hover:bg-teal-800"
              >
                <Search
                  size={18}
                />

                Apply Filters
              </button>

              <Link
                href="/properties"
                className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 font-semibold text-slate-700 transition hover:border-teal-500 hover:bg-teal-50 hover:text-teal-700"
              >
                <RotateCcw
                  size={18}
                />

                Reset
              </Link>
            </div>
          </form>
        </section>

        {/* Result summary */}

        <section className="mt-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Available Properties
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {pagination.total > 0
                ? `Showing ${startResult}–${endResult} of ${pagination.total} properties`
                : "No property results found"}
            </p>
          </div>

          {(search ||
            category ||
            location ||
            minPrice ||
            maxPrice) && (
            <p className="rounded-xl bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700">
              Filters applied
            </p>
          )}
        </section>

        {/* Property list */}

        {properties.length > 0 ? (
          <section className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.map(
              (
                property,
                index
              ) => {
                const propertyId =
                  property._id ??
                  property.id;

                const imageUrl =
                  getPropertyImage(
                    property
                  );

                return (
                  <article
                    key={
                      propertyId ??
                      `${property.title}-${index}`
                    }
                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Property image */}

                    <div
                      className="relative h-56 overflow-hidden bg-slate-200 bg-cover bg-center"
                      style={
                        imageUrl
                          ? {
                              backgroundImage: `url("${imageUrl}")`,
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

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                      {property.category && (
                        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-teal-700 shadow-sm">
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

                    {/* Property content */}

                    <div className="p-5">
                      <h3 className="line-clamp-1 text-xl font-bold text-slate-900 transition group-hover:text-teal-700">
                        {
                          property.title
                        }
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

                      <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-6 text-slate-600">
                        {property.shortDescription ??
                          property.description ??
                          "Explore this available property and view its complete details."}
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

                      {propertyId ? (
                        <Link
                          href={`/properties/${propertyId}`}
                          className="mt-5 flex h-11 items-center justify-center rounded-xl bg-slate-900 font-semibold text-white transition hover:bg-teal-700"
                        >
                          View Details
                        </Link>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="mt-5 flex h-11 w-full items-center justify-center rounded-xl bg-slate-200 font-semibold text-slate-500"
                        >
                          Details unavailable
                        </button>
                      )}
                    </div>
                  </article>
                );
              }
            )}
          </section>
        ) : (
          /* Empty state */

          <section className="mt-8 flex flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="flex size-20 items-center justify-center rounded-3xl bg-teal-50 text-teal-700">
              <Building2
                size={38}
              />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              No properties found
            </h2>

            <p className="mt-2 max-w-md text-slate-600">
              No property matches
              your current filters.
              Try changing the search,
              location or price range.
            </p>

            <Link
              href="/properties"
              className="mt-6 flex h-11 items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 font-semibold text-white transition hover:bg-teal-800"
            >
              <RotateCcw
                size={17}
              />

              Clear Filters
            </Link>
          </section>
        )}

        {/* Pagination */}

        {pagination.totalPages >
          1 && (
          <nav
            aria-label="Property pagination"
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
          >
            {currentPage > 1 ? (
              <Link
                href={createPageHref(
                  currentPage - 1
                )}
                className="flex h-10 items-center gap-1 rounded-xl border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:border-teal-600 hover:text-teal-700"
              >
                <ChevronLeft
                  size={17}
                />

                Previous
              </Link>
            ) : (
              <span className="flex h-10 cursor-not-allowed items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 px-3 text-sm font-semibold text-slate-400">
                <ChevronLeft
                  size={17}
                />

                Previous
              </span>
            )}

            {visiblePages.map(
              (pageNumber) => (
                <Link
                  key={pageNumber}
                  href={createPageHref(
                    pageNumber
                  )}
                  aria-current={
                    pageNumber ===
                    currentPage
                      ? "page"
                      : undefined
                  }
                  className={`flex size-10 items-center justify-center rounded-xl text-sm font-bold transition ${
                    pageNumber ===
                    currentPage
                      ? "bg-teal-700 text-white shadow-md"
                      : "border border-slate-300 bg-white text-slate-700 hover:border-teal-600 hover:text-teal-700"
                  }`}
                >
                  {pageNumber}
                </Link>
              )
            )}

            {currentPage <
            pagination.totalPages ? (
              <Link
                href={createPageHref(
                  currentPage + 1
                )}
                className="flex h-10 items-center gap-1 rounded-xl border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:border-teal-600 hover:text-teal-700"
              >
                Next

                <ChevronRight
                  size={17}
                />
              </Link>
            ) : (
              <span className="flex h-10 cursor-not-allowed items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 px-3 text-sm font-semibold text-slate-400">
                Next

                <ChevronRight
                  size={17}
                />
              </span>
            )}
          </nav>
        )}
      </div>
    </main>
  );
}
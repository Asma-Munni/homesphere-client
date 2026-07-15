"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ComponentType,
} from "react";

import Link from "next/link";

import {
  ArrowLeft,
  BarChart3,
  Building2,
  Home,
  MapPin,
  RefreshCcw,
} from "lucide-react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { API_URL } from "@/lib/api";

interface Property {
  _id: string;
  title: string;
  category?: string;
  location?: string;
  status?: string;
  price?: number | string;
}

interface PropertyResponse {
  success?: boolean;
  message?: string;
  data?: Property[];
  pagination?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

interface CategoryChartData {
  category: string;
  properties: number;
}

interface StatisticsResponseData {
  properties: Property[];
  totalProperties: number;
}

async function fetchStatistics(): Promise<StatisticsResponseData> {
  const response = await fetch(
    `${API_URL}/properties?page=1&limit=1000&sort=newest`,
    {
      cache: "no-store",
    }
  );

  const result =
    (await response.json()) as PropertyResponse;

  if (!response.ok || !result.success) {
    throw new Error(
      result.message ??
        "Failed to load statistics."
    );
  }

  const propertyList =
    Array.isArray(result.data)
      ? result.data
      : [];

  return {
    properties: propertyList,

    totalProperties: Number(
      result.pagination?.total ??
        propertyList.length
    ),
  };
}

export default function AdminStatisticsPage() {
  const [
    properties,
    setProperties,
  ] = useState<Property[]>([]);

  const [
    totalProperties,
    setTotalProperties,
  ] = useState(0);

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

    fetchStatistics()
      .then((result) => {
        if (ignoreResult) {
          return;
        }

        setProperties(
          result.properties
        );

        setTotalProperties(
          result.totalProperties
        );

        setError("");
      })
      .catch(
        (
          fetchError: unknown
        ) => {
          if (ignoreResult) {
            return;
          }

          console.error(
            "ADMIN STATISTICS ERROR:",
            fetchError
          );

          setProperties([]);
          setTotalProperties(0);

          setError(
            fetchError instanceof Error
              ? fetchError.message
              : "Could not load statistics."
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

        const result =
          await fetchStatistics();

        setProperties(
          result.properties
        );

        setTotalProperties(
          result.totalProperties
        );
      } catch (retryError) {
        console.error(
          "ADMIN STATISTICS RETRY ERROR:",
          retryError
        );

        setProperties([]);
        setTotalProperties(0);

        setError(
          retryError instanceof Error
            ? retryError.message
            : "Could not load statistics."
        );
      } finally {
        setLoading(false);
      }
    };

  const categoryData =
    useMemo<
      CategoryChartData[]
    >(() => {
      const categoryCounts =
        new Map<string, number>();

      properties.forEach(
        (property) => {
          const category =
            property.category
              ?.trim() ||
            "Other";

          categoryCounts.set(
            category,
            (
              categoryCounts.get(
                category
              ) ?? 0
            ) + 1
          );
        }
      );

      return Array.from(
        categoryCounts.entries()
      )
        .map(
          ([
            category,
            propertyCount,
          ]) => ({
            category,
            properties:
              propertyCount,
          })
        )
        .sort(
          (first, second) =>
            second.properties -
            first.properties
        );
    }, [properties]);

  const uniqueLocations =
    useMemo(() => {
      const locations =
        properties
          .map((property) =>
            property.location
              ?.trim()
              .toLowerCase()
          )
          .filter(
            (
              location
            ): location is string =>
              Boolean(location)
          );

      return new Set(locations)
        .size;
    }, [properties]);

  const availableProperties =
    useMemo(() => {
      return properties.filter(
        (property) =>
          !property.status ||
          property.status
            .trim()
            .toLowerCase() ===
            "available"
      ).length;
    }, [properties]);

  const averagePrice =
    useMemo(() => {
      const validPrices =
        properties
          .map((property) =>
            Number(
              property.price
            )
          )
          .filter(
            (price) =>
              Number.isFinite(
                price
              ) && price > 0
          );

      if (
        validPrices.length === 0
      ) {
        return 0;
      }

      const totalPrice =
        validPrices.reduce(
          (total, price) =>
            total + price,
          0
        );

      return Math.round(
        totalPrice /
          validPrices.length
      );
    }, [properties]);

  return (
    <main className="min-h-screen bg-slate-50 p-5 sm:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-700">
              <BarChart3
                size={24}
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Platform Statistics
              </h1>

              <p className="mt-1 text-slate-600">
                Review property
                activity and listing
                distribution on
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

        {loading && (
          <div className="mt-8 flex min-h-80 items-center justify-center rounded-3xl border border-slate-200 bg-white">
            <div className="text-center">
              <div className="mx-auto size-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-700" />

              <p className="mt-4 font-medium text-slate-600">
                Loading statistics...
              </p>
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="mt-8 flex min-h-80 flex-col items-center justify-center rounded-3xl border border-red-200 bg-white px-6 text-center">
            <RefreshCcw
              size={38}
              className="text-red-500"
            />

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              Could not load
              statistics
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

        {!loading &&
          !error && (
            <>
              {/* Statistics cards */}

              <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatisticCard
                  icon={
                    Building2
                  }
                  label="Total Properties"
                  value={
                    totalProperties
                  }
                />

                <StatisticCard
                  icon={Home}
                  label="Available Listings"
                  value={
                    availableProperties
                  }
                />

                <StatisticCard
                  icon={MapPin}
                  label="Unique Locations"
                  value={
                    uniqueLocations
                  }
                />

                <StatisticCard
                  icon={BarChart3}
                  label="Average Price"
                  value={`৳ ${averagePrice.toLocaleString(
                    "en-BD"
                  )}`}
                />
              </section>

              {/* Chart */}

              <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-bold text-slate-900">
                  Properties by
                  Category
                </h2>

                <p className="mt-2 text-slate-600">
                  Distribution of
                  property listings
                  across available
                  categories.
                </p>

                {categoryData.length >
                0 ? (
                  <div className="mt-8 h-96 w-full">
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >
                      <BarChart
                        data={
                          categoryData
                        }
                        margin={{
                          top: 10,
                          right: 10,
                          left: -20,
                          bottom: 10,
                        }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={
                            false
                          }
                        />

                        <XAxis
                          dataKey="category"
                          tick={{
                            fontSize: 12,
                          }}
                          axisLine={
                            false
                          }
                          tickLine={
                            false
                          }
                        />

                        <YAxis
                          allowDecimals={
                            false
                          }
                          tick={{
                            fontSize: 12,
                          }}
                          axisLine={
                            false
                          }
                          tickLine={
                            false
                          }
                        />

                        <Tooltip
                          cursor={{
                            fill:
                              "rgba(15, 118, 110, 0.08)",
                          }}
                          contentStyle={{
                            borderRadius:
                              "12px",
                            border:
                              "1px solid #e2e8f0",
                          }}
                        />

                        <Bar
                          dataKey="properties"
                          fill="#0f766e"
                          radius={[
                            8,
                            8,
                            0,
                            0,
                          ]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="mt-8 flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center">
                    <Building2
                      size={42}
                      className="text-slate-400"
                    />

                    <h3 className="mt-4 text-lg font-bold text-slate-900">
                      No statistics
                      available
                    </h3>

                    <p className="mt-2 text-slate-500">
                      Statistics will
                      appear after
                      properties are
                      added.
                    </p>
                  </div>
                )}
              </section>
            </>
          )}
      </div>
    </main>
  );
}

interface IconProps {
  size?: number;
}

interface StatisticCardProps {
  icon: ComponentType<IconProps>;
  label: string;
  value: number | string;
}

function StatisticCard({
  icon: Icon,
  label,
  value,
}: StatisticCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
        <Icon size={24} />
      </div>

      <p className="mt-6 text-3xl font-black text-slate-900">
        {value}
      </p>

      <p className="mt-2 text-sm font-medium text-slate-500">
        {label}
      </p>
    </article>
  );
}
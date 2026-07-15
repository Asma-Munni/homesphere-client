"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ComponentType,
} from "react";

import Link from "next/link";

import {
  ArrowRight,
  Building2,
  Home,
  Loader2,
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
  _id?: string;
  title?: string;
  category?: string;
  location?: string;
}

interface PropertyResponse {
  success?: boolean;
  message?: string;
  data?: Property[];
  pagination?: {
    total?: number;
  };
}

interface ChartData {
  category: string;
  properties: number;
}

interface StatisticsData {
  properties: Property[];
  totalProperties: number;
}

/*
 * This function only fetches and returns data.
 * It does not update React state.
 */
async function fetchStatisticsData(): Promise<StatisticsData> {
  const response = await fetch(
    `${API_URL}/properties?page=1&limit=100`,
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
        "Unable to load property statistics."
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

export default function PropertyStatistics() {
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

    fetchStatisticsData()
      .then((data) => {
        if (ignoreResult) {
          return;
        }

        setProperties(
          data.properties
        );

        setTotalProperties(
          data.totalProperties
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
            "STATISTICS ERROR:",
            fetchError
          );

          setProperties([]);
          setTotalProperties(0);

          setError(
            fetchError instanceof Error
              ? fetchError.message
              : "Property statistics are currently unavailable."
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

        const data =
          await fetchStatisticsData();

        setProperties(
          data.properties
        );

        setTotalProperties(
          data.totalProperties
        );
      } catch (retryError) {
        console.error(
          "STATISTICS RETRY ERROR:",
          retryError
        );

        setProperties([]);
        setTotalProperties(0);

        setError(
          retryError instanceof Error
            ? retryError.message
            : "Property statistics are currently unavailable."
        );
      } finally {
        setLoading(false);
      }
    };

  const chartData =
    useMemo<ChartData[]>(() => {
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
            count,
          ]) => ({
            category,
            properties: count,
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

      return new Set(
        locations
      ).size;
    }, [properties]);

  const uniqueCategories =
    chartData.length;

  return (
    <section className="bg-slate-900 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}

        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-4 py-1.5 text-sm font-semibold text-teal-300">
              <Building2
                size={16}
              />

              Platform Insights
            </span>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              HomeSphere property
              statistics
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-slate-300">
              Explore real statistics
              generated from the
              properties currently
              available on HomeSphere.
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-2 font-semibold text-teal-300 transition hover:text-teal-200"
          >
            Explore all properties

            <ArrowRight
              size={18}
            />
          </Link>
        </div>

        {loading ? (
          <StatisticsLoading />
        ) : error ? (
          <div className="mt-10 flex flex-col items-center rounded-3xl border border-red-400/20 bg-red-500/10 px-6 py-12 text-center">
            <RefreshCcw
              size={32}
              className="text-red-300"
            />

            <p className="mt-4 text-red-100">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                void handleRetry()
              }
              className="mt-5 rounded-xl bg-white px-5 py-2.5 font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Statistics cards */}

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <StatisticCard
                icon={
                  Building2
                }
                value={
                  totalProperties
                }
                label="Total Properties"
              />

              <StatisticCard
                icon={Home}
                value={
                  uniqueCategories
                }
                label="Property Categories"
              />

              <StatisticCard
                icon={MapPin}
                value={
                  uniqueLocations
                }
                label="Available Locations"
              />

              <StatisticCard
                icon={
                  Building2
                }
                value="3"
                label="Supported User Roles"
              />
            </div>

            {/* Chart */}

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-7">
              <div>
                <h3 className="text-xl font-bold">
                  Properties by
                  category
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Number of currently
                  available listings in
                  each category.
                </p>
              </div>

              {chartData.length >
              0 ? (
                <div className="mt-8 h-80 w-full">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <BarChart
                      data={
                        chartData
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
                        opacity={
                          0.15
                        }
                      />

                      <XAxis
                        dataKey="category"
                        tick={{
                          fill:
                            "#cbd5e1",
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
                          fill:
                            "#cbd5e1",
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
                            "rgba(255,255,255,0.05)",
                        }}
                        contentStyle={{
                          background:
                            "#0f172a",
                          border:
                            "1px solid #334155",
                          borderRadius:
                            "12px",
                          color:
                            "#ffffff",
                        }}
                      />

                      <Bar
                        dataKey="properties"
                        fill="#0d9488"
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
                <div className="mt-8 flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 text-center">
                  <Building2
                    size={36}
                    className="text-slate-500"
                  />

                  <p className="mt-4 font-semibold text-slate-300">
                    No statistics
                    available yet
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Property category
                    statistics will
                    appear after listings
                    are added.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

interface IconProps {
  size?: number;
}

interface StatisticCardProps {
  icon: ComponentType<IconProps>;
  value: number | string;
  label: string;
}

function StatisticCard({
  icon: Icon,
  value,
  label,
}: StatisticCardProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-300">
        <Icon size={24} />
      </div>

      <p className="mt-6 text-3xl font-black">
        {value}
      </p>

      <p className="mt-2 text-sm font-medium text-slate-400">
        {label}
      </p>
    </article>
  );
}

function StatisticsLoading() {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-center gap-3 py-14 text-slate-300">
        <Loader2 className="animate-spin" />

        <span>
          Loading property
          statistics...
        </span>
      </div>
    </div>
  );
}
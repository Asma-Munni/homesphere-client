import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

function getRequiredEnv(
  name: string
): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `${name} is missing in environment variables`
    );
  }

  return value;
}

/**
 * Environment variables
 */
const mongoURI =
  getRequiredEnv("MONGO_DB_URI");

const betterAuthURL =
  getRequiredEnv("BETTER_AUTH_URL");

const betterAuthSecret =
  getRequiredEnv("BETTER_AUTH_SECRET");

const googleClientId =
  getRequiredEnv("GOOGLE_CLIENT_ID");

const googleClientSecret =
  getRequiredEnv(
    "GOOGLE_CLIENT_SECRET"
  );

const clientURL =
  process.env.CLIENT_URL ??
  betterAuthURL;

const databaseName =
  process.env.MONGO_DB_NAME ??
  "homesphere";

/**
 * Reuse MongoDB client during Next.js
 * development hot reload.
 */
const globalForMongo =
  globalThis as typeof globalThis & {
    homesphereMongoClient?:
      MongoClient;
  };

const client =
  globalForMongo
    .homesphereMongoClient ??
  new MongoClient(mongoURI);

if (
  process.env.NODE_ENV !==
  "production"
) {
  globalForMongo
    .homesphereMongoClient =
    client;
}

const db =
  client.db(databaseName);

/**
 * Better Auth configuration
 */
export const auth = betterAuth({
  appName: "HomeSphere",

  baseURL: betterAuthURL,

  secret: betterAuthSecret,

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId:
        googleClientId,

      clientSecret:
        googleClientSecret,
    },
  },

  user: {
    additionalFields: {
      role: {
        type: [
          "tenant",
          "property-holder",
        ],

        required: false,

        defaultValue:
          "tenant",

        input: true,
      },
    },
  },

  trustedOrigins: Array.from(
    new Set([
      betterAuthURL,
      clientURL,

      ...(process.env
        .NODE_ENV !==
      "production"
        ? [
            "http://localhost:3000",
          ]
        : []),
    ])
  ),
});
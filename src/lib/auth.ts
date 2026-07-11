import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const mongoURI = process.env.MONGO_DB_URI;

if (!mongoURI) {
  throw new Error(
    "MONGO_DB_URI is missing in environment variables"
  );
}

const client = new MongoClient(mongoURI);

const db = client.db("homesphere");


export const auth = betterAuth({

  database: mongodbAdapter(db, {
    client,
  }),


  emailAndPassword: {
    enabled: true,
  },


  user: {

    additionalFields: {

      role: {

        type: "string",

        required: false,

        defaultValue: "tenant",

        input: true,

      },


      image: {

        type: "string",

        required: false,

        input: true,

      },

    },

  },


  


  trustedOrigins: [

    process.env.CLIENT_URL ??
      "http://localhost:3000",

  ],


});
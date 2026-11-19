import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins"

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("wedplan-db1");

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,

    user: {
        additionalFields: {   // extra fields that are not in sign up form
            role: {
                type: ["Customer", "Vendor", "Admin"],
                required: false,
                defaultValue: "Customer",
                input: true,
            },
            isBlocked: {
                type: "boolean",
                required: false,
                defaultValue: false,
                input: false,
            },
            businessName: {
                type: "string",
                required: false,
                input: true,
            },
            subscriptionPlan: {
                type: ["Free", "Premium"],
                required: false,
                defaultValue: "Free",
                input: false,
            },
            subscriptionExpiresAt: {
                type: "date",
                required: false,
                input: false,
            },
        },
    },

    emailAndPassword: {
        enabled: true,
        autoSignIn: false   
    },

    database: mongodbAdapter(db, {
        client
    }),

    //jwt configuration
    plugins: [jwt()],
    session: {
        cookieCache: {
            enabled: true,
            strategy: 'jwt',
            maxAge: 7 * 24 * 60 * 60
        }
    }


});
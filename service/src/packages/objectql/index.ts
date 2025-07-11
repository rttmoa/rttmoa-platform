import { MongoDriver } from "./mongo";


export const db = new MongoDriver({ url: process.env.MONGO_URL || "mongodb://127.0.0.1/steedos-accounts" })

export const mongoUrl = process.env.MONGO_URL
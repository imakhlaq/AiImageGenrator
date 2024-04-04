import { neon } from "@neondatabase/serverless";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "../models/schema";

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
export let db = drizzle(sql, { logger: true, schema: { ...schema } });

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv"
import { advocateData } from "./seed/advocates";
import { advocates } from "./schema";

dotenv.config()

const setup = () => {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient);
  console.log("starting seed with ", advocateData.length, " values")
  db.insert(advocates).values(advocateData) // seed table with advocate data
  console.log("ending seed")
  return db
};

export default setup();
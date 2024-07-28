import { advocateData } from "./seed/advocates";
import { advocates } from "./schema";
import { db } from "./index"

async function seed() {
  await db.insert(advocates).values(advocateData);
  console.log(advocateData.length, " added to seed database")
}

seed()

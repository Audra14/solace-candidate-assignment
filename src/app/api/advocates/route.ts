import { Advocate } from "@/types";
import db from "../../../db/index.js";
import { advocates } from "../../../db/schema";
import { NextRequest } from "next/server.js";
import { asc } from 'drizzle-orm'
//import { advocateData } from "../../../db/seed/advocates";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const pageSize: number = parseInt(searchParams.get('pageSize') as string) || 5
  const page: number = parseInt(searchParams.get('page') as string) || 1
  
  const data = 
    await db.select()
    .from(advocates)
    .orderBy(asc(advocates.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize)

  //const data: Advocate[] = advocateData;

  return Response.json({ data });
}

import { NextResponse } from "next/server";
import { pool } from "@/lib/db"; //to connect  to out db

/*
HTTP Status Codes

200 - OK (success)
201 - Created (new resource created)
400 - Bad Request (invalid input)
401 - Unauthorized (not logged in)
403 - Forbidden (no permission)
404 - Not Found (resource doesn’t exist)
500 - Server Error (something broke)
*/

/*
HTTP Methods

GET    - Read data
POST   - Create new data
PUT    - Replace entire resource
PATCH  - Update part of resource
DELETE - Remove data
*/

// will return all table lines from the  
// drink table the match the category parameter enetered
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    if (!category) {
      return Response.json([]);
    }

    const result = await pool.query(
      `
      SELECT * FROM drink
      WHERE EXISTS (
        SELECT 1 FROM unnest(category) AS c
        WHERE c ILIKE $1
      )
      `,
      [`%${category}%`]
    );

    return Response.json(result.rows);
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Failed to search drink by category" },
      { status: 500 }
    );
  }
}